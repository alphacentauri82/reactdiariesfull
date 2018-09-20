'use strict'

const co = require('co')
const r = require('rethinkdb')
const Promise = require('bluebird')

const defaults = {
  host: '127.0.0.1',
  port: 28015,
  db: 'school_diaries'
}

class ProfesorDb {
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
      if (dbTables.indexOf('professors') === -1) {
        yield r.db(db).tableCreate('professors').run(conn)
        yield r.db(db).table('professors').indexCreate('user_id').run(conn)
        yield r.db(db).table('professors').indexCreate('dni').run(conn)
        // yield r.db(db).table('professors').indexCreate('schools', { multi: true }).run(conn)
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

  saveProfessor (professor, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db

    const tasks = co.wrap(function * () {
      const conn = yield connection

      yield r.db(db).table('professors').indexWait().run(conn)

      const professors = yield r.db(db).table('professors').getAll(professor.dni, {
        index: 'dni'
      }).run(conn)

      try {
        yield professors.next()
        return Promise.reject(new Error(`professor ${professor.dni} exist`))
      } catch (e) {
        console.log(`professor ${professor.dni} doesn't exist`)
      }

      professor.createdAt = new Date()

      const result = yield r.db(db).table('professors').insert(professor).run(conn)
      if (result.errors > 0) {
        return Promise.reject(new Error(result.first_error))
      }

      professor.id = result.generated_keys[0]

      const created = yield r.db(db).table('professors').get(professor.id).run(conn)

      return Promise.resolve(created)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }

  getProfessor (dni, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db

    const tasks = co.wrap(function * () {
      const conn = yield connection

      yield r.db(db).table('professors').indexWait().run(conn)

      const professor = yield r.db(db).table('professors').getAll(dni, {
        index: 'dni'
      }).run(conn)

      let result = null

      try {
        result = yield professor.next()
      } catch (e) {
        return Promise.reject(new Error(`professors ${dni} not found`))
      }

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }

  getProfessors (callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).asCallback(callback)
    }

    const connection = this.connection
    const db = this.db

    const tasks = co.wrap(function * () {
      const conn = yield connection

      const professors = yield r.db(db).table('professors').run(conn)

      const result = yield professors.toArray()

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
}

module.exports = ProfesorDb
