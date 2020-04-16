import { getForecast } from '../api/weatherAPI';
import { updateTodayWeather, updateNextDaysWeather } from './updateData';
import { getCurrentUserSettings, saveCurrentUserSettings } from './cache';
import { getWeatherForNow, getWeatherForNextDays } from './functions';

const unitsHandler = (event) => {
   const { target } = event;
   const locationInfo = getCurrentUserSettings();
   const { location, units } = locationInfo;
   if (String(target.className).includes('temp-switcher__item_inactive')) {
      const { parentNode } = target;
      let newUnits = '';
      parentNode.childNodes.forEach((e) => {
         if (e.className.includes('temp-switcher__item_active')) {
            e.classList.remove('temp-switcher__item_active');
            e.classList.add('temp-switcher__item_inactive');
         }
      });
      target.classList.remove('temp-switcher__item_inactive');
      target.classList.add('temp-switcher__item_active');

      if (units === 'C') {
         newUnits = 'F';
      } else {
         newUnits = 'C';
      }
      locationInfo.units = newUnits;
      getForecast(location.coordinates, newUnits).then((weatherList) => {
         updateTodayWeather(getWeatherForNow(weatherList.list, location));
         updateNextDaysWeather(getWeatherForNextDays(weatherList.list));
      });
      saveCurrentUserSettings(locationInfo);
   }
};

const setUnitsListeners = () => {
   const unitsBlock = document.getElementById('temp-switcher');
   unitsBlock.childNodes.forEach((e) => {
      if (String(e.className).includes('switch-button__left')) {
         e.addEventListener('click', unitsHandler);
      } else {
         e.addEventListener('click', unitsHandler);
      }
   });
};

const se = null;

export { setUnitsListeners, se };
