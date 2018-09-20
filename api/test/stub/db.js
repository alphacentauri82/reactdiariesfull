'use strict'

import fixtures from '../fixtures'

export default class Db {
  connect () {
    return Promise.resolve(true)
  }

  disconnect () {
    return Promise.resolve(true)
  }

  getImage () {
    return Promise.resolve(fixtures.getImage())
  }

  saveImage () {
    return Promise.resolve(fixtures.getImage())
  }

  saveUser (user) {
    return Promise.resolve(fixtures.getUser())
  }

  getUser (username) {
    return Promise.resolve(fixtures.getUser())
  }

  authenticate () {
    return Promise.resolve(true)
  }
}
