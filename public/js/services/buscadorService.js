angular.module('servicios.busqueda', [])
            .factory('Offer', Offer)
            .factory('Bidder', Bidder)
            .factory('Supplier', Supplier);


function Offer($http){
    var o ={
        ofertas:[],
        ofertas_ind:[],
        ofertas_indtest:[],
        ofertas_edit:[],
        ofertas_test:[],
        test:0
    };

    o.getOfertas = function(){
        return $http.get('/offers')
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, o.ofertas);
            }, function(res){
                console.log(res.statusText);
            });
    };

    o.addOferta = function(nuevo){
        return $http.post('/offers', nuevo)
            .then(function (res) {
                o.ofertas.push(res.data);
            }, function (res) {
                console.log(res.statusText);
            });
    };
    o.findOferta = function(id){
        return $http.get('/offers/'+id)
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, o.ofertas_ind);
            }, function(res){
                console.log(res.statusText);
            });
    };
    o.showOferta = function(id){
        return $http.get('/offers/'+id)
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, o.ofertas_edit);
            }, function(res){
                console.log(res.statusText);
            });
    };

    o.updateOferta = function(actualizado){
        if(actualizado._id!==undefined){
            return $http.put('/offers/'+actualizado._id, actualizado)
                .then(function (res) {
                    angular.copy(res.data, o.ofertas);
                }, function (res) {
                    console.log(res.statusText);
                });
        }
    };
    o.deleteOferta = function(id){
        return $http.delete('/offers/'+id)
            .then(function (res) {
                angular.copy(res.data, o.ofertas);
            }, function (res) {
                console.log(res.statusText);
            });
    };

    o.testid = function(){
        return $http.get('/supplie')
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, o.ofertas_test);
            }, function(res){
                console.log(res.statusText);
            });
    };

    return o;
};

function Bidder($http) {
    var b = {
        bidders : [],
        bidders_ind : [],
        bidders_edit : []
    };
    b.getBidders= function(){
        return $http.get('/bidders')
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, b.bidders);
            }, function(res){
                console.log(res.statusText);
            });
    };

    b.addBidder = function(nuevo){
        return $http.post('/bidders', nuevo)
            .then(function (res) {
                b.bidders.push(res.data);
            }, function (res) {
                console.log(res.statusText);
            });
    };
    b.findBidder = function(id){
        return $http.get('/bidders/'+id)
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, b.bidders_ind);
            }, function(res){
                console.log(res.statusText);
            });
    };
    b.showBidder = function(id){
        return $http.get('/bidders/'+id)
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, b.bidders_edit);
            }, function(res){
                console.log(res.statusText);
            });
    };

    b.updateBidder = function(actualizado){
        if(actualizado._id!==undefined){
            return $http.put('/bidders/'+actualizado._id, actualizado)
                .then(function (res) {
                    angular.copy(res.data, b.bidders);
                }, function (res) {
                    console.log(res.statusText);
                });
        }
    };
    b.deleteBidder = function(id){
        return $http.delete('/bidders/'+id)
            .then(function (res) {
                angular.copy(res.data, b.bidders);
            }, function (res) {
                console.log(res.statusText);
            });
    };
    return b;
};
function Supplier($http){
    var s ={
        suppliers:[],
        suppliers_ind : [],
        suppliers_edit : [],
        suppliers_por : []
    };

    s.getSuppliers = function(){
        return $http.get('/suppliers')
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, s.suppliers);
            }, function(res){
                console.log(res.statusText);
            });
    };

    s.addSupplier = function(nuevo){
        return $http.post('/suppliers', nuevo)
            .then(function (res) {
                s.suppliers.push(res.data);
            }, function (res) {
                console.log(res.statusText);
            });
    };
    s.findSupplier = function(id){
        return $http.get('/suppliers/'+id)
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, s.suppliers_ind);
            }, function(res){
                console.log(res.statusText);
            });
    };
    s.showSupplier = function(id){
        return $http.get('/suppliers/'+id)
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, s.suppliers_edit);
            }, function(res){
                console.log(res.statusText);
            });
    };

    s.updateSupplier= function(actualizado){
        if(actualizado._id!==undefined){
            return $http.put('/suppliers/'+actualizado._id, actualizado)
                .then(function (res) {
                    angular.copy(res.data, s.suppliers);
                }, function (res) {
                    console.log(res.statusText);
                });
        }
    };
    s.deleteSupplier = function(id){
        return $http.delete('/suppliers/'+id)
            .then(function (res) {
                angular.copy(res.data, s.suppliers);
            }, function (res) {
                console.log(res.statusText);
            });
    };
    s.find = function(id){
        return $http.get('/supplier/'+id)
            .then(function(res){
                console.log(res.data);
                angular.copy(res.data, s.suppliers_por);
            }, function(res){
                console.log(res.statusText);
            });
    };
    s.updateTodos= function(actualizado){
            return $http.put('/supplier/'+actualizado)
                .then(function (res) {
                    angular.copy(res.data, s.suppliers);
                }, function (res) {
                    console.log(res.statusText);
                });
    };
    s.updateSupplierss= function(){
        return $http.put('/supps')
            .then(function (res) {
                angular.copy(res.data, s.suppliers);
            }, function (res) {
                console.log(res.statusText);
            });
    };
    s.cerrar= function(actualizado){
        return $http.put('/supp/'+actualizado)
            .then(function (res) {
                angular.copy(res.data, s.suppliers);
            }, function (res) {
                console.log(res.statusText);
            });
    };


    return s;
};


