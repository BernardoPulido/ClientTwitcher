angular.module('buscApp', ['ngRoute', 'controladores.busqueda', 'ngMap'])
    .config(configurar);

function configurar($routeProvider){
      $routeProvider
          .when('/', {
              templateUrl: '/templates/main.html',
              controller:'OfferController',
              resolve:{
                  ofertasPromise: ['Offer', function (Offer) {
                      Offer.getOfertas();
                      Offer.testid();
                  }]
              }
          })
          .when('/ofertas/:id', {
              templateUrl: '/templates/view.html',
              controller:'OfferControllerView'
          })
          .when('/comunidad', {
              templateUrl: '/templates/comunidad.html',
              controller:'BidderController',
              resolve:{
                  bidderPromise: ['Bidder', function (Bidder) {
                      Bidder.getBidders();
                  }]
              }
          })
          .when('/registro', {
              templateUrl: '/templates/registro.html',
              controller:'SupplierController',
              resolve:{
                  bidderPromise: ['Supplier', function (Supplier) {
                  }]
              }
          })
          .otherwise({
             redirectTo:'/'
          });
};



