/*****************************************************************
** Author: Carlos Carrillo                                       *
** Date:   05/27/2016                                            *
** Description: This is one of the script.js file for a database *
*  backed website that features Ajax interaction.                *
*****************************************************************/

/* DOM HMTL layout for the form */

var RootNodeForm = document.getElementById("workoutInput");

var fieldset = document.createElement("fieldset");
    RootNodeForm.appendChild(fieldset);

var legend = document.createElement("legend");
    legend.textContent = "ENTER THE WORKOUT ACTIVITY YOU WANT TO STORE";
    legend.style.color = 'green';
    fieldset.appendChild(legend);

//////////////////////////////////////////////////////////////////////

var label1 = document.createElement("label");
    label1.textContent = "Name or type of the Workout activity:  ";
    fieldset.appendChild(label1);

var input1 = document.createElement("input");
    input1.type = "text";
    input1.name = "wName"
    input1.id = "wName";
    input1.style.backgroundColor = 'lightblue';
    fieldset.appendChild(input1);

var space1 = document.createElement("br");
    fieldset.appendChild(space1);

//////////////////////////////////////////////////////////////////////


var label2 = document.createElement("label");
    label2.textContent = "Date in which this exercise was performed:  ";
    fieldset.appendChild(label2);

var input2 = document.createElement("input");
    input2.type = "date";
    input2.name = "date"
    input2.id = "date";
    input2.style.backgroundColor = 'lightblue';
    fieldset.appendChild(input2);

var space2 = document.createElement("br");
    fieldset.appendChild(space2);

//////////////////////////////////////////////////////////////////////

var label3 = document.createElement("label");
    label3.textContent = "Number of times you performed this exercise:  ";
    fieldset.appendChild(label3);

var input3 = document.createElement("input");
    input3.type = "number";
    input3.name = "reps"
    input3.id = "reps";
    input3.style.backgroundColor = 'lightblue';
    fieldset.appendChild(input3);

var space3 = document.createElement("br");
    fieldset.appendChild(space3);

//////////////////////////////////////////////////////////////////////

var label4 = document.createElement("label");
    label4.textContent = "Total weight of the weights you lifted for this exercise:  ";
    fieldset.appendChild(label4);

var input4 = document.createElement("input");
    input4.type = "number";
    input4.name = "weight"
    input4.id = "weight";
    input4.style.backgroundColor = 'lightblue';
    fieldset.appendChild(input4);

//////////////////////////////////////////////////////////////////////

var label5 = document.createElement("label");
    label5.textContent = "| Lbs ";
    fieldset.appendChild(label5);

var input5 = document.createElement("input");
    input5.type = "radio";
    input5.name = "lbs";
    input5.id = "lbs";
    input5.value = "1";
    fieldset.appendChild(input5);

var label6 = document.createElement("label");
    label6.textContent = "Kgs";
    fieldset.appendChild(label6);

var input6 = document.createElement("input");
    input6.type = "radio";
    input6.name = "lbs";
    input6.value = "0";
    fieldset.appendChild(input6);

var space5 = document.createElement("br");
    fieldset.appendChild(space5);

//////////////////////////////////////////////////////////////////////

var input7 = document.createElement("input");
    input7.type = "submit";
    input7.id = "submit";
    input7.value = "Submit Workout";
    input7.style.backgroundColor = 'lightblue';
    input7.style.border = "2px solid";
    input7.style.borderRadius = "20px";
    fieldset.appendChild(input7);

//////////////////////////////////////////////////////////////////////


RootNodeForm.addEventListener("submit",function(e){
    e.preventDefault();   //Stops the DOM from updating
    
    if(document.getElementById('lbs').checked) {
        document.getElementById('lbs').value = "1";
    }else{
        document.getElementById('lbs').value = "0";
    }

    //Set up a new AJAX request
    var req = new XMLHttpRequest();
    var qStr = '/insert?';
    
	//set up the parameters
	var pParam = "wName="+document.getElementById('wName').value+
				"&reps="+document.getElementById('reps').value+
				"&weight="+document.getElementById('weight').value+
				"&date="+document.getElementById('date').value+
				"&lbs="+document.getElementById('lbs').value;
    
    //Make the GET call
    req.open("GET", qStr+pParam, true);
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
            console.log('request sent!');
            var response = JSON.parse(req.responseText);
        
            //Get id from the just sent request
            var id = response.workouts;
            console.log(id);
	    
            //ADD ROW WITH THE INFO JUST SENT TO THE TABLE
            var headTable = document.getElementById("mainTable");
            var newRow = headTable.insertRow(-1);
            		
            //ID cell needs to be hidden
            var idBox = document.createElement("td");
            idBox.textContent = id;
            idBox.style.display="none";
            newRow.appendChild(idBox);
	    
            //Add name cell
            var nameBox = document.createElement("td");
            nameBox.textContent = RootNodeForm.elements.wName.value;
            newRow.appendChild(nameBox);

            //Add repetition cell
            var repsBox = document.createElement("td");
            repsBox.textContent = RootNodeForm.elements.reps.value;
            newRow.appendChild(repsBox);

            //Add weight cell
            var weightBox = document.createElement("td");
            weightBox.textContent = RootNodeForm.elements.weight.value;
            newRow.appendChild(weightBox);

            //Add units cell
            var lbsCell = document.createElement("td");
            lbsCell.textContent = RootNodeForm.elements.lbs.value;
            newRow.appendChild(lbsCell);

            //Add date cell
            var dateBox = document.createElement("td");
            dateBox.textContent =RootNodeForm.elements.date.value;
            newRow.appendChild(dateBox);

            //Edit Button
            var editButton = document.createElement("td");
            editButton.innerHTML = '<a href="updateWorkout?id='+id+'"><input type="button" value="Edit"></a>';
            newRow.appendChild(editButton);
            

            //Delete Button
            var deleteButton = document.createElement("td");
            deleteButton.innerHTML = '<input type="button" value="Delete" onclick="deleteRow(\'mainTable\', this, '+ id +')">';
            newRow.appendChild(deleteButton);
            
            document.getElementById('wName').value = " ";
            document.getElementById('reps').value = 0;
            document.getElementById('weight').value = 0;
            document.getElementById('date').value = 'mm/dd/yyyy';
            document.getElementById('lbs').value = " ";
            
        }else {
            console.log('Something went terribly wrong!!');
        }
    });
    req.send(qStr+pParam);
});

function deleteRow(currTable, currRow, rowID){
    
    var table = document.getElementById(currTable);
    var rowCounter = table.rows.length;

    var req = new XMLHttpRequest();
    var qStr = '/delete?';

    //Make GET Request for Deleting
    req.open("GET", qStr + "id=" + rowID,true);
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
            console.log('delete request sent!');
        } else {
            console.log('Something went terribly wrong!!');
        }
    });
    req.send(qStr + "id=" + rowID);
    
    //Update the table
    for(var i = 0; i < rowCounter; i++){
        var row = table.rows[i];

        if(row==currRow.parentNode.parentNode){
            table.deleteRow(i);
        }
    }
}


