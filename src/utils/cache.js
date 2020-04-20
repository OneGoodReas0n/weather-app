/**
 * * Function for saving previous weather (check for updates in weather)
 * @param  {Object} weather
 */
const saveCurrentWeatherToCache = (weather, location) => {
   const { lat, long } = location.coordinates;
   localStorage.setItem(`currentWeather(lat:${lat}, long:${long})`, JSON.stringify(weather));
};

/**
 * * Function for getting previous weather (check for updates in weather)
 * @param {Object} location
 * @returns  {Object}
 */
const getCurrentWeatherFromCache = (location) => {
   const { lat, long } = location.coordinates;
   return JSON.parse(localStorage.getItem(`currentWeather(lat:${lat}, long:${long})`));
};

const removeCurrentWeatherFromCache = (location) => {
   const { lat, long } = location.coordinates;
   localStorage.removeItem(`currentWeather(lat:${lat}, long:${long})`);
};

/**
 * * Function for saving settings of user
 * @param  {Object} location
 * @param  {string} units
 */
const saveCurrentUserSettings = (locationInfo, lang) => {
   const { location, units } = locationInfo;
   localStorage.setItem('currentUserSettings', JSON.stringify({ location, units, lang }));
};

/**
 * * Funtcion for getting previous weather to compare
 * @returns  {Object} weather
 */
const getCurrentUserSettings = () => {
   return JSON.parse(localStorage.getItem('currentUserSettings'));
};

/**
 * * Function for saving data in Local Storage
 * @param  {Object} weatherData
 * @param  {Object} location
 * @param {string} units To define in what units data must be saved
 */
const saveWeatherToCache = (weatherData, location, units) => {
   const { city, country } = location;
   localStorage.setItem(
      `weatherCache(${city},${String(country).toLowerCase()},${units})`,
      JSON.stringify(weatherData)
   );
};

/**
 * * Function for getting data from Local Storage
 * @param  {sting} units
 */
const getWeatherFromCache = (location, units) => {
   const { city, country } = location;
   const weatherData = localStorage.getItem(
      `currentWeather(${city},${String(country).toLowerCase()},${units === 'F' ? 'F' : 'C'})`
   );
   if (weatherData !== undefined && weatherData !== null) {
      return JSON.parse(weatherData);
   }
   return null;
};

const saveHomeLocationToCache = (location) => {
   localStorage.setItem('HOME_LOCATION', JSON.stringify(location));
};

const getHomeLocationFromCache = () => {
   return localStorage.getItem('HOME_LOCATION');
};

export {
   getCurrentUserSettings,
   getWeatherFromCache,
   saveCurrentUserSettings,
   saveWeatherToCache,
   saveCurrentWeatherToCache,
   getCurrentWeatherFromCache,
   removeCurrentWeatherFromCache,
   saveHomeLocationToCache,
   getHomeLocationFromCache
};
