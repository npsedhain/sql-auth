const router = require("express").Router();
const authRouter = require("./../components/auth/auth.route");

module.exports = function(express, app) {
  app.use(express.urlencoded({ extended: true }));
  router.use("/auth", authRouter);

  return router;
};
