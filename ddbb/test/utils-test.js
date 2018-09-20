'use strict'

const test = require('ava')
const utils = require('../lib/utils')

test('encrypt password', t => {
  const password = 'pass123'
  const encrypted = '9b8769a4a742959a2d0298c36fb70623f2dfacda8436237df08d8dfd5b37374c'

  const result = utils.encrypt(password)

  t.is(result, encrypted)
})
