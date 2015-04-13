## Tileify AGS Proxy

This is a node application that uses [tileify-ags](https://github.com/JasonSanford/tileify-ags) to create a simple proxy for serving up regular old, uncached ArcGIS Server map services as map tiles that can be easily added to any slippy map (Leaflet, OpenLayers, Google Maps).

[View a demo](http://tileify-ags.herokuapp.com/)

### Install - Run

```
cd /path/to/tileify-ags-proxy
npm install
npm start
```

### Deployment

#### The Easy Way

Click this button.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/JasonSanford/tileify-ags-proxy)

#### The Slightly Harder But Still Really Easy Way

The `Procfile` makes this application easy to deploy to [heroku](https://www.heroku.com/).

```
cd /path/to/tileify-ags-proxy
heroku create
git push heroku master
```

### Usage

After running your application visit the application root (`http://localhost:5000/`) for some documentation and an interactive demo.

The tiling proxy can be found at `http://localhost:5000/tiles/{z}/{x}/{y}`. Those funny looking letters are placholders for the tiles located at specific zoom levels and coordinates. Your [mapping library](http://leafletjs.com/reference.html#tilelayer) should automatically replace these with actual values at runtime.

There is one required URL parameter to add, `url`. This is the ArcGIS Server map server endpoint and will look something like:

    http://maps.ci.charlotte.nc.us/arcgis/rest/services/WEB/BaseMap/MapServer

This value you add to the URL **should be URL encoded!**

You can URL encode by doing:

```javascript
var ags_url = 'http://maps.ci.charlotte.nc.us/arcgis/rest/services/WEB/BaseMap/MapServer';
var encoded = encodeURIComponent(ags_url);
console.log(encoded);
// http%3A%2F%2Fmaps.ci.charlotte.nc.us%2Farcgis%2Frest%2Fservices%2FWEB%2FBaseMap%2FMapServer
```

An example URL looks like:

    http://localhost:5000/{z}/{x}/{y}?url=http%3A%2F%2Fmaps.ci.charlotte.nc.us%2Farcgis%2Frest%2Fservices%2FWEB%2FBaseMap%2FMapServer

#### ImageServer

ArcGIS Server ImageServer services are also supported. Instead of using the `MapServer` services as seen above, just use `ImageServer`:

    http://gisdev.lakecountyfl.gov/lakegis/rest/services/Aerial2014/ImageServer

#### Additional URL Parameters

In addition to the required `url` URL parameter, you can also pass a `&redirect=true` parameter that will perform an HTTP redirect to the map server instead of serving it itself.

Also accepted are the URL parameters [supported by ArcGIS Server](http://resources.esri.com/help/9.3/arcgisserver/apis/rest/export.html). Some of these that you might find valuable are:

* `transparent` - Helpful for overlay layers where you want to see stuff that's underneath. Set to `true` for anything other than a base map.
* `layers` - Which specific layers from the map service you want in your map tiles.
* `format` - Switch between png and jpg formats.

### Use a Hosted Version

I've deployed an instance of this application at Heroku. You're free to use it as you wish. In the examples above just use the `tileify-ags.herokuapp.com` domain instead of `localhost:5000`.

http://tileify-ags.herokuapp.com
