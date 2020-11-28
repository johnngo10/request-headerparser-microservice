// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();
const requestIp = require('request-ip');


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami", function(req, res) {
  const clientIp = requestIp.getClientIp(req);
  const language = req.acceptsLanguages();
  const software = req.get('User-Agent');
  res.json({ipaddress: clientIp, language: language, software: software});
})



// listen for requests :)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
