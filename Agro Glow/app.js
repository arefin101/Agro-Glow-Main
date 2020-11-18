
const express 		 = require('express');
const expressLayouts = require('express-ejs-layouts')
const bodyPars 		 = require('body-parser');
const cookieParser 	 = require('cookie-parser');
const exSession 	 = require('express-session');
const login 		 = require('./controller/login');
const home 			 = require('./controller/home');
const logout 		 = require('./controller/logout');
const user			 = require('./controller/user');
const app 			 = express();

app.set('view engine', 'ejs');

app.set('layout', './layouts/main');

app.use(expressLayouts);
app.use('/assets', express.static('assets'));
app.use(bodyPars.urlencoded({extended : false}));
app.use(exSession({secret : 'my secret value', saveUninitialized : true, resave : false}));
app.use(cookieParser());
app.use('/login', login);
app.use('/home', home);
app.use('/logout', logout);
app.use('/user', user);

app.get('/', (req, res)=>{
	res.render('hudai');
})

app.listen(3000, (error)=>{
	console.log('server started in 3000 port');
});