'use strict'

const test = require('ava')
const uuid = require('uuid-base62')
const r = require('rethinkdb')
const { Db } = require('../')
const utils = require('../lib/utils')
const fixtures = require('./fixtures')

test.beforeEach('setup database', async t => {
  const dbName = `school_diaries_${uuid.v4()}`
  const db = new Db({ db: dbName, setup: true })
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

test('save image', async t => {
  const db = t.context.db

  t.is(typeof db.saveImage, 'function', 'saveImage is functions')

  let image = fixtures.getImage()
  console.log('image', image)
  let created = await db.saveImage(image)
  console.log('created', created)

  t.is(created.url, image.url)
  t.is(created.userId, image.userId)
  t.is(typeof created.id, 'string')
  t.is(created.publicId, uuid.encode(created.id))
  t.truthy(created.createdAt)
})

test('get image', async t => {
  const db = t.context.db

  t.is(typeof db.getImage, 'function', 'getImage is functions')

  let image = fixtures.getImage()
  let created = await db.saveImage(image)
  let result = await db.getImage(created.publicId)

  t.deepEqual(created, result)
})

test('get all images', async t => {
  const db = t.context.db
  t.is(typeof db.getImages, 'function', 'getImages is functions')

  let images = fixtures.getImages(10)
  let saveImages = images.map(img => db.saveImage(img))
  let create = await Promise.all(saveImages)
  let result = await db.getImages()

  t.is(create.length, result.length)
})

test('save user', async t => {
  const db = t.context.db
  t.is(typeof db.saveUser, 'function', 'saveUser is functions')

  const user = fixtures.getUser_old()
  const plainPassword = user.password
  const created = await db.saveUser(user)

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

  const user = fixtures.getUser_old()
  const create = await db.saveUser(user)
  const result = await db.getUser(user.username)

  t.deepEqual(create, result)

  t.throws(db.getUser('foo'), /not found/)
})

test('authenticate user', async t => {
  const db = t.context.db
  t.is(typeof db.authenticate, 'function', 'authenticate is function')

  const user = fixtures.getUser_old()
  const plainPassword = user.password
  await db.saveUser(user)

  const success = await db.authenticate(user.username, plainPassword)
  t.true(success)

  const fails = await db.authenticate(user.username, 'badPassword')
  t.false(fails)

  const failure = await db.authenticate('foo', 'bar')
  t.false(failure)
})

test('list images by user', async t => {
  const db = t.context.db

  t.is(typeof db.getImagesByUser, 'function', 'getImagesByUser is function')

  const images = fixtures.getImages(10)
  const userId = uuid.uuid()
  const random = Math.round(Math.random() * images.length)

  const saveImages = []

  for (let i = 0; i < images.length; i++) {
    if (i < random) {
      images[i].userId = userId
    }

    saveImages.push(db.saveImage(images[i]))
  }

  await Promise.all(saveImages)

  const result = await db.getImagesByUser(userId)

  t.is(result.length, random)
})
