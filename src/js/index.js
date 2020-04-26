import '../css/style.scss';
import { getCurrentUserSettings, getCurrentUserLocation } from '../utils/cache';
import { updateTime, checkUpdatesInWeather, updateAll } from '../utils/updateData';
import getForecast from '../api/weatherAPI';
import { newDay } from '../utils/date';
import App from '../utils/App';

App();

setInterval(() => {
   updateTime();
   if (newDay()) {
      const { units, lang } = getCurrentUserSettings();
      const location = getCurrentUserLocation();
      getForecast(location.coordinates, units, lang).then((weatherObj) => {
         updateAll(location, weatherObj.list, lang);
      });
   }
}, 1000 * 1);

setInterval(() => {
   const { units, lang } = getCurrentUserSettings();
   const location = getCurrentUserLocation();
   getForecast(location.coordinates, units, lang).then((weatherObj) => {
      checkUpdatesInWeather(weatherObj.list, location, units);
   });
}, 1000 * 120);
