import getForecast from '../api/weatherAPI';
import { updateAll } from './updateData';
import {
   getCurrentUserSettings,
   saveCurrentUserSettings,
   getHomeLocationFromCache,
   getCurrentUserLocation
} from './cache';
import { areObjectsEqual, swapOptions } from './functions';
import { createLocationInfoObj } from './weather';
import { createAndSetOptionsWithHandler } from '../js/template';
import { getMyLocationByCoordinates } from '../api/geocodingAPI';
import MapApi from '../api/mapAPI';

const unitsHandler = (event) => {
   const { target } = event;
   const locationInfo = getCurrentUserLocation();
   const { coordinates } = locationInfo;
   const { units, lang } = getCurrentUserSettings();
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
      getForecast(coordinates, newUnits).then((weatherObj) => {
         updateAll(locationInfo, weatherObj.list, lang);
      });
      saveCurrentUserSettings(newUnits, lang);
   }
};

const homeHandler = () => {
   const { coordinates } = getHomeLocationFromCache();
   const { lang, units } = getCurrentUserSettings();
   const currentLocation = getCurrentUserLocation();
   if (!areObjectsEqual(currentLocation.coordinates, coordinates)) {
      const map = MapApi.getInstance();
      map.setCenter([coordinates.lng, coordinates.lat]);
      getMyLocationByCoordinates(coordinates, lang)
         .then((data) => data.results)
         .then((result) => {
            const cityCountryName = String(result[0].plus_code.compound_code).split(',');
            const [cityCode, country] = cityCountryName;
            const city = cityCode.split(' ')[1];
            const locationInfo = createLocationInfoObj(city, country, coordinates);

            getForecast(coordinates, units, lang).then((weatherObj) => {
               updateAll(locationInfo, weatherObj.list, lang);
            });
         });
   }
};

/*eslint-disable*/
const toggleDropdown = (event) => {
   const { target } = event;
   const value = target.textContent;
   const dropdownBlock = document.getElementById('dropdown');
   if (dropdownBlock.childNodes[0].textContent !== value) {
      changeLangState(value);
   }
};

const changeLangState = (newLang) => {
   const { units } = getCurrentUserSettings();
   const locationInfo = getCurrentUserLocation();
   const { coordinates } = locationInfo;
   const dropdownBlock = document.getElementById('dropdown-list');
   const options = [];
   dropdownBlock.childNodes.forEach((e) => {
      options.push(e.textContent);
   });
   dropdownBlock.innerHTML = '';
   const newList = swapOptions(newLang, options);
   createAndSetOptionsWithHandler(dropdownBlock, newList, toggleDropdown);
   saveCurrentUserSettings(units, newLang);
   getForecast(coordinates, units, newLang).then((weatherObj) => {
      updateAll(locationInfo, weatherObj.list, newLang);
   });
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
