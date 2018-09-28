const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
const moment = require('moment');

// Create a new instance of express
const app = express()

app.use(express.static(__dirname + '/public'));

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))
// Route that receives a POST request to /sms
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

// Tell our app to listen on port 3000
app.listen(37037, function (err) {
  if (err) {
    throw err
  }

  console.log('Server started on port 37037')
});
