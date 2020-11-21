const db = require('./db');

module.exports ={

    createUser : function(newUser, callback){
        var sql = "insert into users values (' ', '"+newUser.name+"', '"+newUser.email+"', '"+newUser.DOB+"', '"+newUser.mobileNo+"', '"+newUser.userName+"', '"+newUser.password+"', '"+newUser.userType+"', '1')";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    validate : function(user, callback){
        var sql = 'select * from users where email = "'+user.userName+'" or username = "'+user.userName+'" and password = "'+user.password+'"';
        db.getResults(sql, function(results){
            if(results.length > 0){
                callback(true);
            }else{
                callback(false);
            }
        })
    },

    getInformation : function(user, callback){
        var sql = 'select * from users where email = "'+user.userName+'" or userName ="'+user.userName+'" and validity = "1"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getAllsellers : function(callback){
        var sql = 'select * from users where userType = "seller"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getAllfarmers : function(callback){
        var sql = 'select * from users where userType = "farmer"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getSeller : function(userName, callback){
        var sql = 'select * from users where username = "'+userName+'" and userType = "seller"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getFarmer : function(userName, callback){
        var sql = 'select * from users where username = "'+userName+'" and userType = "farmer"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    editUser : function(user, callback){
        var sql = "update users set name = '"+user.name+"', email = '"+user.email+"', DOB = '"+user.DOB+"', mobileNo = '"+user.mobileNo+"', password = '"+user.password+"' where userName = '"+user.userName+"'"
        db.execute(sql, function(status){
            callback(status);
        })
    },

    editSeller : function(user, callback){
        var sql = "update users set name = '"+user.name+"', email = '"+user.email+"', DOB = '"+user.DOB+"', mobileNo = '"+user.mobileNo+"' where userName = '"+user.userName+"' and userType ='seller' "
        db.execute(sql, function(status){
            callback(status);
        })
    },

    ////////////////////////

    getUsers : function(callback){
        var sql = 'select * from user';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getUser : function(user, callback){
        var sql = 'select * from user where uname = "'+user+'"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    // createUser : function(newUser, callback){
    //     var sql = "insert into user values ('"+newUser.uname+"', '"+newUser.email+"', '"+newUser.pass+"', '"+newUser.dept+"')";
    //     db.execute(sql, function(status){
    //         callback(status);
    //     })
    // },

    // editUser : function(user, callback){
    //     var sql = "update user set email ='"+user.email+"', pass ='"+user.pass+"', dept ='"+user.dept+"' where uname ='"+user.uname+"'"
    //     db.execute(sql, function(status){
    //         callback(status);
    //     })
    // },

    deleteUser : function(user, callback){
        var sql = "delete from user where uname ='"+user+"'"
        db.execute(sql, function(status){
            callback(status);
        })
    }

}