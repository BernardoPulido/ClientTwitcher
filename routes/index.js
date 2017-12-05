var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer();
var modelBidder = require('../models/Bidder');
var modelSupplier = require('../models/Supplier');
var modelOffer = require('../models/Offer');

var offerCtrl = require('../controllers/OfferController');
var supplierCtrl = require('../controllers/SupplierController');
var bidderCtrl = require('../controllers/BidderController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TwitcherAPI' });
});
router.route('/offers')
    .get(offerCtrl.getOffers)
    .post(upload.array(), offerCtrl.addOffers);

router.route('/offers/:id')
    .get(offerCtrl.getOffersbyId)
    .put(upload.array(), offerCtrl.updateOffersbyId)
    .delete(offerCtrl.deleteOffersbyId);

router.route('/suppliers')
    .get(supplierCtrl.getSuppliers)
    .post(upload.array(), supplierCtrl.addSuppliers);

router.route('/suppliers/:id')
    .get(supplierCtrl.getSuppliersbyId)
    .put(upload.array(), supplierCtrl.updateSuppliersbyId)
    .delete(supplierCtrl.deleteSuppliersbyId);

router.route('/supplier/:id')
    .get(supplierCtrl.getSupplier)
    .put(upload.array(), supplierCtrl.updateTodos);

router.route('/supplie')
    .get(supplierCtrl.getSupplierUnico);

router.route('/supps')
    .put(supplierCtrl.getSupplierCerrar);

router.route('/suppliers/:id/offers')
    .get(supplierCtrl.getOffersbySupplier);

router.route('/bidders')
    .get(bidderCtrl.getBidders)
    .post(upload.array(), bidderCtrl.addBidders);

router.route('/bidders/:id')
    .get(bidderCtrl.getBiddersbyId)
    .put(upload.array(), bidderCtrl.updateBiddersbyId)
    .delete(bidderCtrl.deleteBiddersbyId);

module.exports = router;
