const db = require("../../db");

const logUser = callback => {
  //query here
  let sql =
    "CREATE TABLE users(id int AUTO_INCREMENT, username VARCHAR(50), password VARCHAR(50), PRIMARY KEY (id))";
  db.query(sql, (err, success) => {
    if (err) {
      return callback(err);
    }
    callback(null, success);
  });
};

module.exports = {
  logUser
};
