const express = require('express');
const userModel = require.main.require('./models/userModels');
const router = express.Router();

router.get('/', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		if(results[0].userType == 'manager'){
			res.redirect('/home/manager');
		}
	  });
})

router.get('/manager', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user, function(results){
		res.render('user/manager/home', {layout : './layouts/manager-main', userInformation : results});
	  });
})

router.get('/manager/profile', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user,function(results){
		res.render('user/manager/profile', {layout : './layouts/manager-main', userInformation : results});
		console.log(results);    
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
			'name'  	: req.body.name,
			'email' 	: req.body.email,
			'DOB'   	: req.body.DOB,
			'mobileNo' 	: req.body.mobileNo,
			'password'	: password	
		}
		userModel.editUser(user,function(status){
			if(status){
				res.redirect('/home/manager/profile');
				console.log('1');
			}else{
				res.redirect('/home/manager/profile');
				console.log('2');
			}
		})
	}else{
			res.redirect('/home/manager/profile');
			console.log('3');
		}
	
	// userModel.getInformation(function(results){
	// 	res.render('user/manager/profile', {userInformation : results});
	//   });	
});

router.get('/manager/seeSellers', (req, res)=>{

	userModel.getAllsellers(function(results){
		sellers = results;
		console.log(sellers);
	})
	user ={
		userName : req.cookies['user']
	}
	//{layout : './layouts/main2'}
	userModel.getInformation(user, function(results){
		res.render('user/manager/seeUsers/seeSellers', {layout : './layouts/manager-main',userInformation : results, sellerInformation : sellers});
	  });

	//res.render('user/manager/seeUsers/seeSellers');
})

router.get('/manager/seeFarmers', (req, res)=>{

	userModel.getAllfarmers(function(results){
		farmers = results;
		//console.log(farmers);
	})
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		res.render('user/manager/seeUsers/seeFarmers', {layout : './layouts/manager-main',userInformation : results, farmerInformation : farmers});
	  });
	//res.render('user/manager/seeUsers/seeFarmers');
})

router.get('/manager/addSeller', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/manager/addUser/addSeller', {layout : './layouts/manager-main', userInformation : results});
	  });

})

router.post('/manager/addSeller', (req, res)=>{

	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		newUser = {
			'name' 	   	: req.body.firstName+' '+req.body.lastName,
			'email'    	: req.body.email,
			'DOB'		: req.body.DOB,
			'mobileNo'	: req.body.mobileNo,
			'userName' 	: req.body.userName,
			'password' 	: req.body.password,
			'userType' 	: 'seller'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/manager/seeFarmers');
			}else{
				res.redirect('/home/manager/addSeller');
			}
		})
	}else{
			res.redirect('/home/manager/addSeller');
		}

	// userModel.getInformation(function(results){
	// 	res.render('user/manager/addUser/addSeller', {userInformation : results});
	//   });

})

router.get('/manager/addFarmer', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		res.render('user/manager/addUser/addFarmer', {layout : './layouts/manager-main', userInformation : results});
	  });

})

router.post('/manager/addFarmer', (req, res)=>{

	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		newUser = {
			'name' 	   	: req.body.firstName+' '+req.body.lastName,
			'email'    	: req.body.email,
			'DOB'		: req.body.DOB,
			'mobileNo'	: req.body.mobileNo,
			'userName' 	: req.body.userName,
			'password' 	: req.body.password,
			'userType' 	: 'farmer'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/manager/seeFarmers');
			}else{
				res.redirect('/home/manager/addFarmer');
			}
		})
	}else{
			res.redirect('/home/manager/addFarmer');
		}

	//res.render('user/manager/addUser/addFarmer',  {userInformation : results});
})

router.get('/manager/customizeSeller', (req, res)=>{

	user ={
		userName : req.cookies['user']
	}

	userModel.getAllsellers(function(results){
		sellers = results;
		// console.log(sellers);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/customize/customizeSeller', {layout : './layouts/manager-main', userInformation : results, sellerInformation : sellers});
	  });
})

router.get('/manager/customizeFarmer', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getAllfarmers(function(results){
		farmers = results;
		// console.log(farmers);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/customize/customizeFarmer', {layout : './layouts/manager-main', userInformation : results, farmerInformation : farmers});
	  });
})

router.get('/manager/customizeSeller/edit/:userName', (req, res)=>{

	var seller = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getSeller(seller, function(results){
		sellers = results;
		//console.log(results);
	})

	userModel.getInformation(user,function(results){
		res.render('user/manager/customize/edit/editSeller', {layout : './layouts/manager-main', userInformation : results, sellerInformation : sellers});
	  });
	  
})

router.post('/manager/customizeSeller/edit/:userName', (req, res)=>{

	user = {
		name   		: req.body.name,
		userName 	: req.params.userName,
		email		: req.body.email,
		DOB			: req.body.DOB,
		mobileNo	: req.body.mobileNo
	}

	console.log(req.body.name);

	userModel.editSeller(user, function(status){
		if(status){
			res.redirect('/home/manager/customizeSeller');
		}else{
			res.redirect('/manager/customizeSeller/edit/"'+user.userName+'"')
		}
	})

	// userModel.getInformation(function(results){
	// 	res.render('user/manager/customize/customizeSeller', {userInformation : results, sellerInformation : sellers});
	//   });
	  
})

router.get('/manager/customizeSeller/edit/:userName', (req, res)=>{

	var seller = req.params.userName;

	userModel.getFarmer(seller, function(results){
		farmers = results;
		//console.log(results);
	})

	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(function(results){
		res.render('user/manager/customize/edit/editFarmer', {layout : './layouts/manager-main', userInformation : results, farmerInformation : farmers});
	  });
	//res.render('user/manager/customize/edit/editFarmer');
})

// router.get('/manager/addSeller', (req, res)=>{

// 	userModel.getInformation(function(results){
// 		res.render('user/manager/addUser/addSeller', {userInformation : results});
// 	  });

// 	//res.render('user/manager/addSellers');
// })

// router.get('/manager/addFarmer', (req, res)=>{

// 	userModel.getInformation(function(results){
// 		res.render('user/manager/addUser/addFarmer', {userInformation : results});
// 	  });
	
// 	  //res.render('user/manager/addFarmers');
// })

router.get('/manager/addProduct', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/manager/addProduct', {layout : './layouts/manager-main', userInformation : results});
	  });

	//res.render('user/manager/addProduct');
})

router.get('/manager/editProducts', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/manager/editProducts', {layout : './layouts/manager-main', userInformation : results});
	  });

	//res.render('user/manager/editProducts');
})

router.get('/manager/systemLeave', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/manager/systemLeave', {layout : './layouts/manager-main', userInformation : results});
	  });

	//res.render('user/manager/systemLeave');
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