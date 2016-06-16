/***************************************************************
** Author: Carlos Carrillo                                     *
** Date:   05/27/2016                                          *
** Description: This is the credentials file for a database    *
*  backed website that features Ajax interaction.              *
***************************************************************/

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit  : 10,
    host	     	 : 'localhost',
    user	    	 : 'student',
    password         : 'default',
    database	     : 'student',
    dateStrings	     : 'true'
});

module.exports.pool = pool;
