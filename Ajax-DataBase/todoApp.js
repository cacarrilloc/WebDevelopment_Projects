/***************************************************************
** Author: Carlos Carrillo                                     *
** Date:   05/27/2016                                          *
** Description: This is the app.js file for a database backed  *
*  website that features Ajax interaction.                     *
***************************************************************/

var express = require('express');
var handlebars = require('express-handlebars').create({default:'main'});
var mysql = require('./lib/dbcon.js');
var request = require('request');

var app = express(); //Express setup

app.engine('handlebars',handlebars.engine); //Handlebars setup
app.set('view engine','handlebars'); //Handlebars setup
app.use(express.static('public')); //Public js folder setup
app.set('port',3001); //Set Port

//Main page
app.get('/',function(req,res,next){
   var context = {};
   mysql.pool.query('SELECT * FROM `workouts`',function(err,rows,fields){
        if(err){
            next(err);
            return;
        }
        var workoutList = [];
        for(var w in rows){
            workoutList.push({'name': rows[w].name, 'reps':rows[w].reps, 'weight':rows[w].weight, 'date':rows[w].date, 'lbs':rows[w].lbs, 'id':rows[w].id})
        }
        context.workouts = workoutList;
        res.render('home',context);
   });
});

//Insert query
app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO `workouts` (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", [req.query.wName, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result){
        if(err){
            next(err);
            return;
        }
        context.workouts = result.insertId;
        res.send(JSON.stringify(context));
    });
});

//Update query
app.get('/update', function(req, res, next){
    var context = {};
    mysql.pool.query("UPDATE `workouts` SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id = ?", [req.query.wName, req.query.reps, req.query.weight, req.query.date, req.query.lbs, req.query.id], function(err, result) {
        mysql.pool.query('SELECT * FROM `workouts`', function(err, rows, fields){
            if(err){
                next(err);
                return;
            } 
            var workoutList = [];
            for(var w in rows){
                workoutList.push({'name': rows[w].name, 'reps':rows[w].reps, 'weight':rows[w].weight, 'date':rows[w].date, 'lbs':rows[w].lbs, 'id':rows[w].id})
            }
   	    context.workouts = workoutList;
        res.render('home',context);
     });
   });
});

//Shows data table in the update form
app.get('/updateWorkout',function(req,res,next){
    var context = {};
    mysql.pool.query('SELECT * FROM `workouts` WHERE id=?',[req.query.id],function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        var workoutList = [];
        for(var w in rows){
            workoutList.push({'name': rows[w].name, 'reps':rows[w].reps, 'weight':rows[w].weight, 'date':rows[w].date, 'lbs':rows[w].lbs, 'id':rows[w].id})
        }
        context.workouts = workoutList[0];
        res.render('updatePage',context);
   });
});

//Delete query
app.get('/delete', function(req, res, next) {
    var context = {};
    mysql.pool.query("DELETE FROM `workouts` WHERE id = ?", [req.query.id], function(err, result){
        if(err){
            next(err);
            return;
        }
        mysql.pool.query('SELECT * FROM `workouts`', function(err, rows, fields){
            if(err){
                next(err);
                return;
            } 
		context.results = JSON.stringify(rows);
		res.render('home',context);
        });   
    });
});

//General use get-data query
app.get('/get-data', function(req,res,next) {
    //get table information from database
    mysql.pool.query("SELECT * FROM workouts", function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        //return to client
        res.status(200).send(rows);
    });
});

//Create or reset table
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    });
  });
});


//404 error handler
app.use(function(req,res){
	res.status(404);
	res.render(404);
});

//500 error handle
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render(500);
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:'+app.get('port')+ '; press Ctrl-C to terminate.');
});
