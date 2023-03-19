const mongoose = require("./../db");

const imageSchema = mongoose.Schema({
  photoSize: {
    type: String
  },
  orgFilename: {
    type: String,
  },
  apiFilename: {
    type: String,
  },
  copies: {
    type: String,
  },
  imageURL: {
    type: String,
  }
});

module.exports = {imageSchema}
