const fs= require('fs');
const express=require('express');
const app=express();
// const bodyParser=require('body-parser');
const path=require('path');
const { json } = require('body-parser');
let loginDetails=[];
app.use(express.static(path.join(__dirname,'public'))); //  for use css and js file public folder
app.use(express.urlencoded({extended:true}));  //  for post request URL
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json())
app.set('views',path.join(__dirname,'views'));  //  for ejs view folder

app.set('view engine','ejs'); //  set ejs engine

app.get('/home',(req,res)=>{
    res.render('home')
})
app.post('/signup',(req,res)=>{
    loginDetails.push(req.body);
    fs.writeFile(path.join(__dirname,'jsonObj','obj.txt'),JSON.stringify(loginDetails),(err)=>{
        if(err){
            console.log(err);
            return;
        }
        res.send("register suucessfully please login again");
    })
})
// function saveData(){
//     return new Promise((res,rej)=>{
//         fs.writeFile(path.join(__dirname,'jsonObj','obj.txt'),JSON.stringify(loginDetails),(err)=>{
//             if(err){
//                 console.log(err);
//                 return;
//             }
//             res.send("register suucessfully please login again");
//         })
//     })
// }
function getData(){
    return new Promise((res,rej)=>{
        fs.readFile(path.join(__dirname,'jsonObj','obj.txt'),'utf-8',(err,data)=>{
            if(err){
                rej(err);
                return;
            }
           res(data);
    })
})
    
}
app.post('/login',(req,res)=>{
    getData().then((item)=>{
        const val=JSON.parse(item);
        val.forEach(data => {
            if(data.email===req.body.email){
                res.send("Successfully login")
            }
            else{
                res.send("wrong email or password")
            }
        });
    })    
})
const PORT=4040;
app.listen(PORT,()=>{
    console.log(`Server is Running at port http://localhost:${PORT}/home`);
});