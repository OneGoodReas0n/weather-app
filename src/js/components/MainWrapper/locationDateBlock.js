import { createDiv, createSpan } from '../../template';
import { getFormattedDateForDateBlock } from '../../../utils/functions';

const makeLocationBlock = (location) => {
   const locationBlock = createDiv('location-block');
   const spanInfo = createSpan(`${location.city}, ${location.region}`, 'location-block__text');
   locationBlock.appendChild(spanInfo);
   return locationBlock;
};

const makeDateBlock = () => {
   const dateBlock = createDiv('#date', 'date-block');
   const spanInfo = createSpan(`${getFormattedDateForDateBlock()}`, 'date-block__text');
   dateBlock.appendChild(spanInfo);
   return dateBlock;
};

const LocationDateBlock = (location) => {
   const block = createDiv('location-date-block');
   block.appendChild(makeLocationBlock(location));
   block.appendChild(makeDateBlock());
   return block;
};

export default LocationDateBlock;
