var mongoose = require('mongoose');

//Variables for model integration
var bidders = mongoose.model('Bidder')

exports.addBidders = function(req, res, next){
    console.log('POST /bidders');
    var bidder = new bidders({
        name :req.body.name,
        grade_achieved : req.body.grade_achieved,
        email : req.body.email,
        link_to_cv : req.body.link_to_cv
    });
    bidder.save(function (err, bidder) {
        if(err) return res.status(403).jsonp({error:'403', info:err.message});
        bidders.findById(bidder._id, function (err, bidder) {
            if(err) return res.status(403).jsonp({error:'403', info:err.message});
            res.status(200).jsonp(bidder);
        })
    });
};


exports.getBidders = function(req, res, next){
    bidders.find(req.query, function (err, bidders) {
        if(err){
            res.status(403).jsonp({error:'403', info:err.message});
        }else{
            console.log('GET /bidders');
            res.status(200).jsonp(bidders);
        }
    });
};

//exports.updateBidders = function(){}

//exports.deleteBidders = function(){}

exports.getBiddersbyId = function(req, res, next){
    bidders.findById(req.params.id, function (err, bidder) {
        if(err){
            return res.status(403).jsonp({error:'403', info:err.message});
        }
        if(bidder){
            console.log('GET /bidders/:id');
            return res.status(200).jsonp(bidder);
        }else{
            return res.status(403).jsonp({error:'403', descrip:"No bidder found with given ID"});
        }
    });
};

exports.updateBiddersbyId = function(req, res, next){
    console.log('PUT /bidders/:id');
    console.log(req.params.id);
    console.log(req.body);

    bidders.findById(req.params.id,function (err, bidder) {
        if(err){
            res.status(403).jsonp({error:'403', info:err.message});
        }else{
            req.body.name?bidder.name = req.body.name:null;
            req.body.grade_achieved?bidder.grade_achieved = req.body.grade_achieved:null;
            req.body.email?bidder.email = req.body.email:null;
            req.body.link_to_cv?bidder.link_to_cv = req.body.link_to_cv:null;
            bidder.save(function (err, bidder) {
                if(err) return res.status(403).jsonp({error:'403', info:err.message});
                bidders.find(function (err, bidder) {
                    if(err) return res.status(403).jsonp({error:'403', info:err.message});
                    res.status(200).jsonp(bidder);
                })
            });
        }
    });
};

exports.deleteBiddersbyId = function(req, res, next){
    console.log('DELETE /bidders/:id');
    console.log(req.params.id);
    bidders.findByIdAndRemove(req.params.id, function (err, bidder) {
        if(err){
            return res.status(403).jsonp({error:'403', info:'bidder does not exist'});
        }else{
            bidders.find(function (err, bidder) {
                if(err) return res.status(403).jsonp({error:'403', info:'Error occured while removing bidder'});
                return res.status(200).jsonp(bidder);
            });
        }
    });
};
