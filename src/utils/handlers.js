import { getForecast } from '../api/weatherAPI';
import { updateTodayWeather, updateNextDaysWeather, updateAll } from './updateData';
import { getCurrentUserSettings, saveCurrentUserSettings, getHomeLocationFromCache } from './cache';
import {
   getWeatherForNow,
   getWeatherForNextDays,
   createLocationInfoObj,
   areObjectsEqual
} from './functions';
import { getMyLocationByCoordinates } from '../api/geocodingAPI';
import MapApi from '../api/mapAPI';

const unitsHandler = (event) => {
   const { target } = event;
   const locationInfo = getCurrentUserSettings();
   const { location, units } = locationInfo;
   if (String(target.className).includes('switcher__item_inactive')) {
      const { parentNode } = target;
      let newUnits = '';
      parentNode.childNodes.forEach((e) => {
         if (e.className.includes('switcher__item_active')) {
            e.classList.remove('switcher__item_active');
            e.classList.add('switcher__item_inactive');
         }
      });
      target.classList.remove('switcher__item_inactive');
      target.classList.add('switcher__item_active');

      if (units === 'C') {
         newUnits = 'F';
      } else {
         newUnits = 'C';
      }
      locationInfo.units = newUnits;
      getForecast(location.coordinates, newUnits).then((weatherList) => {
         updateTodayWeather(getWeatherForNow(weatherList.list, location));
         updateNextDaysWeather(getWeatherForNextDays(weatherList.list));
      });
      saveCurrentUserSettings(locationInfo);
   }
};

const homeHandler = () => {
   const { location, units } = JSON.parse(getHomeLocationFromCache());
   const { coordinates } = location;
   const userSettings = getCurrentUserSettings();
   const currentLocation = userSettings.location;
   if (!areObjectsEqual(currentLocation.coordinates, coordinates)) {
      const map = MapApi.getInstance();
      map.setCenter([coordinates.lng, coordinates.lat]);
      getMyLocationByCoordinates(coordinates, 'ru')
         .then((data) => data.results)
         .then((result) => {
            const cityCountryName = String(result[0].plus_code.compound_code).split(',');
            const [cityCode, country] = cityCountryName;
            const city = cityCode.split(' ')[1];
            const locationInfo = createLocationInfoObj(city, country, coordinates, units);

            getForecast(coordinates, units).then((weatherObj) => {
               updateAll(locationInfo, weatherObj.list);
            });
         });
   }
};

const clearField = (event) => {
   const { target } = event;
   target.value = '';
};

const setHandlers = () => {
   const unitsBlock = document.getElementById('temp-switcher');
   unitsBlock.childNodes.forEach((e) => {
      if (String(e.className).includes('switcher__item_left')) {
         e.addEventListener('click', unitsHandler);
      } else {
         e.addEventListener('click', unitsHandler);
      }
   });

   const homeBtn = document.getElementById('home');
   homeBtn.addEventListener('click', homeHandler);

   const searchInput = document.getElementById('search_input');
   searchInput.addEventListener('focusout', clearField);
};

export { setHandlers };
