const { Schema } = require('mongoose');

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

PostSchema.virtual('url').get(function () {
  return `posts/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);
