import tockens from '../keys/tockens';

const getForcast = async (city, state) => {
   const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state}&appid=${tockens.weatherTOCKEN}`
   );
   const data = await response.json();

   return data;
};

export default getForcast;
