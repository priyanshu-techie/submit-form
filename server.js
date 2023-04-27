const { urlencoded } = require('body-parser');
const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();

const app=express();
app.use(express.static(__dirname+'/public'));
app.use(urlencoded({extended:true}));
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
    res.json(data); 
})// will this make the page load slow ?? 


app.post('/formSubmit',async(req,res)=>{
    console.log(req.body);
    try{
        await users.create({name:req.body.name,phoneNumber:req.body.phone,email:req.body.email})
    }
    catch(e){
        console.log(e);
    }
    
    res.redirect(`/success?name=${req.body.name}&phone=${req.body.phone}&email=${req.body.email}`);
})

app.listen(8000,()=>{
    console.log('server running at localhost:8000');
})

// make the form beautiful, revise css
// ejs wala ko github me uplod
// in all users using ejs show the data in more beautiful way
// aisa implementation kro ki jb phone number 10 digits se jyada ho to error show kre user ko, and do it from the backend side not the fronend 