'use strict'
const uuid = require('uuid-base62')

function randomDNI () {
  return Math.floor(Math.random() * 100000000)
}

const fixtures = {
  getUser () {
    return {
      id: uuid.uuid(),
      dni: `${randomDNI()}`,
      username: `user_${uuid.v4()}`,
      name: 'a randon name',
      createdAt: new Date().toString()
    }
  }
}

module.exports = fixtures
