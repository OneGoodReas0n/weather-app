import tockens from '../keys/tockens';
import { weatherSerialize } from '../utils/functions';

const getForecast = async (coordinates, units, lang) => {
   const { lat, lng } = coordinates;
   const path = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=${
      units === 'C' ? 'metric' : 'imperial'
   }&appid=${tockens.WEATHER_TOCKEN}&lang=${lang}`;

   const response = await fetch(path);
   const weather = await response.json();
   const serializedArr = weatherSerialize(weather, units);
   return serializedArr;
};

export { getForecast };
