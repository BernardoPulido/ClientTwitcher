var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var supplierSchema = new Schema({
        name: {type:String},
        institution: {type:String},
        status: {type:Number},
        email: {type:String},
        homepage: {type:String}
    });

module.exports = mongoose.model('Supplier', supplierSchema);