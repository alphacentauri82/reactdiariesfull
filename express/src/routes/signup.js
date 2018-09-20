const express = require('express')
const schoolDiaries = require('school-diaries-client')
const config = require('../../config')

const router = express.Router()
const client = schoolDiaries.createClient(config.client)

router.post('/', (req, res) => {
  const user = req.body
  client.saveUser(user, (err, usr) => {
    if (err) return res.status(500).send(err.error)
    return res.status(200).send(usr)
  })
})

module.exports = router
