import { createDiv, createImg, createSpan } from '../../../../template';
import { getIconByWeather } from '../../../../../utils/functions';

const makeDayForecast = (temp, path) => {
   const dayForcast = createDiv('day-forecast');
   const forecastSpan = createSpan(`${temp}°`, 'day-forecast__value');
   const forecastImg = createImg(path, 'day-forecast__icon');
   dayForcast.appendChild(forecastSpan);
   dayForcast.appendChild(forecastImg);
   return dayForcast;
};

const makePreviewBlockItem = (day, temp, path) => {
   const previewBlockItem = createDiv('preview-block__item');
   const daySpan = createSpan(day, 'day-title');
   previewBlockItem.appendChild(daySpan);
   previewBlockItem.appendChild(makeDayForecast(temp, path));
   return previewBlockItem;
};

const PreviewBlock = (weatherData) => {
   const previewBlock = createDiv('#preview-block', 'preview-block');
   for (let i = 0; i < weatherData.length; i += 1) {
      const day = makePreviewBlockItem(
         weatherData[i].day,
         weatherData[i].weather.temp,
         getIconByWeather(weatherData[i].weather.description)
      );
      previewBlock.appendChild(day);
   }
   return previewBlock;
};

export default PreviewBlock;
