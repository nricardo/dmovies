const cors = require('cors');
const express = require('express');
const body = require('body-parser');

// create our auth server
const auth = express();

auth.use(body.json()); // for parsing application/json
auth.use(body.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// use CORS middleware
auth.use(cors());

// functions
function User(req, res, next) {
  res.send({
    roles: ['admin'],
    username: 'nricardo',
    fullname: 'Nelson Ricardo',
  });
}

function Authenticate(req, res, next) {
  // check user credentials
  let credentials = req.body;
  if (
    'nricardo' === credentials.username &&
    'just2test' === credentials.password
  ) {
    res.send({
      access_token: 'token2test-access',
      refresh_token: 'token2test-refresh'
    });
  } else {
    res.sendStatus(401);
  }
}

// endpoints
auth.get('/auth/user', User);
auth.post('/auth/token', Authenticate);

auth.listen(3000, () => {
  console.log('Authentication server running @ port 3000...');
});