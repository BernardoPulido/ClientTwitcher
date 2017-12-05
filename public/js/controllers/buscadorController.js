angular.module('controladores.busqueda', ['servicios.busqueda'])
    .controller('OfferController', OfferController)
    .controller('OfferControllerView', OfferControllerView)
    .controller('BidderController', BidderController)
    .controller('SupplierController', SupplierController);

function OfferController($scope, $timeout, Offer) {

    $scope.oferta = {};
    $scope.oferta.date_posted = "04-12-2017";
    $scope.ofertas = Offer.ofertas;
    $scope.ofertas_ind = {};
    $scope.ofertas_indtest = {};
    $scope.ofertas_edit = {};
    $scope.ofertas_test={};
    $scope.supplier={};
    $scope.latitud="31.8693236";
    $scope.longitud_="-116.6688635";

    $scope.supplier = Offer.ofertas_test;
    if($scope.supplier._id!==null && $scope.supplier._id!==undefined){
        changetext();
    }

    $timeout(function () { twttr.widgets.load(); }, 500);

    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
    function onPositionUpdate(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $scope.latitud = lat;
        $scope.longitud_ = lng;
    }
    $scope.oferta.lat = $scope.latitud;
    $scope.oferta.lon = $scope.longitud_;

    $scope.addOferta= function () {
        $scope.oferta.poster=$scope.supplier._id;
        $scope.oferta.is_valid = true;
        Offer.addOferta($scope.oferta);
        var url ="https://twitter.com/intent/tweet?text=Oferta: "+$scope.oferta.title+"&hashtags=ClientTwitcher";
        openInNewTab(url);
        $scope.oferta = {};
    };
    $scope.showOferta = function (id) {
        Offer.ofertas_edit={};
        $scope.oferta = {};
        Offer.showOferta(id);
        $scope.oferta = Offer.ofertas_edit;
    };
    $scope.getOfertas = function(){
        Offer.getOfertas();
        $scope.ofertas = Offer.ofertas;
        $scope.test=1;
    };
    $scope.findOferta = function(id){
        Offer.ofertas_ind={};
        $scope.oferta = {};
        Offer.findOferta(id);
        $scope.oferta = Offer.ofertas_ind;
    };
    $scope.updateOferta = function(oferta){
        Offer.updateOferta(oferta);
        $scope.oferta = {};
    };

    $scope.deleteOferta= function(id){
        Offer.deleteOferta(id);
        $scope.oferta = {};
    };
};

function OfferControllerView($scope, $routeParams, Offer) {
    $scope.oferta = {};
    Offer.findOferta($routeParams.id)

    $scope.oferta = Offer.ofertas_ind;
};

function BidderController($scope, Bidder){
    $scope.bidder = {};
    $scope.bidders = Bidder.bidders;
    $scope.bidders_ind = {};
    $scope.bidders_edit = {};


    $scope.addBidder = function () {
        Bidder.addBidder($scope.bidder);
        $scope.bidder = {};
    };
    $scope.showBidder = function (id) {
        Bidder.bidders_edit={};
        $scope.bidder = {};
        Bidder.showBidder(id);
        $scope.bidder = Bidder.bidders_edit;
    };
    $scope.getBidders = function(){
        Bidder.getBidders();
        $scope.bidders = Bidder.bidders;
    };
    $scope.findBidder = function(id){
        Bidder.bidders_ind={};
        $scope.bidder = {};
        Bidder.findBidder(id);
        $scope.bidder = Bidder.bidders_ind;
    };
    $scope.updateBidder = function(bidder){
        Bidder.updateBidder(bidder);
        $scope.bidder = {};
    };
    $scope.deleteBidder = function(id){
        Bidder.deleteBidder(id);
        $scope.bidder = {};
    };
};

function SupplierController($scope, $location, Supplier) {
    $scope.texto = "Ingresar";
    $scope.supplier = {};
    $scope.suppliers_por = {};

    Supplier.getSuppliers();
    $scope.suppliers = Supplier.suppliers;


    var c=0;
    $scope.suppliers.forEach(function (sup) {
        if(sup.status==1){
            c++;
        }
    });
    if(c>0){
        //Salir
        salir();
        Supplier.updateSupplierss();
        $scope.oksalir=1;
    }

    $scope.addSupplier = function () {
        $scope.supplier.status=1;
        Supplier.addSupplier($scope.supplier);
        $scope.supplier = {};
        $scope.ok=1;

    };
    $scope.acceder = function () {
        $scope.suppliers_por ={};
        Supplier.find($scope.supplier_login.email);
        $scope.supplier_login = Supplier.suppliers_por;
        var _id = Supplier.suppliers_por._id;
        Supplier.updateTodos($scope.supplier_login._id);
        if(_id!=null){
            $location.path("/#!/");
            perrona();
        }else{
            var c=0;
            $scope.suppliers.forEach(function (sup) {
                if(sup.status==1){
                    c++;
                }
            });
            if(c>0){

            }else{

            }
            $scope.texto = "Ir a Inicio";
        }


    };

    $scope.updateSupplier = function(supplier){
        Supplier.updateSupplier(supplier);
        $scope.supplier = {};
    };

};