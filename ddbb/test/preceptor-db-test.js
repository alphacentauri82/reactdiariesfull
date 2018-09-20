'use strict'

const test = require('ava')
const uuid = require('uuid-base62')
const r = require('rethinkdb')
const { PreceptorDb } = require('../')
const fixtures = require('./fixtures')

test.beforeEach('setup database', async t => {
  const dbName = `school_diaries_preceptor${uuid.v4()}`
  const db = new PreceptorDb({ db: dbName, setup: true })
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

test('save preceptor', async t => {
  const db = t.context.db
  t.is(typeof db.savePreceptor, 'function', 'savePreceptor is functions')

  const preceptor = fixtures.getPreceptor()
  const created = await db.savePreceptor(preceptor)

  t.is(preceptor.name, created.name)
  t.is(preceptor.dni, created.dni)
  t.is(preceptor.user_id, created.user_id)
  t.is(preceptor.schools.length, created.schools.length)
  t.is(preceptor.divisions.length, created.divisions.length)
  t.is(preceptor.address, created.address)
  t.is(typeof created.id, 'string')
  t.truthy(created.createdAt)
})

test('get preceptor', async t => {
  const db = t.context.db
  t.is(typeof db.getPreceptor, 'function', 'getPreceptor is function')

  const preceptor = fixtures.getPreceptor()
  const create = await db.savePreceptor(preceptor)
  const result = await db.getPreceptor(preceptor.dni)

  t.deepEqual(create, result)

  t.throws(db.getPreceptor('foo'), /not found/)
})

test('get all preceptors', async t => {
  const db = t.context.db
  t.is(typeof db.getPreceptors, 'function', 'getPreceptors is functions')

  const preceptors = fixtures.getPreceptors(10)
  const savePreceptors = preceptors.map(item => db.savePreceptor(item))
  const create = await Promise.all(savePreceptors)
  const result = await db.getPreceptors()

  t.is(create.length, result.length)
})
