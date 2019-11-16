let center = L.latLng(40.735864, -73.980492);
var map = L.map('map').setView(center, 12);

L.tileLayer(
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  }
).addTo(map);

var control = L.Routing.control({
  waypoints: [
    L.latLng(40.702518, -74.014961), //Battery Park
    L.latLng(40.730623, -73.997602) //Washington Sq. Park
  ]
}).addTo(map);

function createButton(label, container) {
  var btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.innerHTML = label;
  return btn;
};

map.on('click', function(e) {
  let container = L.DomUtil.create('div'),
      startBtn = createButton('Start from this location', container),
      destBtn = createButton('Go to this location', container);

  L.popup()
    .setContent(container)
    .setLatLng(e.latlng)
    .openOn(map);

  L.DomEvent.on(startBtn, 'click', function() {
    control.spliceWaypoints(0, 1, e.latlng);
    map.closePopup();
  });

  L.DomEvent.on(destBtn, 'click', function() {
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
    map.closePopup();
  });
});
