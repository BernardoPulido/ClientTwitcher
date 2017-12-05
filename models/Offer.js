var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Supplier = mongoose.model('Supplier');

var offerSchema = new Schema({
        title: {type:String},
        description: {type:String},
        requirements: {type:String},
        subject_matter: {type:String},
        date_posted: {type:String},
        is_valid: {type:Boolean},
        budget: {type: String},
        poster: {
            type: Schema.Types.ObjectId,
            ref:'Supplier',
            required: true
        },
        lat: {type:Number},
        lon: {type:Number}
    },
    {
        versionKey:false
    });

module.exports = mongoose.model('Offer', offerSchema);