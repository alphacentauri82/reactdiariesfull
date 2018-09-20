'use strict'

const co = require('co')
const r = require('rethinkdb')
const Promise = require('bluebird')
const utils = require('../utils')

const defaults = {
  host: '127.0.0.1',
  port: 28015,
  db: 'school_diaries'
}

class UserDb {
  constructor (option) {
    option = option || {}
    this.host = option.host || defaults.host
    this.port = option.port || defaults.port
    this.db = option.db || defaults.db
    this.setup = option.setup || true
  }

  connect (callback) {
    this.connection = r.connect({
      host: this.host,
      port: this.port,
      db: this.db
    })

    this.connected = true

    const db = this.db
    const connection = this.connection

    if (!this.setup) {
      return Promise.resolve(connection).asCallback(callback)
    }

    const setup = co.wrap(function * () {
      const conn = yield connection

      const dbList = yield r.dbList().run(conn)
      if (dbList.indexOf(db) === -1) {
        yield r.dbCreate(db).run(conn)
      }

      const dbTables = yield r.db(db).tableList().run(conn)
      if (dbTables.indexOf('users') === -1) {
        yield r.db(db).tableCreate('users').run(conn)
        yield r.db(db).table('users').indexCreate('dni').run(conn)
      }

      return conn
    })

    return Promise.resolve(setup()).asCallback(callback)
  }

  disconnect (callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    this.connected = false

    return Promise.resolve(this.connection)
      .then(conn => conn.close())
  }

  saveUser (user, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db

    const tasks = co.wrap(function * () {
      const conn = yield connection

      yield r.db(db).table('users').indexWait().run(conn)

      const users = yield r.db(db).table('users').getAll(user.dni, {
        index: 'dni'
      }).run(conn)

      try {
        yield users.next()
        return Promise.reject(new Error(`user ${user.username} - ${user.dni} exist`))
      } catch (e) {
        console.log(`user ${user.username} - ${user.dni} doesn't exist`)
      }

      user.password = utils.encrypt(user.password)
      user.createdAt = new Date()

      const result = yield r.db(db).table('users').insert(user).run(conn)
      if (result.errors > 0) {
        return Promise.reject(new Error(result.first_error))
      }

      user.id = result.generated_keys[0]

      const created = yield r.db(db).table('users').get(user.id).run(conn)

      return Promise.resolve(created)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }

  getUser (dni, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db

    const tasks = co.wrap(function * () {
      const conn = yield connection

      yield r.db(db).table('users').indexWait().run(conn)

      const users = yield r.db(db).table('users').getAll(dni, {
        index: 'dni'
      }).run(conn)

      let result = null

      try {
        result = yield users.next()
      } catch (e) {
        return Promise.reject(new Error(`user ${dni} not found`))
      }

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }

  authenticate (dni, password, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const getUser = this.getUser.bind(this)

    const tasks = co.wrap(function * () {
      let user = null
      try {
        user = yield getUser(dni)
      } catch (e) {
        return Promise.resolve(false)
      }

      if (user.password === utils.encrypt(password)) {
        return Promise.resolve(true)
      }

      return Promise.resolve(false)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
}

module.exports = UserDb
