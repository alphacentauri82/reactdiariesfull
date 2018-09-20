'use strict'

const test = require('ava')
const uuid = require('uuid-base62')
const r = require('rethinkdb')
const { SchoolDb } = require('../')
const fixtures = require('./fixtures')

test.beforeEach('setup database', async t => {
  const dbName = `school_diaries_${uuid.v4()}`
  const db = new SchoolDb({ db: dbName, setup: true })
  await db.connect()
  t.context.db = db
  t.context.dbName = dbName
  t.true(db.connected, 'should be connected')
})

test.afterEach.always('cleanup database', async t => {
  const db = t.context.db
  const dbName = t.context.dbName

  await db.disconnect()
  t.false(db.connected, 'should be disconnect')

  let conn = await r.connect({
    host: '127.0.0.1',
    port: 28015
  })
  await r.dbDrop(dbName).run(conn)
})

test('save school !', async t => {
  const db = t.context.db
  t.is(typeof db.saveSchool, 'function', 'saveSchool is functions')

  const school = fixtures.getSchool()
  const created = await db.saveSchool(school)

  t.is(school.name, created.name)
  t.is(school.address, created.address)
  t.is(school.number, created.number)
  t.is(typeof created.id, 'string')
  t.truthy(created.createdAt)
})

test('get school', async t => {
  const db = t.context.db
  t.is(typeof db.getSchool, 'function', 'getSchool is function')

  const school = fixtures.getSchool()
  const create = await db.saveSchool(school)
  const result = await db.getSchool(school.number)

  t.deepEqual(create, result)

  t.throws(db.getSchool('foo'), /not found/)
})

test('get all schools', async t => {
  const db = t.context.db
  t.is(typeof db.getSchools, 'function', 'getSchools is functions')

  const schools = fixtures.getSchools(10)
  const saveSchools = schools.map(item => db.saveSchool(item))
  const create = await Promise.all(saveSchools)
  const result = await db.getSchools()

  t.is(create.length, result.length)
})
