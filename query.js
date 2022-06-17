const userQueries = {
    "insertUser":"INSERT INTO user (user_ID, name, dob, nic, email, address_city, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
    "getAllUsers":"SELECT * FROM user",
    "getUserByUserID":"SELECT * FROM user where user_ID = ?",
    "updateUser":"UPDATE user SET name = ?, dob = ?, nic = ?, email = ?, address_city = ?, password = ? WHERE user_ID = ?",
    "deleteUser":"DELETE FROM user WHERE user_ID = ?"
}

module.exports = {
    userQueries,
}