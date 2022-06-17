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
         console.log("connection failed");
     }
     else {
         console.log("Database called");
     }
     
 })
 module.exports = connect;