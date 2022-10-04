const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors= require('cors');
const csurf= require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

//? Add several security middlewares
// Security Middleware
if (!isProduction) {
    // enable cors ONLY in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

//backend being connected to routes/index
const routes = require('./routes');

app.use(routes); //connects all routes GET/PUT/DELETE



// backend/app.js
// ...

module.exports = app;
