'use strict'

const co = require('co')
const r = require('rethinkdb')
const uuid = require('uuid-base62')
const Promise = require('bluebird')
const utils = require('./utils')

const defaults = {
  host: '127.0.0.1',
  port: 28015,
  db: 'school_diaries'
}

class Db {
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
        yield r.db(db).table('users').indexCreate('username').run(conn)
      }

      if (dbTables.indexOf('images') === -1) {
        yield r.db(db).tableCreate('images').run(conn)
        yield r.db(db).table('images').indexCreate('createdAt').run(conn)
        yield r.db(db).table('images').indexCreate('userId', { multi: true }).run(conn)
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

  saveImage (image, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    let connection = this.connection
    let db = this.db

    let tasks = co.wrap(function * () {
      let conn = yield connection
      image.createdAt = new Date()

      let result = yield r.db(db).table('images').insert(image).run(conn)

      if (result.errors > 0) {
        return Promise.reject(new Error(result.first_error))
      }

      image.id = result.generated_keys[0]

      yield r.db(db).table('images').get(image.id).update({
        publicId: uuid.encode(image.id)
      }).run(conn)

      let created = yield r.db(db).table('images').get(image.id).run(conn)

      return Promise.resolve(created)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }

  getImage (id, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db
    const imageId = uuid.decode(id)

    const tasks = co.wrap(function * () {
      const conn = yield connection
      const image = yield r.db(db).table('images').get(imageId).run(conn)

      if (!image) {
        return Promise.reject(new Error(`image ${imageId} not found`))
      }

      return Promise.resolve(image)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }

  getImages (callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    let connection = this.connection
    let db = this.db

    let tasks = co.wrap(function * () {
      let conn = yield connection

      let images = yield r.db(db).table('images').orderBy({
        index: r.desc('createdAt')
      }).run(conn)

      let result = yield images.toArray()

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
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

      const users = yield r.db(db).table('users').getAll(user.username, {
        index: 'username'
      }).run(conn)

      try {
        yield users.next()
        return Promise.reject(new Error(`user ${user.username} exist`))
      } catch (e) {
        console.log(`user ${user.username} doesn't exist`)
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

  getUser (username, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db

    const tasks = co.wrap(function * () {
      const conn = yield connection

      yield r.db(db).table('users').indexWait().run(conn)

      const users = yield r.db(db).table('users').getAll(username, {
        index: 'username'
      }).run(conn)

      let result = null

      try {
        result = yield users.next()
      } catch (e) {
        return Promise.reject(new Error(`user ${username} not found`))
      }

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }

  authenticate (username, password, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const getUser = this.getUser.bind(this)

    const tasks = co.wrap(function * () {
      let user = null
      try {
        user = yield getUser(username)
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

  getImagesByUser (userId, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db

    const tasks = co.wrap(function * () {
      const conn = yield connection

      yield r.db(db).table('images').indexWait().run(conn)

      const images = yield r.db(db).table('images').getAll(userId, {
        index: 'userId'
      }).orderBy(r.desc('createdAt')).run(conn)

      const result = yield images.toArray()

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
}

module.exports = Db
