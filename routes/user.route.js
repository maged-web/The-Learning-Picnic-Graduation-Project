const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller")


router.route("/register")
    .post(userController.register)

router.route("/login")
    .post(userController.login)

router.route("/:id")
      .get(userController.viewAccount)

/* router.route("/logout")
    .post(userController.logout) */

module.exports = router;