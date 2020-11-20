const express = require('express');
const userModel = require.main.require('./models/userModels');
const router = express.Router();

router.get('/', (req,res)=>{
	res.render('login/login', {layout : './layouts/main2'});
});

router.post('/', (req, res)=>{

	console.log(req.body.email);

	user = {
		'email' : req.body.email,
		'password' : req.body.password
	}

	userModel.validate(user, function(status){
		if(status){
			//res.cookie('email', req.body.email);
			res.redirect('/home/manager');
		}else{
			res.redirect('/login');
		}

	})
});


router.get('/register', (req,res)=>{
	res.render('login/register', {layout : './layouts/main2'});
});

router.post('/register', (req, res)=>{

	if(req.body.password == req.body.repassword){
		password = req.body.password
		console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		newUser = {
			'name' : req.body.firstName+' '+req.body.lastName,
			'email' : req.body.email,
			'password' : password	
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/login');
			}else{
				res.redirect('/login/register');
			}
		})
	}else{
			res.redirect('/login/register');
		}

	console.log(req.body.firstName+' '+req.body.lastName);

});

router.get('/forgot-password', (req,res)=>{
	res.render('login/forgot-password', {layout : './layouts/main2'});
});

router.post('/forgot-password', (req, res)=>{

	res.redirect('/forgot-password');
});

module.exports = router;