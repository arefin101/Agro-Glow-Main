const express = require('express');
const userModel = require.main.require('./models/userModels');
const router = express.Router();

router.get('/manager', (req, res)=>{
		
	res.render('user/manager/home');

});

router.post('/manager', (req, res)=>{


});

router.get('/manager/profile', (req, res)=>{
		
	res.render('user/manager/profile');

});

router.post('/manager/profile', (req, res)=>{
});

router.get('/manager/seeSellers', (req, res)=>{

	res.render('user/manager/seeUsers/seeSellers');
})

router.get('/manager/seeFarmers', (req, res)=>{

	res.render('user/manager/seeUsers/seeFarmers');
})

router.get('/manager/addSeller', (req, res)=>{

	res.render('user/manager/addUser/addSeller');
})

router.get('/manager/addFarmer', (req, res)=>{

	res.render('user/manager/addUser/addFarmer');
})

router.get('/manager/customizeSeller', (req, res)=>{

	res.render('user/manager/customize/customizeSeller');
})

router.get('/manager/customizeFarmer', (req, res)=>{

	res.render('user/manager/customize/customizeFarmer');
})

router.get('/manager/addSellers', (req, res)=>{

	res.render('user/manager/addSellers');
})

router.get('/manager/addFarmers', (req, res)=>{

	res.render('user/manager/addFarmers');
})

router.get('/manager/addProduct', (req, res)=>{

	res.render('user/manager/addProduct');
})

router.get('/manager/editProducts', (req, res)=>{

	res.render('user/manager/editProducts');
})



router.post('/create', (req, res)=>{

	newUser ={
		'uname' : req.body.uname,
		'email' : req.body.email,
		'pass'  : req.body.pass,
		'dept'  : req.body.dept
	}

	userModel.createUser(newUser,function(status){
		if(status){
			res.redirect('/home/userlist');
		}else{
			res.redirect('/create');
		}
	})

});


router.get('/edit/:uname', (req, res)=>{

	var user = req.params.uname;

	userModel.getUser(user, function(results){
		console.log(results);
	  res.render('user/edit', {data : results});
	});
})

router.post('/edit/:uname', (req, res)=>{

	user = {
		'uname' : req.body.uname,
		'email' : req.body.email,
		'pass'  : req.body.pass,
		'dept'  : req.body.dept
	}
	userModel.editUser(user, function(status){
		if(status){
			res.redirect('/home/userlist');
		}else{
			res.redurect('/edit/:uname');
		}
	})
})


router.get('/delete/:uname', (req, res)=>{

	var user = req.params.uname;

	userModel.getUser(user, function(results){
		console.log(results);
	  res.render('user/delete', {data : results});
	});

});

router.post('/delete/:uname', (req, res)=>{
		
	user = req.params.uname;
	userModel.deleteUser(user, function(status){
		if(status){
			res.redirect('/home/userlist');
		}else{
			res.redurect('/delete/:uname');
		}
	})

});

module.exports = router;