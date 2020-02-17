const User = require('./User.js');

const mongoose = require('mongoose');

function connect(){
    return mongoose.connect('mongodb://localhost:27017/CabBookingApp',
                            {
                                useNewUrlParser:true, 
                                useUnifiedTopology:true
                            }
                            );

}

module.exports = {
    models:{
        User:User
    },
    connect:connect
}