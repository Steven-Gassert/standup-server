

module.exports = function getDbConnectionString(env) {
  if (env === 'prod'){
    return `mongodb://${process.env.DB_USERNAME_PROD}:${process.env.DB_PASS_PROD}@ds157742.mlab.com:57742/standup_helper`;
  } else {
    return `mongodb://${process.env.DB_USERNAME_DEV}:${process.env.DB_PASS_DEV}@ds157742.mlab.com:57742/standup_helper_dev`;
  }
}();