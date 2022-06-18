const userQueries = {
    "insertUser":"INSERT INTO user (user_ID, name, dob, nic, email, address_no, address_street, address_city, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    "getAllUsers":"SELECT * FROM user",
    "getUserByUserID":"SELECT * FROM user where user_ID = ?",
    "updateUser":"UPDATE user SET name = ?, dob = ?, nic = ?, address_no = ?, address_street = ?, address_city = ? WHERE user_ID = ?",
    "deleteUser":"DELETE FROM user WHERE user_ID = ?"
}

module.exports = {
    userQueries,
}