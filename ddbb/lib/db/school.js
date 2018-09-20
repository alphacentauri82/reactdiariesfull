'use strict'

const co = require('co')
const r = require('rethinkdb')
const Promise = require('bluebird')

const defaults = {
  host: '127.0.0.1',
  port: 28015,
  db: 'school_diaries'
}

class SchoolDb {
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
      if (dbTables.indexOf('schools') === -1) {
        yield r.db(db).tableCreate('schools').run(conn)
        yield r.db(db).table('schools').indexCreate('number').run(conn)
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

  saveSchool (school, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db

    const tasks = co.wrap(function * () {
      const conn = yield connection

      yield r.db(db).table('schools').indexWait().run(conn)

      const schools = yield r.db(db).table('schools').getAll(school.number, {
        index: 'number'
      }).run(conn)

      try {
        yield schools.next()
        return Promise.reject(new Error(`school ${school.name} - ${school.number} exist`))
      } catch (e) {
        console.log(`school ${school.name} - ${school.number} doesn't exist`)
      }

      school.createdAt = new Date()

      const result = yield r.db(db).table('schools').insert(school).run(conn)
      if (result.errors > 0) {
        return Promise.reject(new Error(result.first_error))
      }

      school.id = result.generated_keys[0]

      const created = yield r.db(db).table('schools').get(school.id).run(conn)

      return Promise.resolve(created)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }

  getSchool (number, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db

    const tasks = co.wrap(function * () {
      const conn = yield connection

      yield r.db(db).table('schools').indexWait().run(conn)

      const school = yield r.db(db).table('schools').getAll(number, {
        index: 'number'
      }).run(conn)

      let result = null

      try {
        result = yield school.next()
      } catch (e) {
        return Promise.reject(new Error(`school ${number} not found`))
      }

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }

  getSchools (callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db

    const tasks = co.wrap(function * () {
      const conn = yield connection

      const schools = yield r.db(db).table('schools').run(conn)

      const result = yield schools.toArray()

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
}

module.exports = SchoolDb
