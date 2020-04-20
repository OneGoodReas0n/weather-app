import {
   getFormattedDateForDateBlock,
   getIconByWeather,
   getWeatherForNow,
   getWeatherForNextDays,
   areObjectsEqual
} from './functions';

import { getWeatherFromCache, getCurrentWeatherFromCache, saveCurrentUserSettings } from './cache';

/**
 * * Function for updating time
 */
const updateTime = () => {
   const dateBlock = document.getElementById('date');
   const span = dateBlock.childNodes.item(0);
   span.textContent = getFormattedDateForDateBlock();
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

const updateLocation = (location) => {
   const { city, country, coordinates } = location;
   const locationDiv = document.getElementById('location');
   const coordinatesDiv = document.getElementById('coordinates');
   const locationSpan = getElemFromListByClassName(locationDiv.childNodes, 'location-date__text');
   const latitudeSpan = getElemFromListByClassName(coordinatesDiv.childNodes, 'map__latitude');
   const longitudeSpan = getElemFromListByClassName(coordinatesDiv.childNodes, 'map__longitude');
   locationSpan.textContent = `${city}, ${country}`;
   latitudeSpan.textContent = `Latitude: ${Number(coordinates.lat).toFixed(4)}`;
   longitudeSpan.textContent = `Longitude: ${Number(coordinates.lng).toFixed(4)}`;
};

/**
 * * Funtion for updating today weather's fields
 * @param  {Array} weatherList
 */
const updateTodayWeather = (weather) => {
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
   infoFeel.textContent = `Feels like: ${weather.feelsLike}°${weather.units}`;
   const infoWind = getElemFromListByClassName(forecastInfo.childNodes, 'today-forecast__wind');
   infoWind.textContent = `Wind: ${weather.wind} m/s`;
   const infoHumid = getElemFromListByClassName(
      forecastInfo.childNodes,
      'today-forecast__humidity'
   );
   infoHumid.textContent = `Humidity: ${weather.humidity} %`;
};

/**
 * * Funtion for updating future days weather's fields
 * @param  {Array} list
 */
const updateNextDaysWeather = (list) => {
   const NextForecast = document.getElementById('next-forecast');
   let index = 0;
   const forecastList = getElemFromListByClassName(NextForecast.childNodes, 'next-forecast__list');
   forecastList.childNodes.forEach((e) => {
      const dayTitle = getElemFromListByClassName(e.childNodes, 'next-forecast__title');
      dayTitle.textContent = list[index].day;

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
      console.log(
         `${new Date()
            .toString()
            .slice(0, new Date().toString().indexOf('GMT'))} - Weather has been changed! `
      );
   }

   if (new Date(weatherNow.date).getHours() === 0) {
      updateNextDaysWeather(getWeatherForNextDays(weatherArray));
   }
};

const updateAll = (locationInfo, weatherList) => {
   const { location } = locationInfo;
   updateLocation(location);
   const weatherNow = getWeatherForNow(weatherList, location);
   updateTodayWeather(weatherNow);
   const weatherForNextDays = getWeatherForNextDays(weatherList);
   updateNextDaysWeather(weatherForNextDays);
   saveCurrentUserSettings(locationInfo);
};

export { updateTime, updateTodayWeather, updateNextDaysWeather, checkUpdatesInWeather, updateAll };
