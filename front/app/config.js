require('babel-polyfill');

const config = {
  client: {
    endpoints: {
      picture: 'http://api.school-diaries.com/picture',
      users: 'http://api.school-diaries.com/user',
      auth: 'http://api.school-diaries.com/auth'
    }
  },
  secret: process.env.SCHOOL_DIARIES_SECRET || 'school_diaries'
};

if (process.env.NODE_ENV !== 'producction') {
  config.client.endpoints = {
    picture: 'http://localhost:5000',
    users: 'http://localhost:5001',
    auth: 'http://localhost:5002'
  };
}

module.exports = config;
