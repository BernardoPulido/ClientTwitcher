var mongoose = require('mongoose');

//Variables for model integration
var suppliers = mongoose.model('Supplier')
var offers = mongoose.model('Offer')

exports.addOffers = function(req, res, next){
    console.log('POST /offers');
    var offer = new offers({
        title :req.body.title,
        description :req.body.description,
        requirements : req.body.requirements,
        subject_matter : req.body.subject_matter,
        date_posted :req.body.date_posted,
        is_valid : req.body.is_valid,
        budget : req.body.budget,
        poster: req.body.poster,
        lat: req.body.lat,
        lon: req.body.lon

    });
    offer.save(function (err, offer) {
        if(err) return res.status(403).jsonp({error:'403', info:err.message});
        offers.findById(offer._id).populate('poster').exec(function (err, offer) {
            if(err) return res.status(403).jsonp({error:'403', info:err.message});
            res.status(200).jsonp(offer);
        })
    });
};

exports.getOffers = function(req, res, next){
    offers.find(req.query).populate('poster').exec(function (err, offers) {
        if(err){
            res.status(403).jsonp({error:'403', info:err.message});
        }else{
            console.log('GET /offers');
            res.status(200).jsonp(offers);
        }
    });
};

// necessary? exports.updateOffers = function(){}

// exports.deleteOffers = function(){}

exports.getOffersbyId = function(req, res, next){
    offers.findById(req.params.id).populate('poster').exec(function (err, offer) {
        if(err){
            return res.status(403).jsonp({error:'403', info:err.message});
        }
        if(offer){
            console.log('GET /offers/:id');
            return res.status(200).jsonp(offer);
        }else{
            return res.status(403).jsonp({error:'403', descrip:"No offers with given ID found"});
        }
    });
};

exports.updateOffersbyId = function(req, res, next){
    console.log('PUT /offers/:id');
    console.log(req.params.id);
    console.log(req.body);

    offers.findById(req.params.id,function (err, offer) {
        if(err){
            res.status(403).jsonp({error:'403', info:err.message});
        }else{
            req.body.title?offer.title = req.body.title:null;
            req.body.description?offer.description = req.body.description:null;
            req.body.requirements?offer.requirements = req.body.requirements:null;
            req.body.subject_matter?offer.subject_matter = req.body.subject_matter:null;
            req.body.date_posted?offer.date_posted = req.body.date_posted:null;
            req.body.is_valid?offer.is_valid = req.body.is_valid:null;
            req.body.budget?offer.budget = req.body.budget:null;
            req.body.poster?offer.poster = req.body.poster:null;
            req.body.lat?offer.lat = req.body.lat:null;
            req.body.lon?offer.lon = req.body.lon:null;

            offer.save(function (err, offer) {
                if(err) return res.status(403).jsonp({error:'403', info:err.message});
                /*offers.findById(offer._id).populate('poster').exec(function (err, offer) {
                    if(err) return res.status(403).jsonp({error:'403', info:err.message});
                    res.status(200).jsonp(offer);
                })*/
                offers.find(req.query).populate('poster').exec(function (err, offer) {
                    if(err) return res.status(403).jsonp({error:'403', info:'Error occured while updating offer'});
                    return res.status(200).jsonp(offer);
                });
            });
        }
    });
};

exports.deleteOffersbyId = function(req, res, next){
    console.log('DELETE /offers/:id');
    console.log(req.params.id);
    offers.findByIdAndRemove(req.params.id).populate('poster').exec(function (err, offer) {
        if(err){
            return res.status(403).jsonp({error:'403', info:'Offer does not exist'});
        }else{
            offers.find(req.query).populate('poster').exec(function (err, offer) {
                if(err) return res.status(403).jsonp({error:'403', info:'Error occured while removing offer'});
                return res.status(200).jsonp(offer);
            });
        }
    });
};
