import { getForecast } from '../api/weatherAPI';
import { updateTodayWeather, updateNextDaysWeather, updateAll, swapOptions } from './updateData';
import {
   getCurrentUserSettings,
   saveCurrentUserSettings,
   getHomeLocationFromCache,
   getCurrentUserLocation
} from './cache';
import {
   getWeatherForNow,
   getWeatherForNextDays,
   createLocationInfoObj,
   areObjectsEqual
} from './functions';
import { createAndSetOptions, createAndSetOptionsWithHandler } from '../js/template';
import { getMyLocationByCoordinates } from '../api/geocodingAPI';
import MapApi from '../api/mapAPI';

const unitsHandler = (event) => {
   const { target } = event;
   const locationInfo = getCurrentUserLocation();
   const { units, lang } = getCurrentUserSettings();
   const { location } = locationInfo;
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
      saveCurrentUserSettings(units, lang);
   }
};

const homeHandler = () => {
   const { location, units } = JSON.parse(getHomeLocationFromCache());
   const { coordinates } = location;
   const currentLocation = getCurrentUserLocation().location;
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

const changeLangState = (val) => {
   const userSettings = getCurrentUserSettings();
   const dropdownBlock = document.getElementById('dropdown-list');
   const options = [];
   dropdownBlock.childNodes.forEach((e) => {
      options.push(e.textContent);
   });
   dropdownBlock.innerHTML = '';
   const newList = swapOptions(val, options);
   createAndSetOptionsWithHandler(dropdownBlock, newList, toggleDropdown);
   saveCurrentUserSettings(userSettings.units, val);
};

const toggleDropdown = (event) => {
   const { target } = event;
   const value = target.textContent;
   const dropdownBlock = document.getElementById('dropdown');
   if (dropdownBlock.childNodes[0].textContent !== value) {
      changeLangState(value);
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

   const dropdown = document.getElementById('dropdown');
   dropdown.childNodes.forEach((e) => {
      e.addEventListener('click', toggleDropdown);
   });
};

export { setHandlers, toggleDropdown };
