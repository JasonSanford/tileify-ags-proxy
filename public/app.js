(function(){
  var base_layer = new L.TileLayer('https://{s}.tiles.mapbox.com/v4/base.mapbox-streets+bg-e8e8e8_scale-1_water-0.13x0.13;0.00x0.00;0.81x0.81;0.00x1.00_streets-0.08x0.08;0.00x0.00;0.11x1.00;0.00x1.00_landuse-0.10x0.10;0.00x0.00;0.76x0.98;0.00x1.00_buildings-0.08x0.08;0.00x0.00;0.11x1.00;0.00x1.00/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamNzYW5mb3JkIiwiYSI6InRJMHZPZFUifQ.F4DMGoNgU3r2AWLY0Eni-w', {subdomains: 'abcd'});
  var map_options = {
    center: [35.0556188, -80.664826],
    zoom: 17,
    layers: [base_layer],
    maxZoom: 21
  };
  var map = new L.Map($('.map')[0], map_options);

  var ags_layer;

  function updateLayer(event) {
    if (event) {
      event.preventDefault();
    }
    var url = window.location.origin + '/tiles/{z}/{x}/{y}';
    var params = (function() {
      var encoded_ags_url = window.encodeURIComponent($('#ags_url').val());
      var key_vals = ['url=' + encoded_ags_url];
      $('.params').each(function (index, object) {
        var $param = $(object);
        var key = $param.find('.param-key').val();
        var value = $param.find('.param-value').val();
        if (key.length && value.length) {
          key_vals.push(key + '=' + window.encodeURIComponent(value));
        }
      });
      return key_vals;
    }());
    var url_template = url + '?' + params.join('&');
    $('#proxy_url_template').val(url_template);
    if (ags_layer) {
      ags_layer.setUrl(url_template);
    } else {
      ags_layer = new L.TileLayer(url_template, {maxZoom: 21});
      map.addLayer(ags_layer);
    }
  }

  $('#update-layer').on('click', updateLayer);

  updateLayer();
}());
