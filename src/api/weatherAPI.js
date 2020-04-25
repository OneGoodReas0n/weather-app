import tockens from '../keys/tockens';

/**
 * * Function for serializing data
 * @param  {Object} weatherData
 * @param  {String} units
 * @returns {Object}
 */
const getWeatherObjectFromResponse = (weatherData, units) => {
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

const getForecast = async (coordinates, units, lang) => {
   const { lat, lng } = coordinates;
   const path = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=${
      units === 'C' ? 'metric' : 'imperial'
   }&appid=${tockens.WEATHER_TOCKEN}&lang=${lang}`;

   const response = await fetch(path);
   const weather = await response.json();
   const weatherObj = getWeatherObjectFromResponse(weather, units);
   return weatherObj;
};

export default getForecast;
