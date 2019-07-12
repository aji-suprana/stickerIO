var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  name: {type:String , required: true},
  reportMessage: {type:String , required: true},
  reportedSticker: {type:mongoose.Schema.Types.ObjectId , required: true},
});

module.exports = mongoose.model('ReportForm', Schema);