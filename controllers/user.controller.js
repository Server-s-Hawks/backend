var dbConn = require("../dbconfig");
var dbQuery = require("../query");

// create user
const createUser = async (req, res) => {
  let user_ID = req.body.user_ID;
  let name = req.body.name;
  let address_city = req.body.address_city;
  let email = req.body.email;
  let dob = req.body.dob;
  let nic = req.body.nic;
  let password = req.body.password;

  // validation
  if (!email || !password)
    return res.status(400).send({
      error: true,
      message: "Please provide all details",
    });

  // insert to db
  dbConn.query(
    dbQuery.userQueries.insertUser,
    [user_ID, name, dob, nic, email, address_city, password],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "User successfully added",
      });
    }
  );
};

//get all users
const getAllUsers = async (req, res) => {
  dbConn.query(dbQuery.userQueries.getAllUsers, function (error, results, fields) {
    if (error) throw error;

    // check has data or not
    let message = "";
    if (results === undefined || results.length == 0)
      message = "Users table is empty";
    else message = "Successfully retrived all users";

    return res.send({ error: false, data: results, message: message });
  });
};

// get user by id
const getUserById = async (req, res) => {
    let userID = req.params.id;

    dbConn.query(dbQuery.userQueries.getUserByUserID,
    [userID], function (error, results, fields) {
      if (error) throw error;
  
      // check has data or not
      let message = "";
      if (results === undefined || results.length == 0)
        message = "No user with that ID";
      else message = "Successfully retrived user data";
  
      return res.send({ error: false, data: results, message: message });
    });
  };

// update user with id
const updateUser = async (req, res) => {
  let user_ID = req.params.id;
  let name = req.body.name;
  let address_city = req.body.address_city;
  let email = req.body.email;
  let dob = req.body.dob;
  let nic = req.body.nic;
  let password = req.body.password;

  // validation
  if (!email || !password) {
    return res.status(400).send({
      error: true,
      message: "Please provide email and password",
    });
  }

  dbConn.query(
    dbQuery.userQueries.updateUser,
    [name, dob, nic, email, address_city, password, user_ID],
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
};

// delete user
const deleteUser = async (req, res) => {
    let userID = req.params.id;
  
    if (!userID) {
        return res.status(400).send({ error: true, message: 'Please provide user id' });
    }
    dbConn.query(dbQuery.userQueries.deleteUser, [userID], function (error, results, fields) {
        if (error) throw error;

        // check data updated or not
        let message = "";
        if (results.affectedRows === 0)
            message = "User not found";
        else
            message = "User successfully deleted";

        return res.send({ error: false, data: results, message: message });
    });
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};