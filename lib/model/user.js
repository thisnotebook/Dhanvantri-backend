const  mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');
const userSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    uniqueId: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
});

userSchema.methods.generateAuthToken = function (){
const token = jwt.sign({id:this._id}, process.env.JWTPRIVATEKEY,
    {expiresIn:"7d"})
    return token;
};
const User = mongoose.model('userDatas',userSchema);
 

const validate = (data) =>{
    const schema = Joi.object({
        firstName:Joi.string().required().label("First Name"),
        lastName:Joi.string().required().label("Last Name"),
        uniqueId:Joi.string().required().label("Unique Id"),
        email:Joi.string().email().required().label("Email"),
        password:passwordComplexity().required().label("password"),
    });
    return schema.validate(data)
}

module.exports= {User, validate}