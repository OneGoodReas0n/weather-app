import { createDiv, createImg, createSpan, createP } from '../../../../template';

const makeTemperatureBar = () => {
   const temperatureBar = createDiv('today-forecast__temperature');
   const degreeSpan = createSpan(``, 'today-forecast__degree');
   const span = createSpan('', 'today-forecast__value');
   temperatureBar.appendChild(span);
   temperatureBar.appendChild(degreeSpan);
   return temperatureBar;
};

const makeForecastInfo = () => {
   const forecastInfo = createDiv('today-forecast__details');
   const titleP = createP(``, 'today-forecast__item', 'today-forecast__desc');
   const feelP = createP(``, 'today-forecast__item', 'today-forecast__feel');
   const windP = createP(``, 'today-forecast__item', 'today-forecast__wind');
   const huminityP = createP(``, 'today-forecast__item', 'today-forecast__humidity');
   forecastInfo.appendChild(titleP);
   forecastInfo.appendChild(feelP);
   forecastInfo.appendChild(windP);
   forecastInfo.appendChild(huminityP);
   return forecastInfo;
};

const makeForecastBar = () => {
   const forecastBar = createDiv('today-forecast__weather');
   const weatherIcon = createImg(``, 'today-forecast__image');
   forecastBar.appendChild(weatherIcon);
   forecastBar.appendChild(makeForecastInfo());
   return forecastBar;
};

const TodayForecast = () => {
   const todayBlock = createDiv('#today-forecast', 'today-forecast');
   todayBlock.appendChild(makeTemperatureBar());
   todayBlock.appendChild(makeForecastBar());
   return todayBlock;
};

export default TodayForecast;
