'use strict'

const crypto = require('crypto')

const utils = {
  encrypt
}

function encrypt (password) {
  const shasum = crypto.createHash('sha256')
  shasum.update(password)
  return shasum.digest('hex')
}

module.exports = utils
