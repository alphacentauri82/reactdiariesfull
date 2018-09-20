'use strict'

const test = require('ava')
const uuid = require('uuid-base62')
const r = require('rethinkdb')
const { TutorDb } = require('../')
const fixtures = require('./fixtures')

test.beforeEach('setup database', async t => {
  const dbName = `school_diaries_tutor_${uuid.v4()}`
  const db = new TutorDb({ db: dbName, setup: true })
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

test('save tutor', async t => {
  const db = t.context.db
  t.is(typeof db.saveTutor, 'function', 'saveTutor is functions')

  const tutor = fixtures.getTutor()
  const created = await db.saveTutor(tutor)

  t.is(tutor.name, created.name)
  t.is(tutor.dni, created.dni)
  t.is(tutor.user_id, created.user_id)
  t.is(tutor.students.length, created.students.length)
  t.is(tutor.address, created.address)
  t.is(tutor.role_tutor, created.role_tutor)
  t.is(typeof created.id, 'string')
  t.truthy(created.createdAt)
})

test('get tutor', async t => {
  const db = t.context.db
  t.is(typeof db.getTutor, 'function', 'getTutor is function')

  const tutor = fixtures.getTutor()
  const create = await db.saveTutor(tutor)
  const result = await db.getTutor(tutor.dni)

  t.deepEqual(create, result)

  t.throws(db.getTutor('foo'), /not found/)
})

test('get all tutors', async t => {
  const db = t.context.db
  t.is(typeof db.getTutors, 'function', 'getTutors is functions')

  const tutors = fixtures.getTutors(10)
  const saveTutors = tutors.map(item => db.saveTutor(item))
  const create = await Promise.all(saveTutors)
  const result = await db.getTutors()

  t.is(create.length, result.length)
})
