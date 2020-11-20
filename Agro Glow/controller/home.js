const express = require('express');
const userModel = require.main.require('./models/userModels');
const router = express.Router();

router.get('/manager', (req, res)=>{
	userModel.getInformation(function(results){
		res.render('user/manager/home', {userInformation : results});
	  });
})

router.get('/manager/profile', (req, res)=>{
	userModel.getInformation(function(results){
		res.render('user/manager/profile', {userInformation : results});
	  });	
});

router.post('/manager/profile', (req, res)=>{
	
	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		user = {
			'userName'  : req.body.userName,
			'name'  	: req.body.firstName+' '+req.body.lastName,
			'email' 	: req.body.email,
			'DOB'   	: req.body.DOB,
			'mobileNo' 	: req.body.mobileNo,
			'password'	: password	
		}
		userModel.editUser(user,function(status){
			if(status){
				res.redirect('/home/manager/profile');
				console.log(user.userName);
			}else{
				res.redirect('/home/manager/profile');
				console.log('2');
			}
		})
	}else{
			res.redirect('/home/manager/profile');
			console.log('2');
		}
	
	// userModel.getInformation(function(results){
	// 	res.render('user/manager/profile', {userInformation : results});
	//   });	
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

router.get('/manager/systemLeave', (req, res)=>{

	res.render('user/manager/systemLeave');
})

router.get('/manager/customizeFarmer/edit', (req, res)=>{

	res.render('user/manager/customize/edit/editFarmer');
})

router.get('/manager/customizeSeller/edit', (req, res)=>{

	res.render('user/manager/customize/edit/editSeller');
})



router.get('/', (req, res)=>{
	if(req.cookies['uname'] != null){
			var data = {
							'name' : req.cookies['uname'],
							'id' : '123'
						};
		res.render('home/index', data);
	}else{
		res.redirect('login');
	}
});

router.get('/userlist', (req, res)=>{

	  userModel.getUsers(function(results){

		res.render('home/userlist', {userlist : results});
	  });
	  
});

module.exports = router;