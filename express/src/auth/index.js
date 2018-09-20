const passportLocal = require('passport-local')
const schoolDiaries = require('school-diaries-client')
const config = require('../../config')

const client = schoolDiaries.createClient(config.client)

const LocalStrategy = passportLocal.Strategy

exports.localStrategy = new LocalStrategy({
  usernameField: 'dni',
  passwordField: 'password'
}, (dni, password, done) => {
  client.auth(dni, password, (err, token) => {
    if (err) {
      return done(null, false, { message: 'DNI and password not found' })
    }

    client.getUser(dni, (err, user) => {
      if (err) {
        return done(null, false, { message: `an error ocurred: ${err.message}` })
      }

      user.token = token
      return done(null, user)
    })
  })
})

exports.serializeUser = function (user, done) {
  done(null, {
    dni: user.dni,
    token: user.token
  })
}

exports.deserializeUser = function (user, done) {
  client.getUser(user.dni, (err, usr) => {
    usr.token = user.token
    done(err, usr)
  })
}
