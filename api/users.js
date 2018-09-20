'use strict'

import { send, json } from 'micro'
import HttpHash from 'http-hash'
import { UserDb } from 'school-diaries-db'
import config from './config'
import DbStud from './test/stub/db'

const env = process.env.NODE_ENV || 'production'

let db = new UserDb(config.db)

if (env === 'test') {
  db = new DbStud()
}

const hash = HttpHash()

hash.set('POST /', async function saveUser (req, res, params) {
  const user = await json(req)
  await db.connect()

  const created = await db.saveUser(user)
  await db.disconnect()

  delete created.email
  delete created.password

  send(res, 201, created)
})

hash.set('GET /:dni', async function getUser (req, res, params) {
  const dni = params.dni
  await db.connect()
  const user = await db.getUser(dni)
  await db.disconnect()

  delete user.email
  delete user.password

  send(res, 201, user)
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
