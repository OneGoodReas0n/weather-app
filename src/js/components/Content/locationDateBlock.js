import { createDiv, createSpan } from '../../template';
import { getFormattedDateForDateBlock } from '../../../utils/functions';

const makeLocationBlock = () => {
   const locationBlock = createDiv('#location', 'location-date__item');
   const spanInfo = createSpan(``, 'location-date__text');
   locationBlock.appendChild(spanInfo);
   return locationBlock;
};

const makeDateBlock = () => {
   const dateBlock = createDiv('#date', 'location-date__item');
   const spanInfo = createSpan(`${getFormattedDateForDateBlock()}`, 'location-date__subtext');
   dateBlock.appendChild(spanInfo);
   return dateBlock;
};

const LocationDateBlock = () => {
   const block = createDiv('location-date');
   block.appendChild(makeLocationBlock());
   block.appendChild(makeDateBlock());
   return block;
};

export default LocationDateBlock;
