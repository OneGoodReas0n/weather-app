import { saveCurrentWeatherToCache } from './cache';
import cloudyDay1SVG from '../../assets/weather/cloudy-day-1.svg';
import cloudyDay2SVG from '../../assets/weather/cloudy-day-2.svg';
import cloudyDay3SVG from '../../assets/weather/cloudy-day-3.svg';
import cloudyNight1SVG from '../../assets/weather/cloudy-night-1.svg';
import cloudyNight2SVG from '../../assets/weather/cloudy-night-2.svg';
import cloudyNight3SVG from '../../assets/weather/cloudy-night-3.svg';
import rainy1SVG from '../../assets/weather/rainy-1.svg';
import rainy2SVG from '../../assets/weather/rainy-2.svg';
import rainy3SVG from '../../assets/weather/rainy-3.svg';
import rainy4SVG from '../../assets/weather/rainy-4.svg';
import rainy5SVG from '../../assets/weather/rainy-5.svg';
import rainy6SVG from '../../assets/weather/rainy-6.svg';
import snowy2SVG from '../../assets/weather/snowy-2.svg';
import snowy3SVG from '../../assets/weather/snowy-3.svg';
import snowy4SVG from '../../assets/weather/snowy-4.svg';
import snowy6SVG from '../../assets/weather/snowy-6.svg';
import daySVG from '../../assets/weather/day.svg';
import nightSVG from '../../assets/weather/night.svg';
import thunderstormSVG from '../../assets/weather/thunder.svg';
import cloudySVG from '../../assets/weather/cloudy.svg';
import countries from '../localization/countries';

/**
 * * Create a formatted string for viewing date in div element with class 'date-block'
 * @returns {String}
 */
const getFormattedDateForDateBlock = () => {
   const date = new Date();
   return date
      .toString()
      .slice(0, date.toString().indexOf('GMT'))
      .slice(0, date.toString().lastIndexOf(':'));
};
/**
 * * Formatting date for searching weather
 * @param  {Date} date
 * @param  {Boolean} isToday
 * @returns {String}
 */
const formatDateForSearch = (date, isToday) => {
   const defaultTime = '12:00:00';
   return `${date.getFullYear()}-${
      date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
   }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} ${
      isToday
         ? `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:00:00`
         : defaultTime
   }`;
};

/**
 * * Formatting date for searching weather in certain periods of time
 * @param  {Date} date
 * @returns {String}
 */
const getNearestTimeDateForTodaySearch = (date) => {
   const HOUR_AND_HALF = 60 * 90 * 1000;
   const startOfDay = new Date(date);
   startOfDay.setHours(0, 0, 0);
   let index = 0;
   for (let i = 1; i <= 23; i += 2) {
      index += 1;
      if (
         date.getTime() >= startOfDay.getTime() + HOUR_AND_HALF * i &&
         date.getTime() < startOfDay.getTime() + HOUR_AND_HALF * (i + 2)
      ) {
         date.setHours(3 * index, 0, 0);
      }
   }
   return formatDateForSearch(date, true);
};

/**
 * * Function for getting a path to icon depend on weather parameter
 * @param  {String} weather
 * @returns {String}
 */
const getIconByWeather = (weather) => {
   let path = '';
   const time = new Date().getHours();
   if (time > 6 && time < 21) {
      switch (weather) {
         case 'clear sky':
            path = daySVG;
            break;
         case 'few clouds':
            path = cloudyDay1SVG;
            break;
         case 'scattered clouds':
            path = cloudyDay2SVG;
            break;
         case 'broken clouds':
            path = cloudyDay3SVG;
            break;
         case 'overcast clouds':
            path = cloudySVG;
            break;
         case 'shower rain':
            path = rainy3SVG;
            break;
         case 'rain':
            path = rainy2SVG;
            break;
         case 'light rain':
            path = rainy1SVG;
            break;
         case 'thunderstorm':
            path = thunderstormSVG;
            break;
         case 'light snow':
            path = snowy2SVG;
            break;
         case 'snow':
            path = snowy3SVG;
            break;
         case 'mist':
            path = cloudySVG;
            break;
         default:
            // console.log('No such value for icon!');
            break;
      }
   } else {
      switch (weather) {
         case 'clear sky':
            path = nightSVG;
            break;
         case 'few clouds':
            path = cloudyNight1SVG;
            break;
         case 'scattered clouds':
            path = cloudyNight2SVG;
            break;
         case 'broken clouds':
            path = cloudyNight3SVG;
            break;
         case 'overcast clouds':
            path = cloudySVG;
            break;
         case 'shower rain':
            path = rainy6SVG;
            break;
         case 'rain':
            path = rainy5SVG;
            break;
         case 'light rain':
            path = rainy4SVG;
            break;
         case 'thunderstorm':
            path = thunderstormSVG;
            break;
         case 'light snow':
            path = snowy4SVG;
            break;
         case 'snow':
            path = snowy6SVG;
            break;
         case 'mist':
            path = cloudySVG;
            break;
         default:
            // console.log('No such value for icon!');
            break;
      }
   }
   return `${path}`;
};

/**
 * * Function for getting a day of the week
 * @param  {Number} numOfDay
 * @returns {String}
 */
const getDayByNum = (numOfDay) => {
   switch (numOfDay) {
      case 0:
         return 'Sunday';
      case 1:
         return 'Monday';
      case 2:
         return 'Tuesday';
      case 3:
         return 'Wednesday';
      case 4:
         return 'Thursday';
      case 5:
         return 'Friday';
      case 6:
         return 'Saturday';
      default:
         return null;
   }
};

/**
 * * Function for preparing data for TodayBlock
 * @param  {Array} weatherList
 * @param  {Object} location
 * @returns {Object}
 */
const getWeatherForNow = (weatherList, location) => {
   const weatherForNow = weatherList.find(
      (e) => e.date === getNearestTimeDateForTodaySearch(new Date())
   );
   if (weatherForNow !== undefined && weatherForNow !== null) {
      saveCurrentWeatherToCache(weatherForNow, location);
      return weatherForNow;
   }
   return null;
};

/**
 * * Function to check if there is an information for next 3 days
 * @param  {Array} weatherList
 * @returns {Boolean}
 */
const hasWeatherForNextDays = (weatherData) => {
   const weatherList = weatherData.list;
   const lastDate = new Date();
   lastDate.setDate(lastDate.getDate() + 3);
   const lastDateText = formatDateForSearch(lastDate, false);
   if (
      weatherList !== null &&
      weatherList !== undefined &&
      weatherList.find((e) => e.date === lastDateText) !== undefined
   ) {
      return true;
   }
   return false;
};

/**
 * * Funtion for preparing data for next 3 days
 * @param  {Array} weatherList
 * @param  {Number} numOfDays
 * @returns {Array}
 */
const getWeatherForNextDays = (weatherList) => {
   const preparedList = [];
   const now = new Date();
   for (let i = 1; i <= 3; i += 1) {
      const nextDay = new Date(now);
      nextDay.setDate(now.getDate() + i);
      const day = getDayByNum(nextDay.getDay());
      const nextDayTxt = formatDateForSearch(nextDay, false);
      const weather = weatherList.find((e) => e.date === nextDayTxt);
      preparedList.push({ weather, day });
   }
   return preparedList;
};

/**
 * * Function for serializing data
 * @param  {Object} weatherData
 * @param  {String} units
 * @returns {Object}
 */
const weatherSerialize = (weatherData, units) => {
   const { list } = weatherData;
   const now = new Date();
   const weatherArr = [];
   for (let i = 0; i < list.length; i += 1) {
      const item = list[i];
      const weatherItem = {
         id: item.dt,
         temp: Math.round(item.main.temp),
         feelsLike: Math.round(item.main.feels_like),
         humidity: item.main.humidity,
         weatherIcon: item.weather[0].main,
         wind: Math.round(item.wind.speed),
         date: item.dt_txt,
         weather: item.weather[item.weather.length - 1].main,
         description: item.weather[item.weather.length - 1].description,
         units
      };
      weatherArr.push(weatherItem);
   }
   return {
      city: weatherData.city.name,
      country: weatherData.city.country,
      list: weatherArr
   };
};
/**
 * * Assert two objects
 * @param  {Object} obj1
 * @param  {Object} obj2
 * @returns {Boolean}
 */
const areObjectsEqual = (obj1, obj2) => {
   const keysObj1 = Object.keys(obj1);
   const keysObj2 = Object.keys(obj2);

   if (keysObj1.length !== keysObj2.length) {
      return false;
   }

   for (let key of keysObj1) {
      if (obj1[key] !== obj2[key]) {
         console.log(obj1[key]);
         return false;
      }
   }
   return true;
};

const getCountryByISO = (iso) => {
   return countries.find((e) => e.alpha === iso).country;
};

const createLocationInfoObj = (city, country, coordinates, units) => {
   const result = { location: { city, country, coordinates }, units };
   return result;
};

export {
   getFormattedDateForDateBlock,
   hasWeatherForNextDays,
   getWeatherForNextDays,
   getNearestTimeDateForTodaySearch,
   getWeatherForNow,
   getIconByWeather,
   weatherSerialize,
   areObjectsEqual,
   getCountryByISO,
   createLocationInfoObj
};
