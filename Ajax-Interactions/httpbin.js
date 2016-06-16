/*******************************************************************
** Author: Carlos Carrillo                                         *
** Date:   05/07/2016                                              *
** Description: This program is a form that submit asynchronously  *
*  via a POST. It sends a content-type of application/json and     *
*  displays the data it gets back, which matches the data sent.    *
*  Then, the data gets stored as a string in the data field of the *
*  JSON encoded string returned from the server.                   *
*******************************************************************/

/* DOM HMTL layout for the first form */

var DOMForm2 = document.body;
    DOMForm2.style.backgroundColor = 'lightgray';

var RootNodeForm2 = document.createElement("form");
    DOMForm2.appendChild(RootNodeForm2);

var fieldset2 = document.createElement("fieldset");
    RootNodeForm2.appendChild(fieldset2);

var legend2 = document.createElement("legend");
    legend2.textContent = " POST via http://httpbin.org/post ";
    legend2.style.color = 'green';
    fieldset2.appendChild(legend2);

var textarea = document.createElement("textarea");
    textarea.id = "textAreaInput";
    textarea.style.width = "235px";
    textarea.style.height= "80px";
    fieldset2.appendChild(textarea);

var space = document.createElement("br");
    fieldset2.appendChild(space);

var input = document.createElement("input");
    input.type = "submit";
    input.id = "httpbinRequest";
    input.style.margin = "9px";
    input.style.backgroundColor = 'lightblue';
    input.style.borderRadius = "10px";
    input.style.width = "20em";
    input.value = "Submit POST Request";
    fieldset2.appendChild(input);

var p4 = document.createElement("p");
    p4.textContent = "=> Data sent to httpbin.org:";
    p4.style.color = 'blue';
    DOMForm2.appendChild(p4);

var span6 = document.createElement("span");
    span6.id= "dataSent";
    DOMForm2.appendChild(span6);

var p5 = document.createElement("p");
    p5.textContent = "<= Data returned by httpbin.org:";
    p5.style.color = 'blue';
    DOMForm2.appendChild(p5);

var span7 = document.createElement("span");
    span7.id= "dataReturn";
    DOMForm2.appendChild(span7);


/* Code to send the actual POST request */

var httpbinUri = "http://httpbin.org/post";

document.getElementById('httpbinRequest').addEventListener('click', function(event){
                                                           
    var req = new XMLHttpRequest();
    var object = {data:null};
    object.data = document.getElementById('textAreaInput').value;
    req.open("POST", httpbinUri, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            var parsedData = JSON.stringify(object);
            document.getElementById('dataSent').textContent = parsedData;
            document.getElementById('dataReturn').textContent = response.data;
        }else {
            console.log("Error in network request: " + request.statusText);}
    });
    req.send(JSON.stringify(object));
    event.preventDefault();
});


