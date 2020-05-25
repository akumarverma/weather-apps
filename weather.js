const axios = require('axios')


const MAPQUEST_URL = 'http://www.mapquestapi.com/geocoding/v1/address';
const MAPQUEST_API_KEY = 'WGA0EzzO3cJyUUPSKrpufn3NRYghzRBb';

const DARKSKY_URL = 'https://api.darksky.net/forecast/';
const DARKSKY_API_KEY = 'a3a4aae6287d4d587dc89954ed49ebac';

//let address = '15 A2 Piilipuuntie 02250'

const getWeather = async (address) => {
    try {
        console.log(address)
        let geo_response = await axios.get(MAPQUEST_URL, {
            params: {
                key: MAPQUEST_API_KEY,
                location: address,
            }
        });

        console.log(geo_response)

        if (geo_response.data.info.statuscode != 0) {
            throw geo_response.data.info.messages
        }
        else {

            lat = geo_response.data.results[0].locations[0].latLng.lat;
            lng = geo_response.data.results[0].locations[0].latLng.lng;

            console.log({ lat, lng })

            darkSkyURL = DARKSKY_URL + DARKSKY_API_KEY + '/' + lat + ',' + lng

            console.log(darkSkyURL)

            weather_response = await axios.get(darkSkyURL, {
                params: { units: 'ca' }
            });
            console.log(weather_response.data.currently.temperature)
            console.log(weather_response.data.hourly.summary)

            return {
                temprature: weather_response.data.currently.temperature,
                summary: weather_response.data.hourly.summary
            }

        }



    } catch (error) {
        throw error
    }
}



module.exports.getWeather = getWeather


