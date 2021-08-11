var express = require('express');

const app = express()

var port = 3000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
	res.end('Got the resp')
})

app.listen(port, () => {
	console.log('Listening on the port ' +port)
})

app.get('/api/checkUser', (req, res) => {
	console.log(req.query)
	var username = req.query.username
	var password = req.query.password
	
	if (username === "admin" && password === "admin")
		res.end('Authorized') 
	else
		res.end('Unauthorized')
	
	//res.end('Authorized')
})