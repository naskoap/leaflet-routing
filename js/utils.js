function createButton(label, container) {
  var btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.innerHTML = label;
  return btn;
};

//reverse the direction of the route
var ReversablePlan = L.Routing.Plan.extend({
    createGeocoders: function() {
        var container = L.Routing.Plan.prototype.createGeocoders.call(this),
            reverseButton = createButton('Reverse', container);
        L.DomEvent.on(reverseButton, 'click', function() {
          var waypoints = this.getWaypoints();
          this.setWaypoints(waypoints.reverse());
        }, this);
        return container;
    }
});
