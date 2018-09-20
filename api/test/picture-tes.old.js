// 'use strict'
//
// import test from 'ava'
// import micro from 'micro'
// import listen from 'test-listen'
// import request from 'request-promise'
// import fixtures from './fixtures'
// import pictures from '../pictures'
// import utils from '../lib/utils'
// import config from '../config'
//
// test.beforeEach(async t => {
//   const srv = micro(pictures)
//   t.context.url = await listen(srv)
// })
//
// test('GET /:id', async t => {
//   const image = fixtures.getImage()
//   const url = t.context.url
//
//   const body = await request({ uri: `${url}/${image.publicId}`, json: true })
//   t.deepEqual(body, image)
// })
//
// test('no token POST /', async t => {
//   const image = fixtures.getImage()
//   const url = t.context.url
//
//   const options = {
//     method: 'POST',
//     uri: url,
//     json: true,
//     body: {
//       src: image.src,
//       userId: image.userId
//     },
//     resolveWithFullResponse: true
//   }
//
//   t.throws(request(options), /invalid token/)
// })
//
// test('secure POST /', async t => {
//   const image = fixtures.getImage()
//   const url = t.context.url
//   const token = await utils.signToken({ userId: image.userId }, config.secret)
//
//   const options = {
//     method: 'POST',
//     uri: url,
//     json: true,
//     body: {
//       src: image.src,
//       userId: image.userId
//     },
//     headers: {
//       'Authorization': `Bearer ${token}`
//     },
//     resolveWithFullResponse: true
//   }
//
//   const response = await request(options)
//
//   t.is(response.statusCode, 201)
//   t.deepEqual(response.body, image)
// })
//
// test('invalid token POST /', async t => {
//   const image = fixtures.getImage()
//   const url = t.context.url
//   const token = await utils.signToken({ userId: 'hacky' }, config.secret)
//
//   const options = {
//     method: 'POST',
//     uri: url,
//     json: true,
//     body: {
//       src: image.src,
//       userId: image.userId
//     },
//     headers: {
//       'Authorization': `Bearer ${token}`
//     },
//     resolveWithFullResponse: true
//   }
//
//   t.throws(request(options), /invalid token/)
// })
