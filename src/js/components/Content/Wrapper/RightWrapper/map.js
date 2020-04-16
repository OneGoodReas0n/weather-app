import { createDiv, createP } from '../../../../template';

const makeMapDetails = () => {
   const mapDetails = createDiv('#coordinates', 'map__details');
   const latitudeSpan = createP(``, 'map__item', 'map__latitude');
   const longitudeSpan = createP(``, 'map__item', 'map__longitude');
   mapDetails.appendChild(latitudeSpan);
   mapDetails.appendChild(longitudeSpan);
   return mapDetails;
};

const Map = () => {
   const map = createDiv('map');
   map.appendChild(createDiv('#map-canvas'));
   map.appendChild(makeMapDetails());
   return map;
};

export default Map;
