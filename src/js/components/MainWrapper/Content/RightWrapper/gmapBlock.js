import { createDiv, createP } from '../../../../template';

const makeMapDetails = (lat, lon) => {
   const mapDetails = createDiv('map-details-block');
   const latitudeSpan = createP(`Latitude: ${lat}`, 'map-details-block__item');
   const longitudeSpan = createP(`Longitude: ${lon}`, 'map-details-block__item');
   mapDetails.appendChild(latitudeSpan);
   mapDetails.appendChild(longitudeSpan);
   return mapDetails;
};

const GmapBlock = () => {
   const gmapBlock = createDiv('gmap-block');
   gmapBlock.appendChild(createDiv('#map-canvas'));
   gmapBlock.appendChild(makeMapDetails(1, 1));
   return gmapBlock;
};

export default GmapBlock;
