const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');
const errorHandler = require('./lib/errorHandler');

const app = express();
const { port, dbUri, sessionSecret } = require('./config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbUri, { useMongoClient: true });

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(customResponses);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(authentication);
app.use(routes);
app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
