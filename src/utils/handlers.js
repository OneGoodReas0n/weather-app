import getForecast from '../api/weatherAPI';
import { updateAll, updateBackground } from './updateData';
import {
   saveCurrentUserSettings,
   getHomeLocationFromCache,
   getCurrentUserLocation,
   getLangFromCahceOrDefault,
   getUnitsFromCacheOrDefault
} from './cache';
import { areObjectsEqual, swapOptions } from './functions';
import { createLocationInfoObj } from './weather';
import { createAndSetOptionsWithHandler, createDiv, createImg, createSpan } from '../js/template';
import { getMyLocationByCoordinates } from '../api/geocodingAPI';
import MapApi from '../api/mapAPI';
import sunSVG from '../../assets/sun_icon.svg';
import cloudSVG from '../../assets/cloud_icon.svg';
import getVocabular from './vocabular';

const loadingScreen = () => {
   const lang = getLangFromCahceOrDefault();
   const vocabular = getVocabular(lang);
   const loadingDiv = createDiv('loading');
   const loadingBody = createDiv('loading__body');
   const animationDiv = createDiv('loading__animation');
   const sunImg = createImg(sunSVG, 'animation__item', 'animation__sun');
   const cloudImg = createImg(cloudSVG, 'animation__item', 'animation__cloud');
   animationDiv.appendChild(sunImg);
   animationDiv.appendChild(cloudImg);
   const textDiv = createDiv('loading__text');
   const span = createSpan(`${vocabular.loading}`, 'text__item');
   textDiv.appendChild(span);
   loadingBody.appendChild(animationDiv);
   loadingBody.appendChild(textDiv);
   loadingDiv.appendChild(loadingBody);
   return loadingDiv;
};

const handleLoading = () => {
   const { body } = document;
   body.appendChild(loadingScreen());
};

const unitsHandler = (event) => {
   const { target } = event;
   const locationInfo = getCurrentUserLocation();
   const { coordinates } = locationInfo;
   const lang = getLangFromCahceOrDefault();
   const units = getUnitsFromCacheOrDefault();
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
   const lang = getLangFromCahceOrDefault();
   const units = getUnitsFromCacheOrDefault();
   const currentLocation = getCurrentUserLocation();
   if (!areObjectsEqual(currentLocation.coordinates, coordinates)) {
      handleLoading();
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
               updateBackground(weatherObj);
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
   const units = getUnitsFromCacheOrDefault();
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

const speechRecognition = () => {
   if (!('webkitSpeechRecognition' in window)) {
      upgrade();
   } else {
      const searchInput = document.getElementById('search_input');
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (event) => {
         var interim_transcript = '';
         var final_transcript = '';

         for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
               final_transcript += event.results[i][0].transcript;
            } else {
               interim_transcript += event.results[i][0].transcript;
            }
         }
         searchInput.value = capitalize(final_transcript);
      };

      recognition.onspeechend = () => {
         setTimeout(() => {
            searchInput.focus();
         }, 100);
      };

      const startRecognition = () => {
         searchInput.value = '';
         recognition.start();
         setTimeout(() => {
            recognition.stop();
         }, 2500);
      };

      const capitalize = (text) => {
         return String(text).slice(0, 1).toUpperCase() + String(text).slice(1);
      };

      const button = document.getElementById('voice');
      button.addEventListener('click', startRecognition);
   }
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

   speechRecognition();
};

export { setHandlers, toggleDropdown, handleLoading };
