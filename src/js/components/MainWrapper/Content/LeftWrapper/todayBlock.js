import { createDiv, createImg, createSpan, createP } from '../../../../template';

const makeTemperatureBar = () => {
   const temperatureBar = createDiv('temperature-bar');
   const degreeSpan = createSpan('°', 'temperature-bar__degree');
   const span = createSpan('10', 'temperature-bar__value');
   temperatureBar.appendChild(span);
   temperatureBar.appendChild(degreeSpan);
   return temperatureBar;
};

const makeForecastInfo = () => {
   const forecastInfo = createDiv('forecast-info');
   const titleP = createP('overcast', 'forecast-info__item', 'forecast-info__title');
   const feelP = createP('Feels like: 7°', 'forecast-info__item', 'forecast-info__feel');
   const windP = createP('Wind: 2 m/s', 'forecast-info__item', 'forecast-info__wind');
   const huminityP = createP('Humidity: 83%', 'forecast-info__item', 'forecast-info__huminity');
   forecastInfo.appendChild(titleP);
   forecastInfo.appendChild(feelP);
   forecastInfo.appendChild(windP);
   forecastInfo.appendChild(huminityP);
   return forecastInfo;
};

const makeForecastBar = () => {
   const forecastBar = createDiv('forecast-bar');
   const weatherIcon = createImg('../../../../assets/weather_icon.svg', 'forecast-bar__icon');
   forecastBar.appendChild(weatherIcon);
   forecastBar.appendChild(makeForecastInfo());
   return forecastBar;
};

const makeTodayBlock = () => {
   const todayBlock = createDiv('today-block');
   todayBlock.appendChild(makeTemperatureBar());
   todayBlock.appendChild(makeForecastBar());
   return todayBlock;
};

const TodayBlock = () => {
   const todayBlock = createDiv('today-block');
   todayBlock.appendChild(makeTodayBlock());
   return todayBlock;
};

export default TodayBlock;
