const express =require("express");
const app = express();
const bodyParser= require("body-parser");
const cors= require("cors");
const mysql = require("mysql");



const db = mysql.createPool({
    host:"localhost",
    user: "root",
    password:"Tharindu@mysql1999",
     database: "Employee_Management_System"})



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));



//-------------------------------Tharindu Wijetunge----------------------------------
app.get("/api", (req,res)=>{
    const sqlget=`select Username from Account where Password= "1234"`;
    db.query(sqlget, (error,result)=>{
        res.send(result);
    })
})

app.post("/api/login",(req,res)=>{
    let uname = req.body.username;
    let psword = req.body.password;
    const sqlpost = `select 
                     User_.userID,
                     Account.Username, 
                     Account.Password, 
                     Account.type, 
                     User_.userName, 
                     User_.Email, 
                     User_.address 
                     from User_ cross join Account
                     on 
                     Account.Username='${uname}' and Account.Password='${psword}'
                     and
                     User_.userID=Account.UID`;

    db.query(sqlpost,(error,result)=>{

        result = JSON.parse(JSON.stringify(result));
        if(result[0]!=null){
            if(result[0].Username==uname && result[0].Password==psword){
                res.send({
                    message:"successfull",
                    status:true,
                    type: result[0].type,
                    name:result[0].userName,
                    email:result[0].Email,
                    address: result[0].address,
                    uid:result[0].userID
                })
            }

            else{
                res.send({
                    message:"unsuccessfull"
                })

            }

        }
        else{
            res.send({
                message:"user not found"
            })
        }
    })
});

app.post('/api/profile/update/:uid_',(req,res)=>{
    const {uid_}=req.params;
    

    const sqlpost = `update User_ set userName='${req.body.name}' ,Email='${req.body.email}', address='${req.body.address}' where userID='${uid_}'`;
    db.query(sqlpost,(error,result)=>{
        res.send({
            message:"successful"
        })
    })
});

app.post('/profile/loan', (req,res)=>{
    let uid= req.body.userID;
    let amount= req.body.amount;
    let description= req.body.description;

    const loanpost=`insert into 
    Loan  (Amount,description, loandate,loanstatus,remarks,userID ,HRID )
    values( '${amount}','${description}',curdate(), "pending","null", '${uid}',null);`;
    db.query(loanpost, (error,result)=>{
        res.send({
            message:"successful"
        })
    })
});

app.post('/profile/leave',(req,res)=>{
    let userid = req.body.uid;
    let description = req.body.description;
    let leavetype = req.body.leavetype;
    let fromdate = req.body.fromdate;
    let todate = req.body.todate;

    const leavepost=`insert into Leave_(LeaveType,description,fromdate,todate,userID,ManagerID) values('${leavetype}','${description}','${fromdate}','${todate}',"pending",'${userid}',null)`;
    db.query(leavepost,(error,result)=>{
        res.send({
            message:"successful"
        })
    })
});

app.post('/profile/attendance',(req,res)=>{
    let  uID = req.body.userid;
    const attendancepost=`call attendance('${uID}',@marked);
    select @marked;`;
    db.query(attendancepost,(error,result)=>{
        res.send({
            message:"successfull"
        })
    })
})

//-----------------------------------------------------------------------------

//-------------------------Sahanya Ranaweera--------------------------------------------

// create user
app.post('/create', (req, res) => {
    let LastName = req.body.LastName;
    let FirstName = req.body.FirstName;
    let Address = req.body.Address;
    let City = req.body.City;
  
    // validation
    if (!LastName || !FirstName)
      return res.status(400).send({
        error: true,
        message: "Please provide first name and last name",
      });
  
    // insert to db
    db.query(
      "INSERT INTO users (LastName, FirstName, Address, City) VALUES (?, ?, ?, ?)",
      [LastName, FirstName, Address, City],
      function (error, results, fields) {
        if (error) throw error;
        return res.send({
          error: false,
          data: results,
          message: "User successfully added",
        });
      }
    );
  });



//get all users------------------
  app.get('', (req, res) => {
    db.query("SELECT * FROM users", function (error, results, fields) {
      if (error) throw error;
  
      // check has data or not
      let message = "";
      if (results === undefined || results.length == 0)
        message = "Users table is empty";
      else message = "Successfully retrived all users";
  
      return res.send({ error: false, data: results, message: message });
    });
  });


// get user by id----------------------
  app.get('/:id', (req, res) => {
    let userID = req.params.id;

    db.query("SELECT * FROM users where userID = ?",
    [userID], function (error, results, fields) {
      if (error) throw error;
  
      // check has data or not
      let message = "";
      if (results === undefined || results.length == 0)
        message = "No user with that ID";
      else message = "Successfully retrived user data";
  
      return res.send({ error: false, data: results, message: message });
    });
  });

  
// update user with id----------------------------------
  app.patch('/:id', (req, res) => {
    let userID = req.params.id;
    let LastName = req.body.LastName;
    let FirstName = req.body.FirstName;
    let Address = req.body.Address;
    let City = req.body.City;
  
    // validation
    if (!LastName || !FirstName) {
      return res.status(400).send({
        error: true,
        message: "Please provide user firstname, lastname",
      });
    }
  
    db.query(
      "UPDATE users SET LastName = ?, FirstName = ?, Address = ?, City = ? WHERE userID = ?",
      [LastName, FirstName, Address, City, userID],
      function (error, results, fields) {
        if (error) throw error;
  
        // check data updated or not
        let message = "";
        if (results.changedRows === 0)
          message = "User data not found or data are same";
        else message = "User data successfully updated";
  
        return res.send({ error: false, data: results, message: message });
      }
    );
  });



  app.delete('/:id', (req, res) => {
    let userID = req.params.id;
  
    if (!userID) {
        return res.status(400).send({ error: true, message: 'Please provide user id' });
    }
    db.query('DELETE FROM users WHERE userID = ?', [userID], function (error, results, fields) {
        if (error) throw error;

        // check data updated or not
        let message = "";
        if (results.affectedRows === 0)
            message = "User not found";
        else
            message = "User successfully deleted";

        return res.send({ error: false, data: results, message: message });
    });
});


//---------------------------------------------------------------------------------------------------








app.listen(5000,()=>{
    console.log("Server running on port 5000");
})

//----------Niroshika Dilhani----------------------------

app.post("/client", (req, res) => {
    
    
  const BasicSalary=req.body.Basic;
  const user_ID=req.body.user_ID;
  const allowance_transport=req.body.allowance_transport;
  const allowance_travel=req.body.allowance_travel;
  const allowance_entertainment=req.body.allowance_entertainment;
  const allowance_housing=req.body.allowance_housing;
  const allowance_medical=req.body.allowance_medical;
  const deduction_Tax=req.body.deduction_Tax;
  const deduction_loans=req.body.deduction_Loans;
  const deduction_advance=req.body.deduction_Advance;
  const deduction_EPF=req.body.deduction_EPF;


  db.query(
   'INSERT INTO salary (amount,user_ID) VALUES (?,?) ',
   [BasicSalary,user_ID],
   (err, result) => {
       if(err){
           console.log(err)
       }else{
           res.send("Values Inserted")
       }
   }
   )

   db.query(
      'INSERT INTO allowances (transport,travel,entertainment,housing ,medical,user_ID) VALUES (?,?,?,?,?,?)',
      [allowance_transport,allowance_travel,allowance_entertainment,allowance_housing,allowance_medical, user_ID],
      (err, result) => {
          if(err){
              console.log(err)
          }else{
              res.send("Values Inserted")
          }
      }
      )

      db.query(
          'INSERT INTO deduction (tax,loans,advance,EPF,user_ID) VALUES (?,?,?,?)',
          [deduction_Tax,deduction_loans,deduction_advance,deduction_EPF,user_ID],
          (err, result) => {
              if(err){
                  console.log(err)
              }else{
                  res.send("Values Inserted")
              }
          }
          )

    
})

