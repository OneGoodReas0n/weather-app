import '../css/style.scss';
import {
   getCurrentUserLocation,
   getUnitsFromCacheOrDefault,
   getLangFromCahceOrDefault
} from '../utils/cache';
import { updateTime, checkUpdatesInWeather, updateAll } from '../utils/updateData';
import getForecast from '../api/weatherAPI';
import { newDay } from '../utils/date';
import { handleLoading } from '../utils/handlers';
import App from '../utils/App';

App();

setInterval(() => {
   updateTime();
   if (newDay()) {
      const units = getUnitsFromCacheOrDefault();
      const lang = getLangFromCahceOrDefault();
      const location = getCurrentUserLocation();
      getForecast(location.coordinates, units, lang).then((weatherObj) => {
         updateAll(location, weatherObj.list, lang);
      });
   }
}, 1000 * 1);

setInterval(() => {
   const lang = getLangFromCahceOrDefault();
   const units = getUnitsFromCacheOrDefault();
   const location = getCurrentUserLocation();
   getForecast(location.coordinates, units, lang).then((weatherObj) => {
      checkUpdatesInWeather(weatherObj.list, location, units, handleLoading);
   });
}, 1000 * 120);
