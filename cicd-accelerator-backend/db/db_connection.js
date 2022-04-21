var mysql      = require('mysql');


var connection = mysql.createConnection({
  host     : '192.168.1.2',
  user     : 'root',
  password : 'admin@123',
  database : 'cicd_accelerator'
});