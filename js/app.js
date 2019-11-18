new Vue({
  el: '#map',
  data: {
    map: null,
    tileLayer: null,
    control: null,
    plan: null,
    startButton: null,
    destButton: null,
    layers: []
  },
  mounted() {
    this.initMap();
    this.initLayers();
    this.reverseRoute();
    this.map.on('click', this.onMapClick);
  },
  methods: {
    initMap() {
      let latlng = L.latLng(40.735864, -73.980492);
      this.map = L.map('map').setView(latlng, 11);
      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      ).addTo(this.map);
    },
    reverseRoute() {
      this.plan = new ReversablePlan([
            L.latLng(40.702518, -74.014961), //Battery Park
            L.latLng(40.730623, -73.997602) //Washington Sq. Park
        ], {
            geocoder: L.Control.Geocoder.nominatim(), //simple geocoder form to locate places
            routeWhileDragging: true
        });

        this.control = L.Routing.control({
            routeWhileDragging: true,
            collapsible: true,
            plan: this.plan
        }).addTo(this.map);
    },
    onMapClick(e) {
      let container = L.DomUtil.create('div'),
          c = this.control, //instantiate local control & map
          m = this.map;

      this.startButton = createButton('Start from this location', container);
      this.destButton = createButton('Go to this location', container);

      L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(this.map);

      //remove the waypoint at index 0 (the first), and then add another one at the clicked location
      L.DomEvent.on(this.startButton, 'click', function() {
        c.spliceWaypoints(0, 1, e.latlng);
        m.closePopup();
      });

      //replace the last waypoint with a new one at the clicked location
      L.DomEvent.on(this.destButton, 'click', function() {
        c.spliceWaypoints(c.getWaypoints().length - 1, 1, e.latlng);
        m.closePopup();
      });
    },
    initLayers() {}
  },

});
