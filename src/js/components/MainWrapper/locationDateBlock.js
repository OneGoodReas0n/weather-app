import { createDiv, createSpan } from '../../template';

const makeLocationBlock = () => {
   const locationBlock = createDiv('location-block');
   const spanInfo = createSpan('Dnipro, Ukraine', 'location-block__text');
   locationBlock.appendChild(spanInfo);
   return locationBlock;
};

const makeDateBlock = () => {
   const dateBlock = createDiv('date-block');
   const spanInfo = createSpan('Dnipro, Ukraine', 'date-block__text');
   dateBlock.appendChild(spanInfo);
   return dateBlock;
};

const LocationDateBlock = () => {
   const block = createDiv('location-date-block');
   block.appendChild(makeLocationBlock());
   block.appendChild(makeDateBlock());
   return block;
};

export default LocationDateBlock;
