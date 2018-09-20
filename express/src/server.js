const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSesion = require('express-session')
const passport = require('passport')

const auth = require('./auth')
const signin = require('./routes/signin')
const signup = require('./routes/signup')
const test = require('./routes/test')
const config = require('../config')

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 5050 : process.env.PORT

const app = express()
const server = http.createServer(app)
app.set(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(expressSesion({
  secret: config.secret,
  resave: false,
  saveUnitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(auth.localStrategy)
passport.deserializeUser(auth.deserializeUser)
passport.serializeUser(auth.serializeUser)

app.use('/api/test', test)
app.use('/signin', signin)
app.use('/signup', signup)

server.listen(port, '0.0.0.0', function onStart (err) {
  if (err) {
    console.log(err)
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
})
