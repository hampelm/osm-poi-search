$(function(){
	var baseUrl = 'http://overpass.osm.rambler.ru/cgi/interpreter?data=%5Bout:json%5D;';
  var map = L.map('map').setView([42.42, -83.02 ], 15);

  baseLayer = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.map-zmpggdzn/{z}/{x}/{y}.png');
  map.addLayer(baseLayer);
  var bounds = map.getBounds();
  var ne = bounds.getNorthEast();
  var sw = bounds.getSouthWest();
	console.log(ne, sw);

	// omg this is the worst
	var text = 'node["natural"="tree"](' + ne.lng + ',' + ne.lat + ',' + sw.lat + ',' + sw.lng + ');out;'
	var url = baseUrl + encodeURI(text);
	// nw, se
	console.log(url);
});


	// node
	//   ["highway"="bus_stop"]
	//   ["shelter"="yes"]
	//   (50.7,7.1,50.8,7.25);
	// out body;
	// "7.25" n="50.8" s="50.7" w="7.1"/


