const fetch = require('node-fetch')
const querystring = require('querystring');

const config = require('./config');
const PLACE_URL = `${config.skyscannerApi}apiservices/autosuggest/v1.0/UK/GBP/en-GB/`

const formatParams = params => querystring.stringify({
    apiKey: config.apiKey,
    ...params,
  });

/*
 * Get a list of places that match a query string.
 * RESPONSE PARAMETERS => Places: Contains the list of places that match the query string. The places can be countries, cities or airports.
 */
const search = async (params) => {
    const uri = PLACE_URL + "?"+formatParams(params)
    try {
        const response = await fetch(uri, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        });
        const places = await response.json();
        return places;
    } catch (err) {
        throw err;
    }
}

module.exports = {search}
