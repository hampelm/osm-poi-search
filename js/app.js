$(function(){
	var baseUrl = 'http://www.overpass-api.de/api/xapi?';
	// http://www.overpass-api.de/api/xapi_meta?*%5Bname=Sylt%5D
	// http://www.overpass-api.de/api/xapi?node[natural=tree][bbox=-83.12737,42.31794,-83.0175,42.37681][out:json]
	// http://www.overpass-api.de/api/xapi?node["natural"="tree"][bbox=-83.11981201171875,42.3883461218366,-82.92016983032227,42.45170800982129]
  var map = L.map('map').setView([42.42, -83.02 ], 10);

  baseLayer = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.map-zmpggdzn/{z}/{x}/{y}.png');
  map.addLayer(baseLayer);
  var bounds = map.getBounds();
  var ne = bounds.getNorthEast();
  var sw = bounds.getSouthWest();
	console.log(ne, sw);

	// omg this is the worst
	var text = 'node[natural=tree][bbox=' + sw.lng + ',' + sw.lat + ',' + ne.lng + ',' + ne.lat + ']';
	// nw, se
	url = baseUrl + text;
	console.log(url);
});


	// node
	//   ["highway"="bus_stop"]
	//   ["shelter"="yes"]
	//   (50.7,7.1,50.8,7.25);
	// out body;
	// e="7.25" n="50.8" s="50.7" w="7.1"/


