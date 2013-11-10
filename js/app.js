$(function(){

	var app = {
		BASEURL: 'http://www.overpass-api.de/api/xapi?',

		BASELAYER: 'http://a.tiles.mapbox.com/v3/matth.map-n9bps30s/{z}/{x}/{y}.png',

		TAGS: {
			'trees': {
				key: 'natural',
				value: 'tree'
			},
			'churches': {
				key: 'amenity',
				value: 'place_of_worship',
				name: 'name'
			},
			'supermarkets': {
				key: 'shop',
				value: 'supermarket'
			},
			'schools': {
				key: 'amenity',
				value: 'school'
			},
			'hospitals': {
				key: 'amenity',
				value: 'hospital'
			}
		},

		CIRCLESTYLE:  {
			color: '#fff',
			weight: 3,
			opacity: 1,
			fillColor: '#58aeff',
			fillOpacity: 1,
			radius: 8
		},

		key: 'churches',

		markers: L.layerGroup(),

		init: function() {
			app.map = L.map('map').setView([42.360055,-83.067455], 13);
			var baseLayer = L.tileLayer(app.BASELAYER);
  		app.map.addLayer(baseLayer);
  		app.markers.addTo(app.map);
  		app.findFeatures();

  		app.map.on('moveend', app.findFeatures);

  		$('.options a').on('click', app.setFeatureType);
		},

		setFeatureType: function(event) {
			event.preventDefault();
			app.markers.clearLayers();

			var $elt = $(event.target);
			$('.options a').removeClass('selected');
			$elt.addClass('selected');

			app.key = $elt.attr('data-key');
			app.findFeatures();
		},

		queryBuilder: function(object) {
			var bounds = app.map.getBounds();
		  var ne = bounds.getNorthEast();
		  var sw = bounds.getSouthWest();
		  var pair = '[' + object.key + '=' + object.value + ']';
			var text = 'node' + pair + '[bbox=' + sw.lng + ',' + sw.lat + ',' + ne.lng + ',' + ne.lat + ']';
			url = app.BASEURL + text;
			return url;
		},

		getName: function(node) {
			var names = $(node).find('[k="name"]');
			if(names[0]) {
				return names[0].getAttribute('v');
			}
			return '';
		},

		processOSM: function(data) {
			app.markers.clearLayers();
			var nodes = $(data).find('node');
			$.each(nodes, function(index, node) {
				var lat = node.getAttribute('lat');
				var lng = node.getAttribute('lon');
				var name = app.getName(node);
				var circle = new L.CircleMarker([lat, lng], app.CIRCLESTYLE);
				circle.bindPopup(name);
				app.markers.addLayer(circle);
				//app.map.addLayer(circle);
			});
		},

		findFeatures: function() {
			var url = app.queryBuilder(app.TAGS[app.key]);
			var query = $.get(url);
			query.done(app.processOSM);
		}
	};

	app.init();
});


	// node
	//   ["highway"="bus_stop"]
	//   ["shelter"="yes"]
	//   (50.7,7.1,50.8,7.25);
	// out body;
	// e="7.25" n="50.8" s="50.7" w="7.1"/


