import tockens from '../keys/tockens';
import { safeWeatherToCache, weatherSerialize } from '../utils/functions';

const getForcast = async (city, state, units) => {
   const path = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state}&units=${
      units === 'C' ? 'metric' : 'imperial'
   }&appid=${tockens.weatherTOCKEN}`;

   const response = await fetch(path);
   const weather = await response.json();
   const serializedArr = weatherSerialize(weather);
   safeWeatherToCache(serializedArr, units);
   console.log('Weather API called !');
   return weather;
};

export default getForcast;
