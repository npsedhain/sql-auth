const query = require("./auth.query");

const login = (req, res, next) => {
  query.logUser((err, success) => {
    if (err) {
      res.json({
        err
      });
    } else {
      res.json({
        msg: "table created successfully"
      });
    }
  });
};

module.exports = {
  login
};
