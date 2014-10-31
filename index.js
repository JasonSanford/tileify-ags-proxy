var express = require('express'),
    request = require('request'),
    TileifyAGS = require('tileify-ags').TileifyAGS;

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, resp) {
  resp.sendfile('public/index.html');
});

app.get('/tiles/:z/:x/:y', function(req, resp) {
  var z = parseInt(req.params.z, 10);
  var x = parseInt(req.params.x, 10);
  var y = parseInt(req.params.y, 10);

  //pull out proxy query params
  var ags_server_url = req.query.url;
  var redirect = req.query.redirect != null && req.query.redirect.toLowerCase() !== "false" ? true : false;

  //grab all other query params intended for the ags server
  var url_param_config = req.query;
  delete url_param_config.url;
  delete url_param_config.redirect;

  //create the tile url
  var tiler = new TileifyAGS(url_param_config);
  var url = tiler.getTileUrl(ags_server_url, x, y, z);

  //serve it up!
  if (redirect) {
    resp.redirect(url);
  } else {
    req.pipe(request(url)).pipe(resp);
  }
});

app.listen(app.get('port'), function() {
  console.log('Running at port: ' + app.get('port'));
});