'use strict'

const request = require('request-promise')
const Promise = require('bluebird')

class Client {
  constructor (options) {
    this.options = options || {
      endpoints: {
        users: 'http://api.school-diaries.com/user',
        auth: 'http://api.school-diaries.com/auth'
      }
    }
  }

  saveUser (user, callback) {
    const opts = {
      method: 'POST',
      uri: `${this.options.endpoints.users}/`,
      body: user,
      json: true
    }
    return Promise.resolve(request(opts)).asCallback(callback)
  }

  getUser (dni, callback) {
    const opts = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${dni}`,
      json: true
    }
    return Promise.resolve(request(opts)).asCallback(callback)
  }

  auth (dni, password, callback) {
    const opts = {
      method: 'POST',
      uri: `${this.options.endpoints.auth}/`,
      body: {
        dni,
        password
      },
      json: true
    }
    return Promise.resolve(request(opts)).asCallback(callback)
  }
}

module.exports = Client
