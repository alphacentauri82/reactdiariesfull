'use strict'

import test from 'ava'
import micro from 'micro'
import listen from 'test-listen'
import request from 'request-promise'
import fixtures from './fixtures'
import auth from '../auth'
import config from '../config'
import utils from '../lib/utils'

test.beforeEach(async t => {
  const srv = micro(auth)
  t.context.url = await listen(srv)
})

test('success POST /', async t => {
  const user = fixtures.getUser()
  const url = t.context.url

  const options = {
    method: 'POST',
    uri: url,
    json: true,
    body: {
      dni: user.dni,
      password: user.password
    }
  }

  const token = await request(options)
  const decoded = await utils.verifyToken(token, config.secret)

  t.is(user.dni, decoded.dni)
})
