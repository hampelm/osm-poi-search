$(function(){
	var baseUrl = 'http://www.overpass-api.de/api/xapi?';
	// http://www.overpass-api.de/api/xapi_meta?*%5Bname=Sylt%5D
	// http://www.overpass-api.de/api/xapi?node[natural=tree][bbox=-83.12737,42.31794,-83.0175,42.37681][out:json]
	// http://www.overpass-api.de/api/xapi?node["natural"="tree"][bbox=-83.11981201171875,42.3883461218366,-82.92016983032227,42.45170800982129]
  var map = L.map('map').setView([42.42, -83.02 ], 13);

  baseLayer = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.map-zmpggdzn/{z}/{x}/{y}.png');
  map.addLayer(baseLayer);
  var bounds = map.getBounds();
  var ne = bounds.getNorthEast();
  var sw = bounds.getSouthWest();
	console.log(ne, sw);

	var pairs = [
		{
			key: 'natural',
			value: 'tree'
		},
		{
			key: 'amenity',
			value: 'place_of_worship',
			name: 'name'
		}
	];

	var queryMaker = function(pair) {
		return '[' + pair.key + '=' + pair.value + ']';
	}

	// omg this is the worst
	var pair = queryMaker(pairs[1]);
	var text = 'node' + pair + '[bbox=' + sw.lng + ',' + sw.lat + ',' + ne.lng + ',' + ne.lat + ']';
	url = baseUrl + text;

	var processOSM = function(data) {
		console.log(data);
		var nodes = $(data).find('node');
		console.log(nodes);
		$.each(nodes, function(index, node) {
			console.log(node);
			var lat = node.getAttribute('lat');
			var lng = node.getAttribute('lon');
			console.log(lat,lng);

			// node.find(tag attribute k=name get attribute v);

			L.marker([lat,lng]).addTo(map).bindPopup()
    		.openPopup();
		});
	};
	var query = $.get(url)
	query.done(processOSM);

});


	// node
	//   ["highway"="bus_stop"]
	//   ["shelter"="yes"]
	//   (50.7,7.1,50.8,7.25);
	// out body;
	// e="7.25" n="50.8" s="50.7" w="7.1"/


