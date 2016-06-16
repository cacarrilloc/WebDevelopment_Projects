/***************************************************************
** Author: Carlos Carrillo                                     *
** Date:   05/07/2016                                          *
** Description: This program lets a user input a city or a zip *
*  code and asynchronously shows the weather information       *
*  retrieved from Open Weather Map.                            *
****************************************************************/


/* DOM HMTL layout for the first form */

var DOMForm = document.body;

var RootNodeForm = document.createElement("form");
    DOMForm.appendChild(RootNodeForm);

var fieldset = document.createElement("fieldset");
    RootNodeForm.appendChild(fieldset);

var legend = document.createElement("legend");
    legend.textContent = "WEATHER FINDER";
    legend.style.color = 'green';
    fieldset.appendChild(legend);

var label1 = document.createElement("label");
    label1.textContent = "Enter Your City:  ";
    fieldset.appendChild(label1);

var input1 = document.createElement("input");
    input1.type = "text";
    input1.id = "cityInput";
    fieldset.appendChild(input1);

var par = document.createElement("p");
    par.textContent = "**** OR ****";
    fieldset.appendChild(par);

var label2 = document.createElement("label");
    label2.textContent = "Enter Your Zip Code:  ";
    fieldset.appendChild(label2);

var input2 = document.createElement("input");
    input2.type = "text";
    input2.id = "zipCode";
    fieldset.appendChild(input2);

var br3 = document.createElement("br");
    fieldset.appendChild(br3);

var input3 = document.createElement("input");
    input3.type = "submit";
    input3.id = "sendRequest";
    input3.style.margin = "9px";
    input3.style.backgroundColor = 'lightblue';
    input3.style.borderRadius = "10px";
    input3.style.width = "22em";
    input3.value = "Submit Location";
    fieldset.appendChild(input3);

var br4 = document.createElement("br");
    DOMForm.appendChild(br4);

var p0 = document.createElement("b");
    p0.textContent = "YOUR RESULTS: ";
    p0.style.color = 'blue';
    DOMForm.appendChild(p0);

var span6 = document.createElement("span");
    span6.id= "error";
    span6.style.color = 'red';
    p0.appendChild(span6);

var p1 = document.createElement("p");
    p1.textContent = "-> City: ";
    DOMForm.appendChild(p1);

var span3 = document.createElement("span");
    span3.id= "cityOut";
    p1.appendChild(span3);

var p2 = document.createElement("p");
    p2.textContent = "-> Temperature: ";
    DOMForm.appendChild(p2);

var span4 = document.createElement("span");
    span4.id= "currentTemp";
    p2.appendChild(span4);

var p3 = document.createElement("p");
    p3.textContent = "-> Humidity: ";
    DOMForm.appendChild(p3);

var span5 = document.createElement("span");
    span5.id= "humidity";
    p3.appendChild(span5);

var p4 = document.createElement("p");
    p4.textContent = "-> Atmospheric Pressure: ";
    DOMForm.appendChild(p4);

var span6 = document.createElement("span");
    span6.id= "atPressure";
    p4.appendChild(span6);


/* Code to send the actual POST request */

var apiKey = '6b0556f9ee000a9135b5672d71e91693';
var openWeatherUri = "http://api.openweathermap.org/data/2.5/weather";

/* Master Function */

document.getElementById('sendRequest').addEventListener('click', function (event) {
    document.getElementById('error').textContent = " ";                                                          
    var zip = document.getElementById('zipCode').value;
    var city = document.getElementById('cityInput').value;
                                                        
    if(zip !== "" && city === ""){
        getByZip(zip);
    }
    else if(zip === "" && city !== ""){
        getByCity(city);
    }
    else if(zip === "" && city === ""){
        return;
    }
    else{
        document.getElementById('error').textContent = "Choose ONLY 1 option!!";
    }
    event.preventDefault();
});

/* Helper function for zip code input */

function getByZip(zipCode){
    
   var uri = openWeatherUri + "?zip=" + zipCode + ",us&units=imperial&APPID=" + apiKey;
   var req = new XMLHttpRequest();
   req.open("GET", uri, true);
   req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
         var result = JSON.parse(req.responseText);
         document.getElementById('cityOut').textContent = result.name;
         document.getElementById('currentTemp').textContent = result.main.temp+" fahrenheit";
         document.getElementById('humidity').textContent = result.main.humidity+"%";
         document.getElementById('atPressure').textContent = result.main.pressure+" hPa";}
      else {
         console.log("Error in network request: " + request.statusText);}
   });
   req.send(null);
}

/* Helper function for city input */

function getByCity(city) {
    
   var uri = openWeatherUri + "?q=" + city + ",us&units=imperial&APPID=" + apiKey;
   var req = new XMLHttpRequest();
   req.open("GET", uri, true);
   req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
         var result = JSON.parse(req.responseText);
         document.getElementById('cityOut').textContent = result.name;
         document.getElementById('currentTemp').textContent = result.main.temp+" fahrenheit";
         document.getElementById('humidity').textContent = result.main.humidity+"%";
         document.getElementById('atPressure').textContent = result.main.pressure+" hPa";}
      else {
         console.log("Error in network request: " + request.statusText);}
    });
    req.send(null);
}



