import '../css/style.scss';
import {
   getCurrentUserSettings,
   saveCurrentUserSettings,
   removeCurrentWeatherFromCache,
   saveHomeLocationToCache
} from '../utils/cache';
import { createLocationInfoObj } from '../utils/functions';
import { updateTime, checkUpdatesInWeather, updateAll } from '../utils/updateData';
import { setHandlers } from '../utils/handlers';
import getLocation from '../api/geoAPI';
import { getForecast } from '../api/weatherAPI';
import MapApi from '../api/mapAPI';
import { createDiv } from './template';
import Header from './components/Header';
import Content from './components/Content';
import getMyLocation from '../api/geocodingAPI';

const { body } = document;
const container = createDiv('container');

container.appendChild(Header());
container.appendChild(Content());
body.appendChild(container);
setHandlers();

getLocation().then((locationData) => {
   const { loc } = locationData;
   const [lat, long] = loc.split(',');
   const coordinates = { lat, long };
   removeCurrentWeatherFromCache({ coordinates });
   let units = 'C';
   if (
      getCurrentUserSettings() !== undefined &&
      getCurrentUserSettings() !== null &&
      getCurrentUserSettings().units !== undefined
   ) {
      units = getCurrentUserSettings().units;
   }

   getForecast(coordinates, units).then((weatherObj) => {
      const map = new MapApi(document.getElementById('map-canvas'), coordinates);
      console.log(MapApi.getInstance());

      getMyLocation(coordinates)
         .then((data) => data.results)
         .then((result) => {
            const [city, country] = result[0].address_components.filter(
               (e) => e.types.includes('locality') || e.types.includes('country')
            );
            const locationInfo = createLocationInfoObj(
               city.long_name,
               country.long_name,
               coordinates,
               units
            );
            saveHomeLocationToCache(locationInfo);
            saveCurrentUserSettings(locationInfo);
            updateAll(locationInfo, weatherObj.list);
         });

      const autocomplete = new google.maps.places.Autocomplete(
         document.getElementById('search_input'),
         { types: ['(regions)'] }
      );
      autocomplete.setFields(['geometry', 'address_components']);

      autocomplete.addListener('place_changed', () => {
         if (
            autocomplete.getPlace().geometry !== null &&
            autocomplete.getPlace().geometry !== undefined
         ) {
            const { geometry, address_components } = autocomplete.getPlace();
            const placeLat = geometry.location.lat();
            const placeLong = geometry.location.lng();
            const [city, country] = address_components.filter(
               (e) => e.types.includes('locality') || e.types.includes('country')
            );
            const currentUnits = getCurrentUserSettings().units;
            const newCoordinates = { lat: placeLat, long: placeLong };
            const locationInfo = createLocationInfoObj(
               city.long_name,
               country.long_name,
               newCoordinates,
               units
            );
            getForecast(newCoordinates, currentUnits).then((weather) => {
               updateAll(locationInfo, weather.list);
               map.setCenter([placeLong, placeLat]);
            });
         }
      });
   });
});

setInterval(() => {
   updateTime();
}, 1000 * 10);

setInterval(() => {
   const { units, location } = getCurrentUserSettings();
   getForecast(location.coordinates, units).then((weatherObj) => {
      checkUpdatesInWeather(weatherObj.list, location, units);
   });
}, 1000 * 120);
