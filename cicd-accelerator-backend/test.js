var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'cicd_user',
  password : 'cicd_user',
  port	   : '3311'
});
 
///connection.connect();
 
connection.query('show databases', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
//connection.end();