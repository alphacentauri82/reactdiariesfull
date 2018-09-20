'use strict'

const test = require('ava')
const uuid = require('uuid-base62')
const r = require('rethinkdb')
const { UserDb } = require('../')
const utils = require('../lib/utils')
const fixtures = require('./fixtures')

test.beforeEach('setup database', async t => {
  const dbName = `school_diaries_${uuid.v4()}`
  const db = new UserDb({ db: dbName, setup: true })
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

test('save user', async t => {
  const db = t.context.db
  t.is(typeof db.saveUser, 'function', 'saveUser is functions')

  const user = fixtures.getUser()
  const plainPassword = user.password
  const created = await db.saveUser(user)

  t.is(user.dni, created.dni)
  t.is(user.name, created.name)
  t.is(user.username, created.username)
  t.is(user.email, created.email)
  t.is(user.role, created.role)
  t.is(utils.encrypt(plainPassword), created.password)
  t.is(typeof created.id, 'string')
  t.truthy(created.createdAt)
})

test('get user', async t => {
  const db = t.context.db
  t.is(typeof db.getUser, 'function', 'getUser is function')

  const user = fixtures.getUser()
  const create = await db.saveUser(user)
  const result = await db.getUser(user.dni)

  t.deepEqual(create, result)

  t.throws(db.getUser('foo'), /not found/)
})

test('authenticate user', async t => {
  const db = t.context.db
  t.is(typeof db.authenticate, 'function', 'authenticate is function')

  const user = fixtures.getUser()
  const plainPassword = user.password
  await db.saveUser(user)

  const success = await db.authenticate(user.dni, plainPassword)
  t.true(success)

  const fails = await db.authenticate(user.dni, 'badPassword')
  t.false(fails)

  const failure = await db.authenticate('foo', 'bar')
  t.false(failure)
})
