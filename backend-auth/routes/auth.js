const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/helpers')
const userQueries = require('../db/queries/users')
const passport = require('../auth/passport')


// setup route to add a new user to the database
// add a new query to db/queries/users.js = "addNewUser"
router.post("/signup", async (req, res, next) => {
    try {
      let passwordDigest = await authHelpers.hashPassword(req.body.password)
      let userInfo = {
        username: req.body.username,
        password: passwordDigest
      }
      let newUser = await userQueries.addNewUser(userInfo) // You can also just use req.body here
      res.json({
        payload: newUser,
        msg: "New user added",
        err: false
      })
    } catch (error) {
      console.log(error)
      res
      .status(500)
      .json({
        payload: null,
        msg: "Failed adding new user!",
        err: true
      })
    }
  })

router.post("/login", passport.authenticate('local'), (req, res, next) => {
    console.log(req.body)
    res.json({
        payload: req.user,
        msg: "user successfully logged in",
        err: false
    })
})

router.get("/logout", (req, res, next) => {
    req.logOut()
    res.json({
        payload: null,
        msg: "User logged out successfully",
        err: false
    })
})

router.get("/isUserLoggedIn", authHelpers.loginRequired, (req, res) => {
    res.json({
        payload: req.user,
        msg: "User is logged in, Session Active!",
        err: false
    })
})

module.exports = router;