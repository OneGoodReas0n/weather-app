import {
   getFormattedDateForDateBlock,
   getIconByWeather,
   getCurrentWeatherFromCache,
   getWeatherForNow,
   getWeatherForNextDays
} from './functions';

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
   for (let i = 0; i < list.length; i += 1) {
      if (String(list[i].className).indexOf(name) !== -1) {
         return list[i];
      }
   }
   return null;
};

/**
 * * Funtion for updating today weather's fields
 * @param  {Array} weatherList
 */
const updateTodayWeather = (weather) => {
   const TodayBlock = document.getElementById('today-block');
   const tempBlock = getElemFromListByClassName(TodayBlock.childNodes, 'temperature-bar');
   const tempSpan = getElemFromListByClassName(tempBlock.childNodes, 'temperature-bar__value');
   tempSpan.textContent = weather.temp;

   const forecastBlock = getElemFromListByClassName(TodayBlock.childNodes, 'forecast-bar');
   const forecastIcon = getElemFromListByClassName(forecastBlock.childNodes, 'forecast-bar__icon');
   forecastIcon.src = getIconByWeather(weather.description);

   const forecastInfo = getElemFromListByClassName(forecastBlock.childNodes, 'forecast-info');
   const infoFeel = getElemFromListByClassName(forecastInfo.childNodes, 'forecast-info__feel');
   infoFeel.textContent = `Feels like: ${weather.feels_like}°`;
   const infoWind = getElemFromListByClassName(forecastInfo.childNodes, 'forecast-info__wind');
   infoWind.textContent = `Wind: ${weather.wind} m/s`;
   const infoHumid = getElemFromListByClassName(forecastInfo.childNodes, 'forecast-info__humidity');
   infoHumid.textContent = `Humidity: ${weather.humidity} %`;
};

/**
 * * Funtion for updating future days weather's fields
 * @param  {Array} list
 */
const updateNextDaysWeather = (list) => {
   console.log(list);
   const PreviewBlock = document.getElementById('preview-block');
   let index = 0;
   PreviewBlock.childNodes.forEach((e) => {
      const dayTitle = getElemFromListByClassName(e.childNodes, 'day-title');
      dayTitle.textContent = list[index].day;

      const dayForecastBlock = getElemFromListByClassName(e.childNodes, 'day-forecast');
      const forecastValue = getElemFromListByClassName(
         dayForecastBlock.childNodes,
         'day-forecast__value'
      );
      forecastValue.textContent = `${list[index].weather.temp}°`;
      const forecastIcon = getElemFromListByClassName(
         dayForecastBlock.childNodes,
         'day-forecast__icon'
      );
      forecastIcon.src = getIconByWeather(list[index].weather.description);
      index += 1;
   });
};

const checkUpdatesInWeather = (weatherArray) => {
   const date = new Date();
   const weatherNow = getWeatherForNow(date, weatherArray);
   const previousWeather = getCurrentWeatherFromCache();
   if (weatherNow.id !== previousWeather.id) {
      updateTodayWeather(weatherNow);
   }

   if (new Date(weatherNow.date).getHours() === 0) {
      updateNextDaysWeather(getWeatherForNextDays(date, weatherArray, 3));
   }
};

export { updateTime, updateTodayWeather, updateNextDaysWeather, checkUpdatesInWeather };
