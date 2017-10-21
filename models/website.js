const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  screenshotUrl: { type: String, required: true }
});

module.exports = mongoose.model('Website', websiteSchema);
