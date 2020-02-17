const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var userSchema = new Schema({

        name:{
            type:String,
            required:[true,'Can\'t be blank'],
            trim:true,
            minlength:[3,'The length of name should be atleast 3 characters']
            
        },
        email:{
            type:String,
            required:[true,'Can\'t be blank'],
            trim:true,
            lowercase:true,
            unique:true,
            uniqueCaseInsensitive:true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address']

        },
        phonenumber:{
            type:String,
            required:[true,'Can\'t be blank'],
            trim:true,
            unique:true,
            match:[/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,'Please fill a valid phone number']
            
        },
        password:{
            type:String,
            required:[true,'Can\'t be blank'],
            trim:true,
            minlength:[8,'Password\'s length should be atleast 8 characters']

        },
        rides: [{
            type:  Schema.Types.ObjectId,
            ref: 'ride'
        }]
        /*avatar:{
             type: String,
             default:''
        }*/
        
    }, { collection:'users'}
)
userSchema.plugin(uniqueValidator,{message:'The email or phone number already exists'});

const User = mongoose.model('User', userSchema);

module.exports = User;