const express = require('express')
const bodyParser = require('body-parser')

// Create a new instance of express
const app = express()

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))

// Route that receives a POST request to /sms
app.post('/webhook', function (req, res) {
  const body = req.body.Body
  res.set('Content-Type', 'text/plain');
  res.send(`${body}`);
  console.log(req.body);
})

// Tell our app to listen on port 3000
app.listen(37037, function (err) {
  if (err) {
    throw err
  }

  console.log('Server started on port 37037')
});

/*
POST https://localhost:37037/webhook HTTP/1.1
content-type: application/json

{
    "name": "sample",
    "time": "Wed, 21 Oct 2015 18:27:50 GMT"
}

*/