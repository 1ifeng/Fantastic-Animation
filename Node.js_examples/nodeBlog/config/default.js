module.exports = {
  port: 8888,
  session:{
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
};
