
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const standupConfigSchema = new Schema({
  userId: String,
  use_enterprise: Boolean,
  enterprise_url: String,
  enterprise_un: String,
  enterprise_token: String,
  use_public: String,
  public_un: String,
  public_token: String,
  hours: Number,
  issues: Boolean,
  pull_requests: Boolean,
  commits: Boolean
});

const standupConfig = mongoose.model('standupConfig',standupConfigSchema);

module.exports = standupConfig;
