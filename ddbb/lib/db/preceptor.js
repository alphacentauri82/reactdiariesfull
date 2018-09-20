'use strict'

const co = require('co')
const r = require('rethinkdb')
const Promise = require('bluebird')

const defaults = {
  host: '127.0.0.1',
  port: 28015,
  db: 'school_diaries'
}

class PreceptorDb {
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
      if (dbTables.indexOf('preceptors') === -1) {
        yield r.db(db).tableCreate('preceptors').run(conn)
        yield r.db(db).table('preceptors').indexCreate('user_id').run(conn)
        yield r.db(db).table('preceptors').indexCreate('dni').run(conn)
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

  savePreceptor (preceptor, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db

    const tasks = co.wrap(function * () {
      const conn = yield connection

      yield r.db(db).table('preceptors').indexWait().run(conn)

      const preceptors = yield r.db(db).table('preceptors').getAll(preceptor.dni, {
        index: 'dni'
      }).run(conn)

      try {
        yield preceptors.next()
        return Promise.reject(new Error(`preceptor ${preceptor.dni} exist`))
      } catch (e) {
        console.log(`preceptor ${preceptor.dni} doesn't exist`)
      }

      preceptor.createdAt = new Date()

      const result = yield r.db(db).table('preceptors').insert(preceptor).run(conn)
      if (result.errors > 0) {
        return Promise.reject(new Error(result.first_error))
      }

      preceptor.id = result.generated_keys[0]

      const created = yield r.db(db).table('preceptors').get(preceptor.id).run(conn)

      return Promise.resolve(created)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }

  getPreceptor (dni, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db

    const tasks = co.wrap(function * () {
      const conn = yield connection

      yield r.db(db).table('preceptors').indexWait().run(conn)

      const preceptor = yield r.db(db).table('preceptors').getAll(dni, {
        index: 'dni'
      }).run(conn)

      let result = null

      try {
        result = yield preceptor.next()
      } catch (e) {
        return Promise.reject(new Error(`preceptors ${dni} not found`))
      }

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }

  getPreceptors (callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db

    const tasks = co.wrap(function * () {
      const conn = yield connection

      const preceptors = yield r.db(db).table('preceptors').run(conn)

      const result = yield preceptors.toArray()

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
}

module.exports = PreceptorDb
