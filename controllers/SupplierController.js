var mongoose = require('mongoose');

//Variables for model integration
var suppliers = mongoose.model('Supplier')
var offers = mongoose.model('Offer')

exports.addSuppliers = function(req, res, next){
    console.log('POST /suppliers');
    var supplier = new suppliers({
        name :req.body.name,
        institution : req.body.institution,
        email : req.body.email,
        homepage : req.body.homepage,
        status : req.body.status
    });
    supplier.save(function (err, supplier) {
        if(err) return res.status(403).jsonp({error:'403', info:err.message});
        suppliers.findById(supplier._id, function (err, supplier) {
            if(err) return res.status(403).jsonp({error:'403', info:err.message});
            res.status(200).jsonp(supplier);
        })
    });
};


exports.getSuppliers = function(req, res, next){
    suppliers.find(req.query, function (err, suppliers) {
        if(err){
            res.status(403).jsonp({error:'403', info:err.message});
        }else{
            console.log('GET /suppliers');
            res.status(200).jsonp(suppliers);
        }
    });
};


exports.getSupplier = function(req, res, next){
    suppliers.findOne({email:req.params.id}, function (err, suppliers) {
        if(err){
            res.status(403).jsonp({error:'403', info:err.message});
        }else{
            res.status(200).jsonp(suppliers);
        }
    });
};
exports.getSupplierUnico = function(req, res, next){
    suppliers.findOne({status:1}, function (err, suppliers) {
        if(err){
            res.status(403).jsonp({error:'403', info:err.message});
        }else{
            res.status(200).jsonp(suppliers);
        }
    });
};
exports.getSupplierCerrar = function(req, res, next){
    suppliers.find(function (err, suppliers) {
        if(err){
            res.status(403).jsonp({error:'403', info:err.message});
        }else{
            suppliers.forEach(function (s) {
                    s.status = 0;
                    s.save(function (supplier) {

                    });
            });
            res.status(200).jsonp(suppliers);
        }
    });
};
//exports.updateSuppliers = function(){}

//exports.deleteSuppliers = function(){}

exports.getSuppliersbyId = function(req, res, next){
    suppliers.findById(req.params.id, function (err, supplier) {
        if(err){
            return res.status(403).jsonp({error:'403', info:err.message});
        }
        if(supplier){
            console.log('GET /suppliers/:id');
            return res.status(200).jsonp(supplier);
        }else{
            return res.status(403).jsonp({error:'403', descrip:"No supplier found with given ID"});
        }
    });
};

exports.updateTodos = function(req, res, next){

    suppliers.find(function (err, suppliers) {
        if(err){
            res.status(403).jsonp({error:'403', info:err.message});
        }else{
            suppliers.forEach(function (s) {
                if(s._id!=req.params.id){
                    s.status = 0;
                    s.save(function (supplier) {

                    });
                }else{
                    s.status = 1;
                    s.save(function (supplier) {

                    });
                }

            });
            res.status(200).jsonp(suppliers);
        }
    });
};

exports.updateSuppliersbyId = function(req, res, next){
    console.log('PUT /suppliers/:id');
    console.log(req.params.id);
    console.log(req.body);

    suppliers.findById(req.params.id,function (err, supplier) {
        if(err){
            res.status(403).jsonp({error:'403', info:err.message});
        }else{
            req.body.name?supplier.name = req.body.name:null;
            req.body.institution?supplier.institution = req.body.institution:null;
            req.body.email?supplier.email = req.body.email:null;
            req.body.homepage?supplier.homepage = req.body.homepage:null;
            req.body.status?supplier.status = req.body.status:null;
            supplier.save(function (err, supplier) {
                if(err) return res.status(403).jsonp({error:'403', info:err.message});
                suppliers.find(function (err, supplier) {
                    if(err) return res.status(403).jsonp({error:'403', info:err.message});
                    res.status(200).jsonp(supplier);
                })
            });
        }
    });
};


exports.deleteSuppliersbyId = function(req, res, next){
    console.log('DELETE /suppliers/:id');
    console.log(req.params.id);
    suppliers.findByIdAndRemove(req.params.id, function (err, supplier) {
        if(err){
            return res.status(403).jsonp({error:'403', info:'supplier does not exist'});
        }else{
            suppliers.find(function (err, supplier) {
                if(err) return res.status(403).jsonp({error:'403', info:'Error occured while removing supplier'});
                return res.status(200).jsonp(supplier);
            });
        }
    });
};

exports.getOffersbySupplier = function (req, res, next) {
    console.log('GET /suppliers/:id/offers');
    suppliers.findById(req.params.id, function (err, supplier) {
        if(err || !supplier){
            console.log(1)
            return res.status(500).jsonp({error:'500', info:err.message});
        }else{
            console.log(2)
            offers.find({'poster':req.params.id}).populate('poster').exec(function (err, offer) {
                if(err){
                    return res.status(500).jsonp({error:'500', info:err.message});
                }else{
                    if(offer.length==0){
                        return res.status(500).jsonp({error:'500', info:"Supplier has no active projects"});
                    }else{
                        return res.status(200).jsonp(offer);
                    }

                }
            });
        }
    });

};
