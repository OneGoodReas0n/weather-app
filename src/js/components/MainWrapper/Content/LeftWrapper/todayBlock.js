import { createDiv, createImg, createSpan, createP } from '../../../../template';
import { getIconByWeather } from '../../../../../utils/functions';

const makeTemperatureBar = (temp) => {
   const temperatureBar = createDiv('temperature-bar');
   const degreeSpan = createSpan('°', 'temperature-bar__degree');
   const span = createSpan(temp, 'temperature-bar__value');
   temperatureBar.appendChild(span);
   temperatureBar.appendChild(degreeSpan);
   return temperatureBar;
};

const makeForecastInfo = (weatherData) => {
   const forecastInfo = createDiv('forecast-info');
   const titleP = createP('overcast', 'forecast-info__item', 'forecast-info__title');
   const feelP = createP(
      `Feels like: ${weatherData.feels_like}°`,
      'forecast-info__item',
      'forecast-info__feel'
   );
   const windP = createP(
      `Wind: ${weatherData.wind} m/s`,
      'forecast-info__item',
      'forecast-info__wind'
   );
   const huminityP = createP(
      `Humidity: ${weatherData.humidity}%`,
      'forecast-info__item',
      'forecast-info__humidity'
   );
   forecastInfo.appendChild(titleP);
   forecastInfo.appendChild(feelP);
   forecastInfo.appendChild(windP);
   forecastInfo.appendChild(huminityP);
   return forecastInfo;
};

const makeForecastBar = (weatherData) => {
   const forecastBar = createDiv('forecast-bar');
   const weatherIcon = createImg(
      `${getIconByWeather(weatherData.description, weatherData.date)}`,
      'forecast-bar__icon'
   );
   forecastBar.appendChild(weatherIcon);
   forecastBar.appendChild(makeForecastInfo(weatherData));
   return forecastBar;
};

const TodayBlock = (weatherData) => {
   const todayBlock = createDiv('#today-block', 'today-block');
   todayBlock.appendChild(makeTemperatureBar(weatherData.temp));
   todayBlock.appendChild(makeForecastBar(weatherData));
   return todayBlock;
};

export default TodayBlock;
