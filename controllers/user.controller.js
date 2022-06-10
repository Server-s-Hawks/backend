
// create user
const createUser = async (req, res) => {
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
  dbConn.query(
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
};

//get all users
const getAllUsers = async (req, res) => {
  dbConn.query("SELECT * FROM users", function (error, results, fields) {
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

    dbConn.query("SELECT * FROM users where userID = ?",
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

  dbConn.query(
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
};

// delete user
const deleteUser = async (req, res) => {
    let userID = req.params.id;
  
    if (!userID) {
        return res.status(400).send({ error: true, message: 'Please provide user id' });
    }
    dbConn.query('DELETE FROM users WHERE userID = ?', [userID], function (error, results, fields) {
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