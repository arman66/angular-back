const express      = require('express');
const path         = require('path');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const session      = require('express-session');
const passport     = require('passport');

require("dotenv").config();

require("./config/mongoose-setup");
require("./config/passport-setup");


const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    // accept cookies across domains
    credentials: true,
    // ONLY allow these
    origin: [ 'http://localhost:4200' ]
  })
);
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'this should probably go in the .env file'
  })
);
app.use(passport.initialize());
app.use(passport.session());



// ROUTERS ---------------------------------------------------------------------


  // all routes in this router will get an extra "/api" in the URL
  // (For example "/phones" becomes "/api/phones")

const userApi = require('./routes/user-api-router');
app.use('/api', userApi);

const taskApi = require('./routes/task-api-router');
app.use('/api', taskApi);

// END ROUTERS -----------------------------------------------------------------



module.exports = app;
