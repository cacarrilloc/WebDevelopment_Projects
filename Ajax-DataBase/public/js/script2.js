/******************************************************************
** Author: Carlos Carrillo                                        *
** Date:   05/27/2016                                             *
** Description: This is one of the script.js files for a database *
*  backed website that features Ajax interaction.                 *
******************************************************************/

/* DOM HMTL layout for the form */

var RootNodeForm = document.getElementById("workoutUpdate");

var fieldset = document.createElement("fieldset");
    RootNodeForm.appendChild(fieldset);

var legend = document.createElement("legend");
    legend.textContent = "OVERWRITE IN ANY FIELD YOU WANT TO MAKE CHANGES";
    legend.style.color = 'green';
    fieldset.appendChild(legend);

//////////////////////////////////////////////////////////////////////

var label8 = document.createElement("label");
    label8.textContent = "Name or type of the Workout activity:  ";
    fieldset.appendChild(label8);

var input8 = document.createElement("input");
    input8.type = "text";
    input8.name = "wName";
    input8.id = "wName";
    input8.style.backgroundColor = 'lightblue';
    fieldset.appendChild(input8);

var space8 = document.createElement("br");
    fieldset.appendChild(space8);

//////////////////////////////////////////////////////////////////////

var label9 = document.createElement("label");
    label9.textContent = "Date in which this exercise was performed:  ";
    fieldset.appendChild(label9);

var input9 = document.createElement("input");
    input9.type = "date";
    input9.name = "date"
    input9.id = "date";
    input9.style.backgroundColor = 'lightblue';
    fieldset.appendChild(input9);

var space9 = document.createElement("br");
    fieldset.appendChild(space9);

//////////////////////////////////////////////////////////////////////

var label10 = document.createElement("label");
    label10.textContent = "Number of times you performed this exercise:  ";
    fieldset.appendChild(label10);

var input10 = document.createElement("input");
    input10.type = "text";
    input10.name = "reps"
    input10.id = "reps";
    input10.style.backgroundColor = 'lightblue';
    fieldset.appendChild(input10);

var space10 = document.createElement("br");
    fieldset.appendChild(space10);

//////////////////////////////////////////////////////////////////////

var label11 = document.createElement("label");
    label11.textContent = "Total weight of the weights you used for this exercise:  ";
    fieldset.appendChild(label11);

var input11 = document.createElement("input");
    input11.type = "text";
    input11.name = "weight"
    input11.id = "weight";
    input11.style.backgroundColor = 'lightblue';
    fieldset.appendChild(input11);

//////////////////////////////////////////////////////////////////////

var label12 = document.createElement("label");
    label12.textContent = "| Lbs ";
    fieldset.appendChild(label12);

var input12 = document.createElement("input");
    input12.type = "radio";
    input12.name = "lbs";
    input12.id = "lbs";
    input12.value = "1";
    fieldset.appendChild(input12);

var label13 = document.createElement("label");
    label13.textContent = "Kgs";
    fieldset.appendChild(label13);

var input13 = document.createElement("input");
    input13.type = "radio";
    input13.name = "lbs";
    input13.id = "kgs";
    input13.value = "0";
    fieldset.appendChild(input13);

var space13 = document.createElement("br");
    fieldset.appendChild(space13);

//////////////////////////////////////////////////////////////////////

var hideInput = document.createElement("input");
    hideInput.type = "hidden";
    hideInput.id = "id";
    hideInput.name = "id";
    hideInput.value = "Submit Workout";
    fieldset.appendChild(hideInput);

//////////////////////////////////////////////////////////////////////

var input14 = document.createElement("input");
    input14.type = "submit";
    input14.id = "submit";
    input14.value = "Submit Workout";
    input14.style.backgroundColor = 'lightblue';
    input14.style.border = "2px solid";
    input14.style.borderRadius = "20px";
    fieldset.appendChild(input14);

//////////////////////////////////////////////////////////////////////

  var qStr = '/get-data';
  var req = new XMLHttpRequest();

  req.open("GET", qStr, true);
  req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
        console.log('request sent!');
        var response = JSON.parse(req.responseText);
        var id = document.getElementById("currentId").value;
   
        for(var i=0; i<id; i++){
            for(var x in response[i]){
                if(response[i][x] == id){
                    document.getElementById('id').value = response[i].id;
                    document.getElementById('wName').value = response[i].name;
                    document.getElementById('reps').value = response[i].reps;
                    document.getElementById('weight').value = response[i].weight;
                    document.getElementById('date').value = response[i].date;
                    document.getElementById('lbs').value = response[i].lbs;
                }
            }
        }
        
        if(document.getElementById('lbs').value == 1){
            document.getElementById('lbs').checked = "checked";
        }else{
            document.getElementById('kgs').checked = "checked";
        }
    
    }else {
        console.log("Error in network request: " + request.statusText);
    }
  });

  req.send(null);

RootNodeForm.addEventListener("submit",function(){
    
    if(document.getElementById('lbs').checked){
        document.getElementById('lbs').value = "1";
    }else{
        document.getElementById('lbs').value = "0";
    }
});


