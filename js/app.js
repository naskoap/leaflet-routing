let latlng = L.latLng(40.827787, -73.925903);
let map = L.map('map').setView(latlng, 12);

L.tileLayer(
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  }
).addTo(map);

let control = L.Routing.control({
  waypoints: [
    L.latLng(40.7580, -73.9855),
    L.latLng(40.8896, -73.9028)
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
