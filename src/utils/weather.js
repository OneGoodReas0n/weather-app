import { getNearestTimeDateForTodaySearch, formatDateForSearch, getDayByNum } from './date';
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
import snowy1SVG from '../../assets/weather/snowy-1.svg';
import snowy2SVG from '../../assets/weather/snowy-2.svg';
import snowy3SVG from '../../assets/weather/snowy-3.svg';
import snowy4SVG from '../../assets/weather/snowy-4.svg';
import snowy5SVG from '../../assets/weather/snowy-5.svg';
import snowy6SVG from '../../assets/weather/snowy-6.svg';
import daySVG from '../../assets/weather/day.svg';
import nightSVG from '../../assets/weather/night.svg';
import thunderstormSVG from '../../assets/weather/thunder.svg';
import cloudySVG from '../../assets/weather/cloudy.svg';
import tornadoSVG from '../../assets/weather/tornado.svg';
import mistSVG from '../../assets/weather/mist.svg';

const defineWeatherIconFromDesc = (iconId) => {
   let weatherId = iconId;
   const types = [800, 801, 802, 803, 804, 521, 501, 500, 200, 600, 601, 602];
   if (!types.includes(iconId)) {
      if (Number(iconId).toString()[0] === 2) {
         weatherId = 200;
      }
      if (Number(iconId).toString()[0] === 3) {
         weatherId = 300;
      }
      if (Number(iconId).toString()[0] === 5) {
         weatherId = 501;
      }
      if (Number(iconId).toString()[0] === 6) {
         weatherId = 601;
      }
      if (Number(iconId).toString()[0] === 7) {
         weatherId = 701;
      }
   }
   return weatherId;
};

const getWeatherIconForDay = (desc) => {
   const weatherId = defineWeatherIconFromDesc(desc);
   let path = null;
   switch (weatherId) {
      case 800:
         path = daySVG;
         break;
      case 801:
         path = cloudyDay1SVG;
         break;
      case 802:
         path = cloudyDay2SVG;
         break;
      case 803:
         path = cloudyDay3SVG;
         break;
      case 804:
         path = cloudySVG;
         break;
      case 521:
         path = rainy3SVG;
         break;
      case 501:
         path = rainy2SVG;
         break;
      case 500:
         path = rainy1SVG;
         break;
      case 200:
         path = thunderstormSVG;
         break;
      case 600:
         path = snowy2SVG;
         break;
      case 601:
         path = snowy1SVG;
         break;
      case 602:
         path = snowy3SVG;
         break;
      case 701:
         path = mistSVG;
         break;
      case 781:
         path = tornadoSVG;
         break;
      default:
         break;
   }
   return path;
};

const getWeatherIconForNight = (desc) => {
   const weatherId = defineWeatherIconFromDesc(desc);
   let path;
   switch (weatherId) {
      case 800:
         path = nightSVG;
         break;
      case 801:
         path = cloudyNight1SVG;
         break;
      case 802:
         path = cloudyNight2SVG;
         break;
      case 803:
         path = cloudyNight3SVG;
         break;
      case 804:
         path = cloudySVG;
         break;
      case 521:
         path = rainy6SVG;
         break;
      case 501:
         path = rainy5SVG;
         break;
      case 500:
         path = rainy4SVG;
         break;
      case 200:
         path = thunderstormSVG;
         break;
      case 600:
         path = snowy4SVG;
         break;
      case 601:
         path = snowy5SVG;
         break;
      case 602:
         path = snowy6SVG;
         break;
      case 701:
         path = mistSVG;
         break;
      case 781:
         path = tornadoSVG;
         break;
      default:
         break;
   }
   return path;
};

/**
 * * Function for getting a path to icon depend on weather parameter
 * @param  {String} weather
 * @returns {String}
 */
const getIconByWeather = (weather) => {
   const time = new Date().getHours();
   if (time > 5 && time < 21) {
      return getWeatherIconForDay(weather);
   }
   return getWeatherIconForNight(weather);
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
   const weatherArr = [];
   list.forEach((e) => {
      const item = e;
      const weatherItem = {
         id: item.dt,
         temp: Math.round(item.main.temp),
         feelsLike: Math.round(item.main.feels_like),
         humidity: item.main.humidity,
         weatherIconId: item.weather[item.weather.length - 1].id,
         wind: Math.round(item.wind.speed),
         date: item.dt_txt,
         weather: item.weather[item.weather.length - 1].main,
         description: item.weather[item.weather.length - 1].description,
         units
      };
      weatherArr.push(weatherItem);
   });
   return {
      city: weatherData.city.name,
      country: weatherData.city.country,
      list: weatherArr
   };
};

const createLocationInfoObj = (city, country, coordinates) => {
   const result = { city, country, coordinates };
   return result;
};

export {
   hasWeatherForNextDays,
   getWeatherForNextDays,
   getWeatherForNow,
   getIconByWeather,
   weatherSerialize,
   createLocationInfoObj
};
