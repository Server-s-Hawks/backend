//const joi=require('joi'); // 'joi' is capital because, joi returns a class 
const express = require('express');  // it returns a 'function'
const app=express(); // this is how we call that function
                     // express() creates an application and it is now assign to our 'app' constant


//const dbconfig= require('./dbconfig');               

//app.use(express.json()); 
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));

const mysql=require('mysql2');

const connect= mysql.createConnection(
    {
        "host": "localhost",
        "user": "root",
        "password":"Zhan1005",
        "port": "3306",
        "database": "emp_system"
    }
);
 connect.connect((error)=>{
     if(error){
         console.log("connection failed", error);
     }
     else {
         console.log("Database connected");
     }
     
 })

 const userAPI = require("./apis/user.api");
 app.use("/user", userAPI());

app.get('/login', (req,res)=>{
    connect.query("select Username, Password from Account", (error, result)=>{
        if(error){
            console.log(error);
        }

        else {
            res.send(result);
        }
    })
});


app.get('/profile/users/:id', (req,res)=>{
    let uid=req.params.id;
    connect.query(`select LoanID, Amount,description,loandate,loanstatus from Loan where userID= ${uid}`, (error, result)=>{
        if(error){
            console.log(error);
        }
        else{
            res.send(result);
        }
    })

});

app.get('/profile/users/:id/processed-by', (req,res)=>{
    let uid=req.params.id;
    connect.query(`select L.LoanID, L.description, U.userName from User_ as U, Loan as L
    where L.HRID= U.userID and L.userID= ${uid}`, (error, result)=>{
        if(error){
            console.log(error);
        }
        else{
            res.send(result);
        }
    })

});























/*
const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}

]
*/

/*app.get('/', (req, res)=>{
    res.send('Helloooooo.....');
});

app.get('/api/courses', (req,res)=>{
    res.send(courses);
});*/


/*app.get('/api/courses/:id', (req,res)=>{
    const course=courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id wansnt found');
    res.send(course);
});*/


/*app.post('/api/courses', (req,res)=>{


    const schema= {
        name: joi.string().min(3).required()
    };

    const result=new joi.ValidationError(req.body,schema);


     
    if(!req.body.name||req.body.name.length<3){
        //bad request
        res.status(400).send('Name is needed and length must be greatervthan 3 charachters');
       return;
    }

    const course = {
        id: courses.length + 1, //when we integrate with database, the database will assign the id
        name: req.body.name  //as we need to read the name from the body of the request
    };
    courses.push(course);  //push it to the array
    res.send(course);      
})*/


//PORT
const port =process.env.PORT || 5000;   //here port is dynamically assigned by environment variables.
app.listen(port, ()=>console.log(`listenning on port ${port}`));