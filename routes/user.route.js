const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller")
const allowedTo = require("../middleware/allowedTo")
const userRoles = require("../utils/userRoles")
const verifyToken = require("../middleware/verifyToken")


router.route("/register")
    .post(verifyToken,allowedTo(userRoles.ADMIN),userController.register)

router.route("/login")
    .post(userController.login)

router.route("/:id")
      .delete(verifyToken, allowedTo(userRoles.ADMIN),userController.deleteUser)
      .put(verifyToken,allowedTo(userRoles.ADMIN),userController.updateUser)

router.route("/")
      .get(verifyToken,allowedTo(userRoles.ADMIN),userController.getAllUser)

router.route("/parent/:id")
      .put(verifyToken,allowedTo(userRoles.ADMIN),userController.addChildEmail)

router.route("/Account")
      .get(verifyToken,userController.viewAccount)


/* router.route("/logout")
    .post(userController.logout) */

module.exports = router;