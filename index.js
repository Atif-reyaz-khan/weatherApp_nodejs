const express=require('express');
const bodyParser=require('body-parser');
const request = require('request');
const ejs = require("ejs");
const app=express();
app.set('view engine', 'ejs');

const port =process.env.PORT|| 3000;
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.render("index",{country:'country name',weData:"Enter city name to find the weaterh condition"});
})
app.post('/', (req,res)=>{

const cityname=req.body.city;


const url=`http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=7694dfaa855a6623918477fb1d47732f`;
request(url,(error,response,body)=>{
    const data=JSON.parse(body);

const temp=data.main.temp;
const country=cityname;
res.render("index",{country:country,weData:temp});
    
});



});

app.get('*',(req,res)=>{
    res.send("page not found ");
})
app.listen(port,()=>{
    console.log("server is up and running on port ",port);
})