const path = require('path');

const express = require('express');
const request = require('request');
const TileifyAGS = require('tileify-ags');

const app = express();

const port = process.env.PORT || 5000;

app.set('port', port);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, resp) => {
  resp.sendfile('public/index.html');
});

app.get('/tiles/:z/:x/:y', (req, resp, next) => {
  const z = parseInt(req.params.z, 10);
  const x = parseInt(req.params.x, 10);
  const y = parseInt(req.params.y, 10);

  const {
    url: agsServerUrl,
    referer,
  } = req.query;

  let { pixelRatio } = req.query;

  const redirect = req.query.redirect != null && req.query.redirect.toLowerCase() !== 'false';

  if (pixelRatio) {
    pixelRatio = parseInt(pixelRatio, 10);
  }

  const urlParamConfig = req.query;
  delete urlParamConfig.url;
  delete urlParamConfig.redirect;
  delete urlParamConfig.referer;
  delete urlParamConfig.pixelRatio;

  const tiler = new TileifyAGS(agsServerUrl, urlParamConfig, pixelRatio);
  let url = tiler.getTileUrl(x, y, z);

  if (redirect) {
    resp.redirect(url);
  } else {
    if (referer) {
      url = {
        url,
        headers: { Referer: referer },
      };
    }

    req.pipe(request(url).on("error", next)).pipe(resp);
  }
});

app.listen(app.get('port'), () => console.log(`Running at port: ${port}`));
