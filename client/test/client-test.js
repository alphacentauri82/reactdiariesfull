'use strict'

const test = require('ava')
const nock = require('nock')
const schollDiaries = require('../')
const fixtures = require('./fixtures')

const options = {
  endpoints: {
    users: 'http://sarlanga.test/user',
    auth: 'http://sarlanga.test/auth'
  }
}

test.beforeEach(t => {
  t.context.client = schollDiaries.createClient(options)
})

test('client', t => {
  const client = t.context.client

  t.is(typeof client.saveUser, 'function')
  t.is(typeof client.getUser, 'function')
  t.is(typeof client.auth, 'function')
})

test('saveUser', async t => {
  const client = t.context.client

  const user = fixtures.getUser()
  const newUser = {
    dni: client.dni,
    name: client.name,
    username: client.username,
    email: 'damian.test@test.com',
    password: '1234',
    role: 'student'
  }

  nock(options.endpoints.users)
    .post('/', newUser)
    .reply(201, user)

  const result = await client.saveUser(newUser)

  t.deepEqual(result, user)
})

test('getUser', async t => {
  const client = t.context.client

  const user = fixtures.getUser()

  nock(options.endpoints.users)
    .get(`/${user.dni}`)
    .reply(200, user)

  const result = await client.getUser(user.dni)

  t.deepEqual(result, user)
})

test('auth', async t => {
  const client = t.context.client

  const credentials = {
    dni: '12345678',
    password: 'test123'
  }

  const token = 'xxx-xxx-xxx'

  nock(options.endpoints.auth)
    .post('/', credentials)
    .reply(200, token)

  const result = await client.auth(credentials.dni, credentials.password)

  t.deepEqual(result, token)
})
