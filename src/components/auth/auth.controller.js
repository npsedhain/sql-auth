const query = require("./auth.query");
const bcrypt = require("bcrypt");
const saltRounds = 5;

let users;

const login = (req, res, next) => {
  query.readUser((err, success) => {
    if (err) {
      return console.log("err reading user");
    }
    users = success;
    let loginFlag;
    for (let i = 0; i < users.length; i++) {
      loginFlag = users[i].loggedIn;
      console.log("flag>>", loginFlag);
      if (loginFlag) {
        break;
      }
    }
    if (users.length) {
      if (!loginFlag) {
        const user = users.find(user => user.username === req.body.username);
        if (user) {
          bcrypt.compare(req.body.password, user.password, function(
            err,
            success
          ) {
            if (err) {
              res.status(400).json({
                err: "the entered password is incorrect"
              });
            } else {
              query.loginUser(user, (err, success) => {
                if (err) {
                  return res.status(400).json({
                    err: "error logging the user in!"
                  });
                }
                res.status(200).json({
                  success: "Successfully logged in!"
                });
              });
            }
          });
        } else {
          res.json({
            err: "username or password is incorrect"
          });
        }
      } else {
        const user = users.find(user => user.username === req.body.username);
        if (user.loggedIn) {
          return res.status(400).json({
            err: "Ah! you forgot..you are already logged in :)"
          });
        }
        res.status(400).json({
          err: "another account is logged in, logout from that and try again!"
        });
      }
    } else {
      res.status(400).json({
        err: "there are no existing accounts, please register first"
      });
    }
  });
};

const register = (req, res, next) => {
  let password = req.body.password;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      return res.status(500).json({
        err: "Error hashing sorry!"
      });
    }
    let user = { username: req.body.username, password: hash };
    query.registerUser(user, (err, success) => {
      if (err) {
        res.status(400).json({
          err: "error while registering user"
        });
      } else {
        res.status(200).json(user);
      }
    });
  });
};

const logout = (req, res, next) => {
  query.readUser((err, success) => {
    if (err) {
      return console.log("err reading user");
    }
    let loggedUser;
    users = success;
    let loginFlag;
    for (let i = 0; i < users.length; i++) {
      loginFlag = users[i].loggedIn;
      loggedUser = users[i];
      console.log("loggg> >", loginFlag);
      if (loginFlag) {
        break;
      }
    }
    if (loginFlag) {
      console.log("logged>>", loggedUser.id);
      if (loggedUser.id === parseInt(req.query.id)) {
        query.logoutUser(loggedUser, (err, success) => {
          if (err) {
            return res.status(400).json({
              err: "error logging out, try again!"
            });
          }
          res.status(200).json({
            err: "Adios,you are logged out!"
          });
        });
      } else {
        res.status(400).json({
          err: "You cannot log out other's account. You fraud!"
        });
      }
    } else {
      res.status(400).json({
        err: "You are not logged in!"
      });
    }
  });
};

module.exports = {
  login,
  register,
  logout
};
