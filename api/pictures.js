'use strict'

import { send, json } from 'micro'
import HttpHash from 'http-hash'
import Db from 'school-diaries-db'
import config from './config'
import utils from './lib/utils'
import DbStud from './test/stub/db'

const env = process.env.NODE_ENV || 'production'

let db = new Db(config.db)

if (env === 'test') {
  db = new DbStud()
}

const hash = HttpHash()

hash.set('GET /:id', async function getPicture (req, res, params) {
  const id = params.id
  await db.connect()
  const image = await db.getImage(id)
  await db.disconnect()
  send(res, 200, image)
})

hash.set('POST /', async function postPicture (req, res, params) {
  const image = await json(req)

  try {
    const token = await utils.extractToken(req)
    const encoded = await utils.verifyToken(token, config.secret)
    if (encoded && encoded.userId !== image.userId) {
      throw new Error('invalid token')
    }
  } catch (e) {
    return send(res, 401, { error: 'invalid token' })
  }

  await db.connect()
  const created = await db.saveImage(image)
  await db.disconnect()
  send(res, 201, created)
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
