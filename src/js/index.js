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
import { getMyLocationByPlace } from '../api/geocodingAPI';

const { body } = document;
const container = createDiv('container');

container.appendChild(Header());
container.appendChild(Content());
body.appendChild(container);
setHandlers();
const map = MapApi.getInstance();

getLocation().then((locationData) => {
   const { city, region } = locationData;
   let units = 'C';
   if (
      getCurrentUserSettings() !== undefined &&
      getCurrentUserSettings() !== null &&
      getCurrentUserSettings().units !== undefined
   ) {
      units = getCurrentUserSettings().units;
   }

   getMyLocationByPlace({ city, region }, 'ru')
      .then((data) => data.results)
      .then((result) => {
         const { lat, lng } = result[0].geometry.location;
         const [currentCity, currentCountry] = result[0].address_components.filter(
            (e) => e.types.includes('locality') || e.types.includes('country')
         );
         const coordinates = { lat, lng };
         const locationInfo = createLocationInfoObj(
            currentCity.long_name,
            currentCountry.long_name,
            coordinates,
            units
         );
         map.setCenter([lng, lat]);
         removeCurrentWeatherFromCache({ coordinates });
         saveHomeLocationToCache(locationInfo);
         saveCurrentUserSettings(locationInfo);
         getForecast(coordinates, units).then((weatherObj) => {
            updateAll(locationInfo, weatherObj.list);
         });
      });

   const searchInput = document.getElementById('search_input');
   const options = { types: ['(regions)'] };

   const autocomplete = new google.maps.places.Autocomplete(searchInput, options);
   autocomplete.setFields(['geometry', 'address_components']);

   autocomplete.addListener('place_changed', () => {
      if (
         autocomplete.getPlace().geometry !== null &&
         autocomplete.getPlace().geometry !== undefined
      ) {
         const { geometry, address_components } = autocomplete.getPlace();
         console.log(address_components);
         const placeLat = geometry.location.lat();
         const placeLong = geometry.location.lng();
         const [curCity, curCountry] = address_components.filter(
            (e) => e.types.includes('locality') || e.types.includes('country')
         );
         const currentUnits = getCurrentUserSettings().units;
         const newCoordinates = { lat: placeLat, lng: placeLong };
         const locationInfo = createLocationInfoObj(
            curCity.long_name,
            curCountry.long_name,
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

setInterval(() => {
   updateTime();
}, 1000 * 10);

setInterval(() => {
   const { units, location } = getCurrentUserSettings();
   getForecast(location.coordinates, units).then((weatherObj) => {
      checkUpdatesInWeather(weatherObj.list, location, units);
   });
}, 1000 * 120);
