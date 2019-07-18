var mongoose = require('mongoose');

var stickerSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  name: {type:String , required: true},
  stickerURL: {type:String , required: true},
  thumbnailURL: {type:String , required: true},
  stickerContent: [{type:String , required: true}],
  click: { type: Number, default: 0 },
  install: { type: Number, default: 0 }
});

module.exports = mongoose.model('Stickers', stickerSchema);