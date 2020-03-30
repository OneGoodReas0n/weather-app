/**
 * * Create a formatted string for viewing date in div element with class 'date-block'
 * @returns {string}
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
 * @param  {boolean} isToday
 * @returns {string}
 */
const formatDateForSearch = (date, isToday) => {
   const defaultTime = '12:00:00';
   return `${date.getFullYear()}-${
      date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
   }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} ${
      isToday
         ? `${date.getHours() < 9 ? `0${date.getHours()}` : date.getHours()}:00:00`
         : defaultTime
   }`;
};

/**
 * * Function for saving previous weather (check for updates in weather)
 * @param  {Object} weather
 */
const saveCurrentWeatherToCache = (weather) => {
   localStorage.setItem('currentWeather', JSON.stringify(weather));
};

/**
 * * Funtcion for getting previous weather to compare
 * @returns  {Object} weather
 */
const getCurrentWeatherFromCache = () => {
   return localStorage.getItem('currentWeather');
};

/**
 * * Formatting date for searching weather in certain periods of time
 * @param  {Date} date
 * @returns {string}
 */
const formatDateForTodaySearch = (date) => {
   const hourAndHalf = 60 * 90 * 1000;
   const startOfDay = new Date(date);
   startOfDay.setHours(0, 0, 0);
   let index = 0;
   for (let i = 1; i <= 23; i += 2) {
      index += 1;
      if (
         date.getTime() >= startOfDay.getTime() + hourAndHalf * i &&
         date.getTime() < startOfDay.getTime() + hourAndHalf * (i + 2)
      ) {
         date.setHours(3 * index, 0, 0);
      }
   }
   return formatDateForSearch(date, true);
};

/**
 * * Function for getting a path to icon depend on weather parameter
 * @param  {string} weather
 * @returns {string}
 */
const getIconByWeather = (weather) => {
   let path = '';
   const time = new Date().getHours();
   if (time > 6 && time < 21) {
      switch (weather) {
         case 'clear sky':
            path = `day.svg`;
            break;
         case 'few clouds':
            path = `cloudy-day-1.svg`;
            break;
         case 'scattered clouds':
            path = `cloudy-day-2.svg`;
            break;
         case 'broken clouds':
            path = `cloudy-day-3.svg`;
            break;
         case 'overcast clouds':
            path = `cloudy.svg`;
            break;
         case 'shower rain':
            path = `rainy-3.svg`;
            break;
         case 'rain':
            path = `rainy-2.svg`;
            break;
         case 'light rain':
            path = `rainy-1.svg`;
            break;
         case 'thunderstorm':
            path = `thunder.svg`;
            break;
         case 'light snow':
            path = `snowy-2.svg`;
            break;
         case 'snow':
            path = `snowy-3.svg`;
            break;
         case 'mist':
            path = `cloudy.svg`;
            break;
         default:
            console.log('No such value for icon!');
            break;
      }
   } else {
      switch (weather) {
         case 'clear sky':
            path = `night.svg`;
            break;
         case 'few clouds':
            path = `cloudy-night-1.svg`;
            break;
         case 'scattered clouds':
            path = `cloudy-night-2.svg`;
            break;
         case 'broken clouds':
            path = `cloudy-night-3.svg`;
            break;
         case 'overcast clouds':
            path = `cloudy.svg`;
            break;
         case 'shower rain':
            path = `rainy-6.svg`;
            break;
         case 'rain':
            path = `rainy-5.svg`;
            break;
         case 'light rain':
            path = `rainy-4.svg`;
            break;
         case 'thunderstorm':
            path = `thunder.svg`;
            break;
         case 'light snow':
            path = `snowy-4.svg`;
            break;
         case 'snow':
            path = `snowy-6.svg`;
            break;
         case 'mist':
            path = `cloudy.svg`;
            break;
         default:
            console.log('No such value for icon!');
            break;
      }
   }
   return `../../assets/weather/${path}`;
};

/**
 * * Function for getting a day of the week
 * @param  {number} numOfDay
 * @returns {string}
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
 * @param  {Date} date
 * @param  {Array} weatherList
 * @returns {Object} Weather object
 */
const getWeatherForNow = (date, weatherList) => {
   const weather = weatherList.find((e) => e.date === formatDateForTodaySearch(date));
   if (weather !== undefined || weather !== null) {
      saveCurrentWeatherToCache(weather);
      return weather;
   }
   return null;
};

/**
 * * Function to check if there is an information for next number of {days} in {weatherList}
 * @param  {Date} date
 * @param  {Array} weatherList
 * @param  {number} days
 * @returns {boolean}
 */
const hasWeatherForNextDays = (date, weatherList, days) => {
   const lastDate = new Date(date);
   lastDate.setDate(lastDate.getDate() + days);
   const lastDateText = formatDateForSearch(lastDate, false);
   if (weatherList.find((e) => e.date === lastDateText) !== undefined) {
      return true;
   }
   return false;
};

/**
 * * Funtion for preparing data for next {days} from {weatherList}
 * @param  {Date} date
 * @param  {Array} weatherList
 * @param  {number} numOfDays
 * @returns {Array}
 */
const getWeatherForNextDays = (date, weatherList, numOfDays) => {
   const preparedList = [];
   const now = new Date(date);
   for (let i = 1; i <= numOfDays; i += 1) {
      const nextDay = new Date(date);
      nextDay.setDate(now.getDate() + i);
      const day = getDayByNum(nextDay.getDay());
      const nextDayTxt = formatDateForSearch(nextDay, false);
      const weather = weatherList.find((e) => e.date === nextDayTxt);
      preparedList.push({ weather, day });
   }
   return preparedList;
};

/**
 * * Function for serializing data after api call
 * @param  {Object} weatherData
 * @returns {Array}
 */
const weatherSerialize = (weatherData) => {
   const { list } = weatherData;
   const weatherArr = [];
   for (let i = 0; i < list.length; i += 1) {
      const item = list[i];
      const weatherItem = {
         id: item.dt,
         temp: Math.round(item.main.temp),
         feels_like: Math.round(item.main.feels_like),
         humidity: item.main.humidity,
         weatherIcon: item.weather[0].main,
         wind: Math.round(item.wind.speed),
         date: item.dt_txt,
         weather: item.weather[item.weather.length - 1].main,
         description: item.weather[item.weather.length - 1].description
      };
      weatherArr.push(weatherItem);
   }
   return weatherArr;
};

/**
 * * Function for saving data in Local Storage
 * @param  {Array} weatherData
 * @param {string} units To define in what units data must be saved
 */
const safeWeatherToCache = (weatherArr, units) => {
   const now = new Date();
   const cachedData = {
      date: now.toString().slice(0, now.toString().indexOf('GMT')),
      list: weatherArr
   };
   localStorage.setItem(`weatherCache(${units === 'F' ? 'F' : 'C'})`, JSON.stringify(cachedData));
};

/**
 * * Function for getting data from Local Storage
 * @param  {sting} units To definde what kind of cache data user needs
 */
const getWeatherFromCache = (units) => {
   const weatherData = localStorage.getItem(`weatherCache(${units === 'F' ? 'F' : 'C'})`);
   if (weatherData !== undefined || weatherData !== null) {
      return JSON.parse(weatherData);
   }
   return null;
};

export {
   getFormattedDateForDateBlock,
   safeWeatherToCache,
   getWeatherFromCache,
   hasWeatherForNextDays,
   getWeatherForNextDays,
   formatDateForTodaySearch,
   getWeatherForNow,
   getIconByWeather,
   getCurrentWeatherFromCache,
   weatherSerialize
};
