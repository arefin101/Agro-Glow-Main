const express = require('express');
const userModel = require.main.require('./models/userModels');
const router = express.Router();

router.get('/', (req,res)=>{
	res.render('login/login', {layout : './layouts/main2'});
});

router.post('/', (req, res)=>{

	//res.redirect('/user/manager');
});

router.get('/register', (req,res)=>{
	res.render('register/register', {layout : './layouts/main2'});
});

router.post('/register', (req, res)=>{

	res.redirect('/register');
});

module.exports = router;