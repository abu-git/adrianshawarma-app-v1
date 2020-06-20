const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const exphbs = require('express-handlebars');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const appRoute = require('./routes/index');

const app = express();


//Handlebars template settings
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

//Data parsing
app.use(express.urlencoded({
	extended: false
}));
app.use(express.json());

//HTTP to HTTPS Redirect
app.use(sslRedirect());


app.use(cors());

//Helmet for Security
app.use(helmet());

// Serve static files public folder
app.use(express.static(path.join(__dirname, '/public')));

//PORT
const PORT = process.env.PORT || 5000;

//app Route
app.use('/', appRoute);


app.listen(PORT, ()=>{
	console.log("Server running on " + PORT);
});