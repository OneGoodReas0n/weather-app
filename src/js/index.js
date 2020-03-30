import { getWeatherFromCache, hasWeatherForNextDays, weatherSerialize } from '../utils/functions';
import { updateTime, checkUpdatesInWeather } from '../utils/updateData';
import '../css/style.scss';
import getLocation from '../api/geoAPI';
import getForecast from '../api/weatherAPI';
import createMap from '../api/mapAPI';
import { createDiv } from './template';
import TopWrapper from './components/TopWrapper';
import MainWrapper from './components/MainWrapper';

const makeTemplate = (container, location, weather) => {
   container.appendChild(TopWrapper());
   container.appendChild(MainWrapper(location, weather));
   const map = createMap(document.getElementById('map-canvas'));
   map.setCenter(
      String(location.loc)
         .split(',')
         .reverse()
   );
};

window.onload = () => {
   const { body } = document;
   const container = createDiv('container');
   getLocation().then((location) => {
      const { loc, city, region } = location;
      const locationInfo = { city, region, loc };
      if (
         getWeatherFromCache() !== null &&
         hasWeatherForNextDays(new Date(), getWeatherFromCache().list, 3)
      ) {
         const weatherCache = getWeatherFromCache();
         makeTemplate(container, locationInfo, weatherCache.list);
      } else {
         getForecast(city, region, 'C').then((weather) => {
            const weatherArray = weatherSerialize(weather);
            makeTemplate(container, location, weatherArray);
         });
      }
   });

   setInterval(() => {
      updateTime();
   }, 1000 * 10);

   setInterval(() => {
      checkUpdatesInWeather(getWeatherFromCache().list);
   }, 1000 * 120);

   body.appendChild(container);
};
