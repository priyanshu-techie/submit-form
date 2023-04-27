const mongoose=require('mongoose')

let formSchema=new mongoose.Schema({
    name:String,
    phoneNumber:Number,
    email:String
})

 module.exports=mongoose.model('formData',formSchema);