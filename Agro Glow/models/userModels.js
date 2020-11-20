const db = require('./db');

module.exports ={

    createUser : function(newUser, callback){
        var sql = "insert into users values (' ', '"+newUser.name+"', '"+newUser.email+"', 'null', 'null', 'null', '"+newUser.password+"', 'user', '1')";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    validate : function(user, callback){
        var sql = 'select * from users where email = "'+user.email+'" and password = "'+user.password+'"';
        db.getResults(sql, function(results){
            if(results.length > 0){
                callback(true);
            }else{
                callback(false);
            }
        })
    },

    getInformation : function(callback){
        var sql = 'select * from users where email = "'+user.email+'" ';
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