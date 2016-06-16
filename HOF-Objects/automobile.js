/**********************************************************************************
 ** Author: Carlos Carrillo-Calderon                                              *
 ** Date:   04/22/2016                                                            *
 ** Description: This program make use of higher-order functions to sort 6 arrays *
 *  of objects. It also has a class called Automobile and 3 comparator functions  *
 *  that takes two arguments and uses some algorithm to compare them. Each line   *
 *  representing a car is produced via a logMe function, which is added to the    *
 *  Automobile class and accept a single boolean argument. If the argument is     *
 *  "true" then it prints "year make model type" with the year, make, model and   *
 *  type being the values appropriate for the automobile. If the argument is      *
 *  "false" then the type is ommited and just the "year make model" is logged.    *
 *  For all comparators if cars are "tied" according to the comparison rules then *
 *  the order of those "tied" cars is not specified and either can come first.    *
 **********************************************************************************/

console.log("\n*** CS_290 Assignment 2: Higher-Order Functions and Objects. ***\n");

/*Automobile Class */
function Automobile( year, make, model, type ){
    this.year = year;   //integer (ex. 2001, 1995)
    this.make = make;   //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type;   //string (ex. Pickup, SUV)
    this.logMe = function(booleanInput){
        var printLine;
        if(booleanInput == false){
           printLine = "--> "+this.year+" "+this.make+" "+this.model+" ";
        }
        else{
            printLine = "--> "+this.year+" "+this.make+" "+this.model+" ("+this.type+")";
        }
        console.log(printLine);
    }
}

/* Array of Objects */
var automobiles = [
                   new Automobile(1995, "Honda", "Accord", "Sedan"),
                   new Automobile(1990, "Ford", "F-150", "Pickup"),
                   new Automobile(2000, "GMC", "Tahoe", "SUV"),
                   new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
                   new Automobile(2005, "Lotus", "Elise", "Roadster"),
                   new Automobile(2008, "Subaru", "Outback", "Wagon")
                   ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and
 an array of objects appropriate for that comparator and it will return a new array which 
 is sorted with the largest object in index 0 and the smallest in the last index. */

function sortArr (comparator, array){
    
    var len = array.length;
    var swapElem; //temp variable
    var minIdx;  //minimun index
    
    /* Make a copy of the original array so it won't be modified */
    var copyArr = array.slice(0);
    copyArr.reverse();
    
    /* Selection Sort Algorithm taken */
    var outerLoop = function (array1){
        for(var i = 0; i < len; i++){
            minIdx = i;
            innerLoop (i, array1, comparator);
            swapElem = array1[i];
            array1[i] = array1[minIdx];
            array1[minIdx] = swapElem;
        }
    }
    
    var innerLoop = function (index, array2, comparison){
        for(var j = index+1; j < len; j++){
            if(comparison(array2[j], array2[minIdx])){
                minIdx = j;
            }
        }
    }
    
    outerLoop(copyArr); //call main Higher-Order Function
    
    return copyArr; //return
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first 
 argument is larger or greater than the 2nd it returns true, otherwise it returns false. 
 Here is an example that works on integers. */

function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/

function yearComparator( auto1, auto2){
    return exComparator(auto1.year, auto2.year);
}

/*This compares two automobiles based on their make. It should be case insensitive and makes 
 which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/

function makeComparator( auto1, auto2){
    
    /* Make input case insensitive */
    var string1 = auto1.make.toLowerCase();
    var string2 = auto2.make.toLowerCase();
    
    /* Actual comparison */
    if (string1 < string2) {
        return true;
    } else {
        return false;
    }
}

/*This function compares two automobiles based on their type. The ordering from "greatest" to
 "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should 
 be case insensitive. If two cars are of equal type then the newest one by model year should 
 be considered "greater". */

function typeComparator( auto1, auto2){
    
    /* Make input case insensitive */
    var string1 = auto1.type.toLowerCase();
    var string2 = auto2.type.toLowerCase();
    
    /* Assign priority to the car type as requested */
    var typePriority = function (input){
        if (input == 'roadster')
            return 1;
        else if (input == 'pickup')
            return 2;
        else if (input == 'suv')
            return 3;
        else if (input == 'wagon')
            return 4;
        else
            return 5;
    }
    
    /* Actual comparison */
    if (typePriority(string1) < typePriority(string2)) {
        return true;
    } else {
        return false;
    }
}

/* This function prints out the respective sorted array to the console.log depending on
 boolean argument passed to it (logMeBoolean). If it is "true", then it prints "year make
 model type" with the year, make, model and type being the values appropriate for the 
 automobile. If the argument is "false" then the type is ommited and just the "year make
 model" is logged. */
 
function printArray(arraySorted, logMeBoolean, message){
    
    console.log(message); //print header message
    
    for(var i = 0; i < arraySorted.length; i++){
        arraySorted[i].logMe(logMeBoolean);
    }
    
    /* Set space between array blocks */
    if(logMeBoolean == false){
        console.log("\n");
    }
}

/* CALL MAIN FUNCTIONS */

console.log("*****"); //opening

/* Sort by year */
var yearSort = sortArr(yearComparator, automobiles);
printArray(yearSort, false, "The cars sorted by year are: ");

/* Sort by make */
var makeSort = sortArr(makeComparator, automobiles);
printArray(makeSort, false, "The cars sorted by make are: ");

/* Sort by type */
var typeSort = sortArr(typeComparator, automobiles);
printArray(typeSort, true, "The cars sorted by type are: ");

console.log("*****"); //closing
    