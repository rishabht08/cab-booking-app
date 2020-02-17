const User = require('./../models/User.js');
const md5 = require('md5');
const UserController = {};

UserController.register = function(req, res){
    
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phonenumber = req.body.phonenumber;
    
    User.create({name:name,email:email,phonenumber:phonenumber,password:password
                /*avatar:`https://gravatar.com/avatar/${md5(data.email)}?s=128`*/
                }, function(error,response){
                                        if(error){
                                                    return res
                                                    .send({
                                                            status:false,
                                                            message:"Failed to create a user",
                                                            data:error
                                                          })
                                                }
                                        req.session.user = response;
                                        console.log(req.session.user);
                                        return res
                                        .status(200)
                                        .send({
                                                status:true,
                                                message:'Congratulations! You can login now',
                                                data:response
                                             })    
                                    }
                )
    }




UserController.login = function(req, res){

    
    var email = req.body.email;
    var password = req.body.password;
    
    

    var emailexpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!email){
        return res.send({status:401,message:'email is required'});
    }
    if(!(emailexpression.test(email))){
        return res.send({status:401,message:'You have entered an invalid email address'});
    }
    
    if(!password){
        return res.send({status:401,message:'password is required'});
    }
    
    User.findOne({email:email},function(error, response){
        if(error){
            return res
        .send({
                status:404,
                 message: error,
              });
        }
        if(!response){

            return res.send({status:401,message:"This email doesn't exist"});

            
        }
        else{

            if(password===response.password){
            
                
            req.session.user = response;
            console.log(req.session.user);
            return res
            .status(200)
            .send({
                    status:200,
                    message:'You are logged in now',
                    data : response
                 });
            }
            
            else{
                return res
                .send({
                        status:401,
                        message:'Incorrect Password, Try again',
                        
                     });
            }

            }

        })
        
    }

UserController.logout = function(req,res){

    req.session.destroy();
    return res.send({status:true, message:"logged out"});
}

    

module.exports = UserController;