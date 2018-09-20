const express = require('express')
const passport = require('passport')

const router = express.Router()

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(401).send(err)
    if (!user) return res.status(401).send(info)
    if (info) return res.status(401).send(info)
    return res.status(200).send(user)
  })(req, res, next)
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
})

module.exports = router
