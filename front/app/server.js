/* eslint no-console: 0 */
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack/webpack.dev.config.js');
import { readFileSync } from 'jsonfile';
import expressReactViews from 'express-react-views';
import compression from 'compression';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSesion from 'express-session';
import passport from 'passport';
import schoolDiaries from 'school-diaries-client';
import auth from 'auth';

import config from 'config';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const client = schoolDiaries.createClient(config.client);
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(expressSesion({
  secret: config.secret,
  resave: false,
  saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(auth.localStrategy);
passport.deserializeUser(auth.deserializeUser);
passport.serializeUser(auth.serializeUser);

app.post('/signup', (req, res) => {
  const user = req.body;
  client.saveUser(user, (err, usr) => {
    if (err) return res.status(500).send(err.message);
    return res.status(200).send(usr);
  });
});

app.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(401).send(err);
    if (!user) return res.status(401).send(info);
    if (info) return res.status(401).send(info);
    return res.status(200).send(user);
  })(req, res, next);
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
});

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).send({ error: 'no authenticated' });
}

// Express React View configuration
const jsxEngine = expressReactViews.createEngine({
  transformViews: false
});
app.set('views', path.join(__dirname, 'server_templates/'));
app.set('view engine', 'jsx');
app.engine('jsx', jsxEngine);

// Disable the HTTP response header x-powered-by that returns Express
app.disable('x-powered-by');

// Assets list that will be rendered in html file
const assets = {
  scripts: [],
  styleLinks: []
};

if (isDeveloping) {
  // On dev mode only is required main.js
  assets.scripts.push('/vendors.js');
  assets.scripts.push('/main.js');

  // Middleware configuration
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    quiet: false,
    noInfo: false,
    hot: true,
    inline: true,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 2000
    },
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);

  app.use(webpackHotMiddleware(compiler));
} else {
  // Production

  // In production enviroment assets are defined in a manifest.
  const assetsManifestPath = path.resolve(__dirname, '../webpack/config/webpack-prod-assets-manifest.json');
  const assetsManifest = readFileSync(assetsManifestPath);

  // Load assets to be rendered
  assets.scripts.push(assetsManifest.vendor.js);
  assets.scripts.push(assetsManifest.app.js);
  assets.styleLinks.push(assetsManifest.app.css);

  app.use(compression());

  // Add to express static content
  app.use(express.static(path.resolve(__dirname, '../webpack/dist')));
}

// Log configured assets
console.log('ASSETS: ', assets);

app.get('/*', function response(req, res) {
  res.render('index_tpl', { title: 'Chat Room', router: 'index', assets: assets });
});

app.use(function (req, res) {
  res.sendStatus(404);
});

// Socket configuration
io.on('connection', (socket) => {
  console.log(`Connected ${socket.id} on instance ${port}`);

  socket.on('join', (room) => {
    socket.room = room;
    socket.join(room);
  });

  socket.on('message', (msg) => {
    socket.broadcast.to(socket.room).emit('message', msg);
  });
});

server.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
