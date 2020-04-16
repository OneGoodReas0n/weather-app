import { createDiv, createImg, createSpan } from '../../../../template';

const makeDayForecast = () => {
   const forecastBody = createDiv('next-forecast__body');
   const forecastBar = createDiv('next-forecast__bar');
   const tempSpan = createSpan(``, 'next-forecast__value');
   const unitsSpan = createSpan(``, 'next-forecast__units');
   forecastBar.appendChild(tempSpan);
   forecastBar.appendChild(unitsSpan);
   const forecastImg = createImg('', 'next-forecast__icon');
   forecastBody.appendChild(forecastBar);
   forecastBody.appendChild(forecastImg);
   return forecastBody;
};

const makePreviewBlockItem = () => {
   const previewBlockItem = createDiv('next-forecast__item');
   const daySpan = createSpan('', 'next-forecast__title');
   previewBlockItem.appendChild(daySpan);
   previewBlockItem.appendChild(makeDayForecast());
   return previewBlockItem;
};

const NextForecast = () => {
   const nextForecast = createDiv('#next-forecast', 'next-forecast');
   const list = createDiv('next-forecast__list');
   for (let i = 0; i < 3; i += 1) {
      const dayBlock = makePreviewBlockItem();
      list.appendChild(dayBlock);
   }
   nextForecast.appendChild(list);
   return nextForecast;
};

export default NextForecast;
