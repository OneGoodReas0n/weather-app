import { areObjectsEqual } from './functions';
import { getIconByWeather, getWeatherForNow, getWeatherForNextDays } from './weather';
import { getFormattedDateForDateBlock, newDay } from './date';

import {
   getCurrentWeatherFromCache,
   getCurrentUserSettings,
   saveCurrentUserLocation,
   getCurrentUserLocation,
   removeCurrentWeatherFromCache
} from './cache';

import { getMyLocationByPlace } from '../api/geocodingAPI';

import ruPhrases from '../localization/ru';
import enPhrases from '../localization/en';
import dePhrases from '../localization/de';

const createVocabular = (lang) => {
   switch (lang) {
      case 'RU':
         return ruPhrases;
      case 'EN':
         return enPhrases;
      case 'DE':
         return dePhrases;
      default:
         return null;
   }
};

const updateInputPlaceholders = (vocabular) => {
   const searchInput = document.getElementById('search_input');
   searchInput.setAttribute('placeholder', `${vocabular.hearder.searchInput.placeholder}`);

   const homeBtn = document.getElementById('home');
   homeBtn.setAttribute('title', `${vocabular.hearder.searchInput.home}`);

   const voiceBtn = document.getElementById('voice');
   voiceBtn.setAttribute('title', `${vocabular.hearder.searchInput.voiceSearch}`);
};

/**
 * * Function for updating time
 */
const updateTime = () => {
   const { lang } = getCurrentUserSettings();
   const dateBlock = document.getElementById('date');
   const span = dateBlock.childNodes.item(0);
   span.textContent = getFormattedDateForDateBlock(createVocabular(lang));
};

/**
 * * Function for getting element from list of Nodes by className
 * @param  {Array} list
 * @param  {string} name
 * @returns {Node}
 */
const getElemFromListByClassName = (list, name) => {
   let result = null;
   list.forEach((e) => {
      if (String(e.className).includes(name)) {
         result = e;
      }
   });
   return result;
};

const updateLocation = (vocabular) => {
   const userLocation = getCurrentUserLocation();
   const { lang } = getCurrentUserSettings();

   const locationDiv = document.getElementById('location');
   const coordinatesDiv = document.getElementById('coordinates');
   const locationSpan = getElemFromListByClassName(locationDiv.childNodes, 'location-date__text');
   const latitudeSpan = getElemFromListByClassName(coordinatesDiv.childNodes, 'map__latitude');
   const longitudeSpan = getElemFromListByClassName(coordinatesDiv.childNodes, 'map__longitude');

   getMyLocationByPlace(userLocation, lang)
      .then((data) => data.results)
      .then((result) => {
         const { lat, lng } = result[0].geometry.location;
         const [currentCity, currentCountry] = result[0].address_components.filter(
            (e) => e.types.includes('locality') || e.types.includes('country')
         );
         const city = currentCity.long_name;
         const country = currentCountry.long_name;
         locationSpan.textContent = `${city}, ${country}`;
         latitudeSpan.textContent = `${vocabular.location.latitude}: ${Number(lat).toFixed(4)}`;
         longitudeSpan.textContent = `${vocabular.location.longitude}: ${Number(lng).toFixed(4)}`;
      });
};

/**
 * * Funtion for updating today weather's fields
 * @param  {Array} weatherList
 */
const updateTodayWeather = (weather, vocabular) => {
   const TodayBlock = document.getElementById('today-forecast');
   const tempBlock = getElemFromListByClassName(
      TodayBlock.childNodes,
      'today-forecast__temperature'
   );
   const tempSpan = getElemFromListByClassName(tempBlock.childNodes, 'today-forecast__value');
   const degreeSpan = getElemFromListByClassName(tempBlock.childNodes, 'today-forecast__degree');
   degreeSpan.textContent = `°${weather.units}`;
   tempSpan.textContent = weather.temp;

   const forecastBlock = getElemFromListByClassName(
      TodayBlock.childNodes,
      'today-forecast__weather'
   );
   const forecastIcon = getElemFromListByClassName(
      forecastBlock.childNodes,
      'today-forecast__image'
   );
   forecastIcon.src = getIconByWeather(weather.weatherIconId);

   const forecastInfo = getElemFromListByClassName(
      forecastBlock.childNodes,
      'today-forecast__details'
   );
   const infoTitle = getElemFromListByClassName(forecastInfo.childNodes, 'today-forecast__desc');
   infoTitle.textContent = `${weather.description}`;
   const infoFeel = getElemFromListByClassName(forecastInfo.childNodes, 'today-forecast__feel');
   infoFeel.textContent = `${vocabular.forecast.feelsLike}: ${weather.feelsLike}°${weather.units}`;
   const infoWind = getElemFromListByClassName(forecastInfo.childNodes, 'today-forecast__wind');
   infoWind.textContent = `${vocabular.forecast.wind}: ${weather.wind} m/s`;
   const infoHumid = getElemFromListByClassName(
      forecastInfo.childNodes,
      'today-forecast__humidity'
   );
   infoHumid.textContent = `${vocabular.forecast.humidity}: ${weather.humidity} %`;
};

/**
 * * Funtion for updating future days weather's fields
 * @param  {Array} list
 */
const updateNextDaysWeather = (list, vocabular) => {
   const NextForecast = document.getElementById('next-forecast');
   let index = 0;
   const forecastList = getElemFromListByClassName(NextForecast.childNodes, 'next-forecast__list');
   forecastList.childNodes.forEach((e) => {
      const dayTitle = getElemFromListByClassName(e.childNodes, 'next-forecast__title');
      dayTitle.textContent = vocabular.dayOfWeek[String(list[index].day).toLowerCase()];

      const dayForecastBlock = getElemFromListByClassName(e.childNodes, 'next-forecast__body');
      const forecastBlock = getElemFromListByClassName(
         dayForecastBlock.childNodes,
         'next-forecast__bar'
      );
      const forecastValue = getElemFromListByClassName(
         forecastBlock.childNodes,
         'next-forecast__value'
      );
      forecastValue.textContent = `${list[index].weather.temp}`;
      const forecastUnit = getElemFromListByClassName(
         forecastBlock.childNodes,
         'next-forecast__units'
      );
      forecastUnit.textContent = `°${list[index].weather.units}`;
      const forecastIcon = getElemFromListByClassName(
         dayForecastBlock.childNodes,
         'next-forecast__icon'
      );
      forecastIcon.src = getIconByWeather(list[index].weather.weatherIconId);
      index += 1;
   });
};

/**
 * * Function for checking if weather has been updated
 * @param  {Array} weatherArray
 * @param  {Object} location
 * @param  {String} units
 */
const checkUpdatesInWeather = (weatherArray, location, units) => {
   const previousWeather = getCurrentWeatherFromCache(location, units);
   const weatherNow = getWeatherForNow(weatherArray, location);
   if (!areObjectsEqual(weatherNow, previousWeather)) {
      updateTodayWeather(weatherNow);
   }

   if (new Date(weatherNow.date).getHours() === 0) {
      updateNextDaysWeather(getWeatherForNextDays(weatherArray));
   }
};

const updateAll = (locationInfo, weatherList, lang) => {
   const prevLocation = getCurrentUserLocation();
   removeCurrentWeatherFromCache(prevLocation);
   saveCurrentUserLocation(locationInfo);
   updateTime();
   const vocabular = createVocabular(lang);
   updateInputPlaceholders(vocabular);
   updateLocation(vocabular);
   const weatherNow = getWeatherForNow(weatherList, locationInfo);
   updateTodayWeather(weatherNow, vocabular);
   const weatherForNextDays = getWeatherForNextDays(weatherList);
   updateNextDaysWeather(weatherForNextDays, vocabular);
};

export {
   updateTime,
   updateTodayWeather,
   updateNextDaysWeather,
   checkUpdatesInWeather,
   updateAll,
   createVocabular
};
