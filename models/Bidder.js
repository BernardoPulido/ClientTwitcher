var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bidderSchema = new Schema({
        name: {type:String},
        grade_achieved: {type:String},
        email: {type:String},
        link_to_cv: {type:String},
    },
    {
        versionKey:false
    });

module.exports = mongoose.model('Bidder', bidderSchema);