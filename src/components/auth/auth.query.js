const db = require("../../db");

const readUser = callback => {
  let sql = "SELECT * FROM users";
  db.query(sql, (err, success) => {
    if (err) {
      callback(err);
    }
    callback(null, success);
  });
};

const loginUser = (user, callback) => {
  //query here
  let sql = `UPDATE users SET loggedIn=1 WHERE users.id = ${user.id};`;
  db.query(sql, (err, success) => {
    if (err) {
      return callback(err);
    }
    callback(null, success);
  });
};

const logoutUser = (user, callback) => {
  let sql = `UPDATE users SET loggedIn=0 WHERE users.id = ${user.id};`;
  db.query(sql, (err, success) => {
    if (err) {
      return callback(err);
    }
    callback(null, success);
  });
};

const registerUser = (user, callback) => {
  let post = user;
  let sql = "INSERT INTO users SET ?";
  db.query(sql, post, (err, success) => {
    if (err) {
      return callback(err);
    }
    callback(null, success);
  });
};

module.exports = {
  loginUser,
  registerUser,
  readUser,
  logoutUser
};
