module.exports = {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost/can-i-launch',
  sessionSecret: process.env.SESSION_SECRET || 'YghT5s617/1{%sDt',
  env: process.env.NODE_ENV || 'development'
};
