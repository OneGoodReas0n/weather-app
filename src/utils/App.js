import { getMyLocationByPlace } from '../api/geocodingAPI';
import { createLocationInfoObj, getWeatherForNow } from './weather';
import { updateBackground, updateAll } from './updateData';
import { handleLoading, setHandlers } from './handlers';
import {
   removeCurrentWeatherFromCache,
   saveCurrentUserLocation,
   saveCurrentUserSettings,
   saveHomeLocationToCache,
   getLangFromCahceOrDefault,
   getUnitsFromCacheOrDefault
} from './cache';
import geoAPI from '../api/geoAPI';
import getForecast from '../api/weatherAPI';
import MapApi from '../api/mapAPI';
import { createDiv } from '../js/template';
import Container from '../js/components/Container';

const makeTemplate = () => {
   const { body } = document;
   const background = createDiv('#background', 'background');
   background.appendChild(Container());
   body.appendChild(background);
};

const initializeAutocomplete = (map) => {
   const searchInput = document.getElementById('search_input');
   const options = { types: ['(regions)'] };
   setTimeout(() => {
      const autocomplete = new google.maps.places.Autocomplete(searchInput, options);
      autocomplete.setFields(['geometry', 'address_components']);

      autocomplete.addListener('place_changed', () => {
         if (
            autocomplete.getPlace().geometry !== null &&
            autocomplete.getPlace().geometry !== undefined
         ) {
            handleLoading();
            const place = autocomplete.getPlace();
            const { geometry } = place;
            const adressComponents = place.address_components;
            const placeLat = geometry.location.lat();
            const placeLong = geometry.location.lng();
            const [curCity, curCountry] = adressComponents.filter(
               (e) => e.types.includes('locality') || e.types.includes('country')
            );
            const newCoordinates = { lat: placeLat, lng: placeLong };
            const lang = getLangFromCahceOrDefault();
            const units = getUnitsFromCacheOrDefault();
            const locationInfo = createLocationInfoObj(
               curCity.long_name,
               curCountry.long_name,
               newCoordinates,
               units
            );
            getForecast(newCoordinates, units, lang).then((weatherObj) => {
               updateBackground(getWeatherForNow(weatherObj.list, locationInfo));
               updateAll(locationInfo, weatherObj.list, lang);
               map.setCenter([placeLong, placeLat]);
            });
         }
      });
   }, 0);
};

const getMap = () => {
   return MapApi.getInstance();
};

const init = () => {
   makeTemplate();
   setHandlers();
   handleLoading();
   const map = getMap();
   geoAPI().then((locationData) => {
      const { city, country } = locationData;
      const lang = getLangFromCahceOrDefault();
      const units = getUnitsFromCacheOrDefault();

      getMyLocationByPlace({ city, country }, lang)
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
               coordinates
            );
            map.setCenter([lng, lat]);
            removeCurrentWeatherFromCache({ coordinates });
            saveHomeLocationToCache(locationInfo);
            saveCurrentUserSettings(units, lang);
            saveCurrentUserLocation(locationInfo);
            getForecast(coordinates, units, lang).then((weatherObj) => {
               updateBackground(getWeatherForNow(weatherObj.list, locationInfo));
               updateAll(locationInfo, weatherObj.list, lang);
            });
         });
   });
   initializeAutocomplete(map);
};

export default init;
