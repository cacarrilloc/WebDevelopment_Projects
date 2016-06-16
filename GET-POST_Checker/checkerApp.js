/*****************************************************************
** Author: Carlos Carrillo                                       *
** Date:   05/13/2016                                            *
** Description: This is the express file for a single page web   *
*  application that will receive incoming POST and GET requests. *
*****************************************************************/

/* SET EXPRESS AND HANDLEBARS */
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

/* Link to an additional folder with a .css file for HTML style purposes */
var path = require('path'); //link the .css file with the .handlebars file
app.use(express.static(path.join(__dirname, 'HTMLStyle')));

/* GET REQUEST METHOD */
app.get('/',function(req,res){
        
  var context = {};
  context.getTrigger = 0; //set table for ONLY get request
  context.noString = 0;   //tell if NO query string values were sent
        
  /* Get and display URL query string values */
  var qParams = [];
  for (var p in req.query){
    context.getTrigger = 1;
    qParams.push({'name':p,'value':req.query[p]})
  }
  /* Display message if NO query string values were sent */
  if(context.getTrigger == 0){
     context.noString = 1;
  }
     
  console.log(req.query); //display URL query string values on console
  context.queryParams = qParams; //send URL query string values to table
  context.typeRequest = req.method; //get type of request field
  res.render('request', context); //send data
});

/* POST REQUEST METHOD */
app.post('/', function(req,res){
         
  var context = {};
  context.getTrigger = 0; //set table for ONLY get request
  context.noString = 0;   //tell if NO query string values were sent
  
  /* Get and display URL query string values */
  var qParams2 = [];
  for (var p in req.query){
    context.getTrigger = 1;
    qParams2.push({'name':p,'value':req.query[p]})
  }
  /* Display message if NO query string values were sent */
  if(context.getTrigger == 0){
     context.noString = 1;
  }
  context.queryParams = qParams2; //set URL query string values field in table
         
  /* Get and display values received in the request BODY */
  var bParams = [];
  for (var p in req.body){
    context.postTrigger = 1;
    bParams.push({'name':p,'value':req.body[p]})
  }
  context.bodyParams = bParams; //set received-body-values field in the table
         
  console.log(req.query); //display URL query string values on console
  console.log(req.body);  //display body values received on console
  context.typeRequest = req.method; //get type of request field
  res.render('request', context); //send data
});

/* REQUEST ERROR SECTIONS */
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
