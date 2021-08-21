var express = require('express');

const app = express()

var port = 3001

const routedata = require('./route/route.js')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  express.urlencoded({
    extended: true
  })
  next();
});

app.use(express.json())

app.get('/', (req, res) => {
	res.end('Got the resp')
})

app.get('/api/checkUser', routedata.checkUser);

app.get('/api/addBuildServer', routedata.addBuildServer);

app.get('/api/checkServerName', routedata.checkServerName);

app.get('/api/getBuildServers', routedata.getBuildServers);

app.get('/api/getPipelines', routedata.getPipelines);

app.post('/api/addPipelineDetails', routedata.addPipelineDetails);

app.get('/hotels', routedata.getHotels);

app.get('/monument', (req, res) => {
	res.end('Surendhar Statue')
})

app.listen(port, () => {
	console.log('Listening on the port ' +port)
})