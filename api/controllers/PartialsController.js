/**
 * PartialsController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function(req, res, next) {
    //console.log('PartialsController: action=index ',req);
    // res.view({
    //     _layoutFile: 'layout.ejs'
    // });
    // res.render('home/index');
  },

  partials: function(req, res, next) {
    console.log('PartialsController: action=partials ',req.param('file'));
    res.render('partials/' + req.param('file'));
  },

  tumblr: function(req, res, next) {
    console.log('PartialsController => tumblr: action=partials ',req.param('file'));
    res.render('partials/corp/tumblr/' + req.param('file'));
  },

  corporate: function(req, res, next) {
    console.log('PartialsController =>corporate: action=partials ',req.param('file'));
    res.render('partials/corp/' + req.param('file'));
  },

   // mapstyle: function(req, res, next) {
   //  var mapstyle = [{
   //    "featureType": "water",
   //      "elementType": "geometry",
   //      "stylers": [
   //          {
   //              "color": "#a2daf2"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "landscape.man_made",
   //      "elementType": "geometry",
   //      "stylers": [
   //          {
   //              "color": "#f7f1df"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "landscape.natural",
   //      "elementType": "geometry",
   //      "stylers": [
   //          {
   //              "color": "#d0e3b4"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "landscape.natural.terrain",
   //      "elementType": "geometry",
   //      "stylers": [
   //          {
   //              "visibility": "off"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "poi.park",
   //      "elementType": "geometry",
   //      "stylers": [
   //          {
   //              "color": "#bde6ab"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "poi",
   //      "elementType": "labels",
   //      "stylers": [
   //          {
   //              "visibility": "off"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "poi.medical",
   //      "elementType": "geometry",
   //      "stylers": [
   //          {
   //              "color": "#fbd3da"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "poi.business",
   //      "stylers": [
   //          {
   //              "visibility": "off"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "road",
   //      "elementType": "geometry.stroke",
   //      "stylers": [
   //          {
   //              "visibility": "off"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "road",
   //      "elementType": "labels",
   //      "stylers": [
   //          {
   //              "visibility": "off"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "road.highway",
   //      "elementType": "geometry.fill",
   //      "stylers": [
   //          {
   //              "color": "#ffe15f"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "road.highway",
   //      "elementType": "geometry.stroke",
   //      "stylers": [
   //          {
   //              "color": "#efd151"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "road.arterial",
   //      "elementType": "geometry.fill",
   //      "stylers": [
   //          {
   //              "color": "#ffffff"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "road.local",
   //      "elementType": "geometry.fill",
   //      "stylers": [
   //          {
   //              "color": "black"
   //          }
   //      ]
   //  },
   //  {
   //      "featureType": "transit.station.airport",
   //      "elementType": "geometry.fill",
   //      "stylers": [
   //          {
   //              "color": "#cfb2db"
   //          }
   //      ]
   //  },{
   //  }];
/*
  mapstyle: function(req, res, next) {
    var mapstyle = [{
      'featureType': 'water',
      'elementType': 'geometry.fill',
      'stylers': [
        { 'color': '#428bca' },
        { 'saturation': 1 }
      ]
    }, {
      'featureType': 'road.highway',
      'elementType': 'geometry.fill',
      'stylers': [
        { 'color': '#e7e9e7' }
      ]
    },{
    },{
      'elementType': 'geometry.stroke',
      'stylers': [
        { 'color': '#b2b2b1' }
      ]
    },{
      'featureType': 'road.arterial',
      'elementType': 'geometry.fill',
      'stylers': [
        { 'color': '#ffffff' }
      ]
    },{
      'featureType': 'road.arterial',
      'elementType': 'labels.text.stroke',
      'stylers': [
        { 'visibility': 'on' },
        { 'saturation': -2 },
        { 'color': '#ffffff' }
      ]
    },{
      'elementType': 'labels.text.fill',
      'stylers': [
        { 'color': '#060606' },
        { 'lightness': 23 }
      ]
    },{
      'elementType': 'labels.text.stroke',
      'stylers': [
        { 'color': '#ffffff' }
      ]
    },{
      'featureType': 'poi.park',
      'elementType': 'geometry.fill',
      'stylers': [
        { 'hue': '#b8dd38' },
        { 'gamma': 1.07 },
        { 'saturation': 52 },
        { 'lightness': -18 }
      ]
    },{
    }];
  */


    // return res.send(ResponseUtil.jsonSuccess({ mapstyle: mapstyle }));
  // },

  blueprints: {

    prefix: '',
//    actions: true,
//    shortcuts: true,
    rest: false,
//    expectIntegerId: false
  }
};
