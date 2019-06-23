/* eslint-disable no-console */

const express = require('express');
const port = process.env.PORT || 4000;
const app = express();
const livePricing = require('./live-pricing');
const places = require('./places');
const transformations = require('./transformations/transformations');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
  Simple flight search api wrapper. Client should provide params.
  API params and location values are here: http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart
*/
app.get('/api/search', async (req, res) => {
  try {
    const results = await livePricing.search({
      originplace: req.query.originplace,
      destinationplace: req.query.destinationplace,
      outbounddate: req.query.outbounddate, 
      inbounddate: req.query.inbounddate,
    // &adults=2
    })
    
    //Transform results for consumption by client
    const newResult = transformations.transformResult(results);
    res.json(newResult);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

app.get('/places', async(req, res) => {
  try {
    const results = await places.search({
      query: req.query.query
    })
    const newResult = transformations.transformPlaceResult(results)
    res.json(newResult);
  } catch(error) {
    res.status(500).send(err);
    console.error(err);
  }
});


app.listen(port, () => {
  console.log('Node server listening on port'+port);
});




