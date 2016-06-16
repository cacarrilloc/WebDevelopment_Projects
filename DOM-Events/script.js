/***************************************************************
** Author: Carlos Carrillo                                     *
** Date:   04/29/2016                                          *
** Description: This program creates all of the content for a  *
*  HTML page, which is a 4x4 table. The top row is a header    *
*  row with header cells. The non header cells contain their   *
*  position, so the upper left cell should contain the text    *
*  "1,1", the cell to its right "2,1", and so on. It also      *
*  contains 4 directional buttons (up, down, left right) and a *
*  button labeled "Mark Cell".                                 *
***************************************************************/

var DOMTable = document.body;
var pos = 0;
var row = 3;
var column = 4;

/* This function creates the table itself */
function createTable(rowTable, columnTable){
    
    var RootNodeTable = document.createElement("table");
    
    var tableCaption = document.createElement("caption"); //create caption
    tableCaption.textContent = "Use the buttons below to navigate and highlight cells.";
    tableCaption.style.backgroundColor = 'lightblue';
    tableCaption.style.border = "1px solid";
    tableCaption.style.borderRadius = "10px";
    RootNodeTable.appendChild(tableCaption);
    
    var tableHeader = document.createElement("thead");   //create header row
    for(var i = 1; i < (columnTable+1); i++){
        var row = document.createElement("th");
        row.textContent = "Header " + i.toString(10);
        row.style.border = "1px solid";
        tableHeader.appendChild(row);
    }
    RootNodeTable.appendChild(tableHeader);
    
    var tableBody = document.createElement("tbody");    //create content cells
    for(var i=1; i<columnTable; i++){
        var row = document.createElement("tr");
        for(var j=1; j<(columnTable+1); j++){
            var cell = document.createElement("td");
            cell.textContent = j.toString(10) + ", " + i.toString(10);
            cell.style.border = "1px solid";
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    
    RootNodeTable.appendChild(tableBody); //put table together
    DOMTable.appendChild(RootNodeTable);  //put table in the actual webpage
}

/* This function creates and add all the buttons needed */
function createButton(id, action){
    
    var newButton = document.createElement("button");
    newButton.id = id;
    newButton.textContent = id;
    newButton.style.margin = "9px";
    newButton.style.backgroundColor = 'lightblue';
    newButton.style.borderRadius = "10px";
    DOMTable.appendChild(newButton);
    document.getElementById(id).addEventListener("click", action);
}

/* This function performs all the horizontal moves within the table */
function horizontal(position, limitA, limitB, limitC){
    
    var index = position;
    
    for(var i=0; i<element.length; i++){   //Loop to unselect previous selected cell
        element[i].style.border = "1px solid";}
    
    for(var i=0; i<element.length; i++){ //checks if the frame is in the 1st row
        if(i < 4){
            if(pos == i){
                if(pos == limitA){
                    element[limitA].style.border = "3px solid";
                    pos = limitA;
                    return;}
                element[index].style.border = "3px solid";
                pos = index;
                return;}
        }
        if((i > 3) && (i < 8)){    //checks if the frame is in the 2nd row
            if(pos == i){
                if(pos == limitB){
                    element[limitB].style.border = "3px solid";
                    pos = limitB;
                    return;}
                element[index].style.border = "3px solid";
                pos = index;
                return;}
        }
        if((i > 7) && (i < 12)){   //checks if the frame is in the 3rd row
            if(pos == i){
                if(pos == limitC){
                    element[limitC].style.border = "3px solid";
                    pos = limitC;
                    return;}
                element[index].style.border = "3px solid";
                pos = index;
                return;}
        }
    }
}

/* This function performs all the vertical moves within the table */
function vertical(position, flag){
    
    var index = position;
    
    for(var i=0; i<element.length; i++){   //Loop to unselect previous selected cell
        element[i].style.border = "1px solid";}
    
    for(var i=0; i<element.length; i++){
        if(i < 4){
            if(pos == i){                //checks if the frame is in the 1st row
                if(flag == 1){
                    element[pos].style.border = "3px solid";
                    pos = pos;
                    return;}
                else{
                    element[index].style.border = "3px solid";
                    pos = index;
                    return;}}
        }
        if((i > 3) && (i < 8)){         //checks if the frame is in the 2nd row
            if(pos == i){
                element[index].style.border = "3px solid";
                pos = index;
                return;}
        }
        if((i > 7) && (i < 12)){       //checks if the frame is in the 3rd row
            if(pos == i){
                if(flag != 1){
                    element[pos].style.border = "3px solid";
                    pos = pos;
                    return;}
                else{
                    element[index].style.border = "3px solid";
                    pos = index;
                    return;}}
        }
    }
}

/* Calling main functions to run the program */

createTable(row, column); //create/call table

/* Create main array to navigate the actual table. Every array element is one
 of the table content cells, where [0] = position 1,1 and [11] = position 4,3 */

var element = document.getElementsByTagName("td");

/* Set initial position for the cell-selection frame. */
if(pos == 0){
    element[0].style.border = "3px solid";}

/* create all the buttons and set the preconditions for each move direction */
createButton("up", function(){
             var upMove = (pos - 4);         //move up
             vertical(upMove, 1);
             });
createButton("down", function movingDown(){
             var downMove = (pos + 4);       //move down
             vertical(downMove, 0);
             });
createButton("left", function(){
             var leftMove = (pos - 1);       //move left
             horizontal(leftMove, 0, 4, 8);
             });
createButton("right", function(){
             var rightMove = (pos + 1);      //move right
             horizontal(rightMove, 3, 7, 11);
             });
createButton("mark", function markCell(){
             element[pos].style.backgroundColor = "yellow";
             });

















