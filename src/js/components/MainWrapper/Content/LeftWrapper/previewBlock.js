import { createDiv, createImg, createSpan } from '../../../../template';

const makeDayForecast = (temp, weather) => {
   const dayForcast = createDiv('day-forecast');
   const forecastSpan = createSpan(`${temp}°`, 'day-forecast__value');
   const forecastImg = createImg(
      weather === '' || weather === undefined
         ? '../../../../assets/cloudy_weather_icon.svg'
         : '../../../../assets/cloudy_weather_icon.svg',
      'day-forecast__icon'
   );
   dayForcast.appendChild(forecastSpan);
   dayForcast.appendChild(forecastImg);
   return dayForcast;
};

const makePreviewBlockItem = (day, temp, weather) => {
   const previewBlockItem = createDiv('preview-block__item');
   const daySpan = createSpan(day, 'day-title');
   previewBlockItem.appendChild(daySpan);
   previewBlockItem.appendChild(makeDayForecast(temp, weather));
   return previewBlockItem;
};

const makePreviewBlock = () => {
   const previewBlock = createDiv('preview-block');
   const mon = makePreviewBlockItem('Monday', 14, 'none');
   const thue = makePreviewBlockItem('Thuesday', 12, '');
   const wed = makePreviewBlockItem('Wednesday', 10, '');
   previewBlock.appendChild(mon);
   previewBlock.appendChild(thue);
   previewBlock.appendChild(wed);
   return previewBlock;
};

const PreviewBlock = () => {
   const previewBlock = createDiv('today-block');
   previewBlock.appendChild(makePreviewBlock());
   return previewBlock;
};

export default PreviewBlock;
