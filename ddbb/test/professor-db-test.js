'use strict'

const test = require('ava')
const uuid = require('uuid-base62')
const r = require('rethinkdb')
const { ProfessorDb } = require('../')
const fixtures = require('./fixtures')

test.beforeEach('setup database', async t => {
  const dbName = `school_diaries_professor${uuid.v4()}`
  const db = new ProfessorDb({ db: dbName, setup: true })
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

test('save professor', async t => {
  const db = t.context.db
  t.is(typeof db.saveProfessor, 'function', 'saveProfessor is functions')

  const professor = fixtures.getProfessor()
  const created = await db.saveProfessor(professor)

  t.is(professor.name, created.name)
  t.is(professor.dni, created.dni)
  t.is(professor.user_id, created.user_id)
  t.is(professor.schools.length, created.schools.length)
  t.is(professor.assignments.length, created.assignments.length)
  t.is(professor.registration_number, created.registration_number)
  t.is(typeof created.id, 'string')
  t.truthy(created.createdAt)
})

test('get professor', async t => {
  const db = t.context.db
  t.is(typeof db.getProfessor, 'function', 'getProfessor is function')

  const professor = fixtures.getProfessor()
  const create = await db.saveProfessor(professor)
  const result = await db.getProfessor(professor.dni)

  t.deepEqual(create, result)

  t.throws(db.getProfessor('foo'), /not found/)
})

test('get all professors', async t => {
  const db = t.context.db
  t.is(typeof db.getProfessors, 'function', 'getProfessors is functions')

  const professors = fixtures.getProfessors(10)
  const saveProfessors = professors.map(item => db.saveProfessor(item))
  const create = await Promise.all(saveProfessors)
  const result = await db.getProfessors()

  t.is(create.length, result.length)
})
