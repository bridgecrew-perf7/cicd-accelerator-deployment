var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '172.26.208.1',
  user     : 'root',
  password : 'admin@123'
});
 
///connection.connect();
 
connection.query('show databases', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
//connection.end();
