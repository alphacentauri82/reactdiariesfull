'use strict'

import { send, json } from 'micro'
import HttpHash from 'http-hash'
import { UserDb } from 'school-diaries-db'
import config from './config'
import utils from './lib/utils'
import DbStud from './test/stub/db'

const env = process.env.NODE_ENV || 'production'

let db = new UserDb(config.db)

if (env === 'test') {
  db = new DbStud()
}

const hash = HttpHash()

hash.set('POST /', async function authenticate (req, res, params) {
  const credentials = await json(req)
  await db.connect()

  const auth = await db.authenticate(credentials.dni, credentials.password)
  if (!auth) {
    return send(res, 402, { error: 'invalid credentials' })
  }

  const token = await utils.signToken({
    dni: credentials.dni
  }, config.secret)

  send(res, 200, token)
})

export default async function main (req, res) {
  const { method, url } = req
  const match = hash.get(`${method.toUpperCase()} ${url}`)

  if (match.handler) {
    try {
      await match.handler(req, res, match.params)
    } catch (e) {
      send(res, 500, { error: e.message })
    }
  } else {
    send(res, 404, { error: 'route not found' })
  }
}
