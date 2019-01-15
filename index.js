const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const moment = require('moment');

// Create a new instance of express
const app = express()

app.use(express.static(__dirname + '/public'));

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/webhook', function (req, res) {
  const body = req.body
  var data = "=====  " + moment().format('MMMM Do YYYY, h:mm:ss a') + "  =====\n" + JSON.stringify(body) + "\n\n"
  res.set('Content-Type', 'text/plain');
  res.send(data);
  
  console.log(data);
  
  fs.appendFile('public/message.txt', data, function (err) {
    if (err) throw err;
  });
})

var USER_POINTS = {};

app.post('/api/service/points/get', function(req, res){
  console.log("Received! ", req.body);
  res.setHeader('Content-Type', 'application/json');
  var data = req.body;
  var retdata = {}
  var retcode = 200;
  if(data.password == data.identifier){
    if(USER_POINTS[data.user] === undefined){
      USER_POINTS[data.user] = 1000;
    } else {
      // USER_POINTS[data.user] += 10;
    }
    retcode = 200;
    retdata = {
      points: USER_POINTS[data.user]
    };
  }else{
    retcode = 403;
    retdata = "Wrong credentials!";
  }
  res.status(retcode).send(JSON.stringify(retdata, null, 3));
});

app.post('/api/service/points/redeem', function(req, res){
  console.log("Received! ", req.body);
  res.setHeader('Content-Type', 'application/json');
  var data = req.body;
  var retdata = {}
  var retcode = 200;
  if(data.password == data.identifier){
    if(USER_POINTS[data.user] === undefined){
      USER_POINTS[data.user] = 1000;
    } if(USER_POINTS[data.user] === 0){
      retcode = 400;
      retdata = "Not enough balance!";
    } else {
      USER_POINTS[data.user] = Math.max(0, USER_POINTS[data.user] - data.amount) ;
      retcode = 200;
      retdata = {
        points: USER_POINTS[data.user]
      };
    }
  }else{
    retcode = 403;
    retdata = "Wrong credentials!";
  }
  res.status(retcode).send(JSON.stringify(retdata, null, 3));
});

// Tell our app to listen on port 3000
app.listen(37037, function (err) {
  if (err)    throw err
  console.log('Server started on port 37037')
});
