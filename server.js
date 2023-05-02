const { urlencoded } = require('body-parser');
const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();

const app=express();
app.use(express.static(__dirname+'/public'));
app.use(urlencoded({extended:false}));
app.set('view engine','ejs')


//DB connection👇👇

mongoose.connect(process.env.DB_CONNECTION ,{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>console.log('db connected'))
.catch(err=>console.error('Could not connect to MongoDB',err));
const users=require('./formSchema');


app.get('/',(req,res)=>{
    res.sendFile('index.html');
})
app.get('/success',(req,res)=>{
    let params={
        name:req.query.name,
        phone:req.query.phone,
        email:req.query.email
    }
    res.render('submitSuccess.ejs',params);
})

app.get('/users',async(req,res)=>{
    let data=await users.find({}).select({name:1,phoneNumber:1,email:1,_id:0});
    let userData={
        userRecord:data
    }
    // ejs didn't liked having an array as input 
    // no problem, I made an Object and passed it to ejs

    res.render('userDetails.ejs', userData);
})



app.post('/formSubmit',async(req,res)=>{
        try{
            await users.create({name:req.body.name.toLowerCase(),phoneNumber:req.body.phone,email:req.body.email})
        }
        catch(e){
            console.log(e);
        }
    res.redirect(`/success?name=${req.body.name}&phone=${req.body.phone}&email=${req.body.email}`);
})

app.listen(8000,()=>{
    console.log('server running at localhost:8000');
})

// make a condition in which if the user already exist then send the info to the user and dont subit the data
// current problem nothing is working