// import mongoose from 'mongoose';
const mongoose =require("mongoose");
// or productSchema
 const doctorModel = new mongoose.Schema({
    employee_id:{type: String, required: true, unique: true},
    name:{type: String, required: true},
    age:{type: String},
    gender:{type: String, required: true},
    images:{type: [String], required: true},
    experience:{type: String, required: true},
    fees:{type: String},
    phone:{type: String, required: true},
    address:{type: String, required: true},
    expertise:{type: [String], required: true},
    tags:{type: [String]},
    availability:{type: Map, required: true},
    education:{type: [Map], required: true},
    appointmentDates:{type: [Map], required: true},
    about : {type: String, required: true},
    
 });

 

 exports.Doctor = mongoose.model('doctorsdatas', doctorModel);

 //doctorsData  & doctorsdatas
 