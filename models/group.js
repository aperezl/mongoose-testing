var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var groupSchema = new Schema({
  title:    { type: String},
  description: { type: String },
  _owner:   { type: Schema.Types.ObjectId },
  _members: [ { type: Schema.Types.ObjectId }] 
});

module.exports = mongoose.model('Group', groupSchema);