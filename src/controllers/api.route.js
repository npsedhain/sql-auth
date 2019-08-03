const router = require("express").Router();
const authRouter = require("./../components/auth/auth.route");

module.exports = function() {
  router.use("/auth", authRouter);

  return router;
};
