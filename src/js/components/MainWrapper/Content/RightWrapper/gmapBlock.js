import { createDiv, createImg, createP } from '../../../../template';

const makeMap = () => createImg('../../../../../../assets/gmap_icon.svg');

const makeMapDetails = () => {
   const mapDetails = createDiv('map-details-block');
   const latitudeSpan = createP('Latitude: 53°54', 'map-details-block__item');
   const longitudeSpan = createP('Longitude: 26°27', 'map-details-block__item');
   mapDetails.appendChild(latitudeSpan);
   mapDetails.appendChild(longitudeSpan);
   return mapDetails;
};

const GmapBlock = () => {
   const gmapBlock = createDiv('gmap-block');
   gmapBlock.appendChild(makeMap());
   gmapBlock.appendChild(makeMapDetails());
   return gmapBlock;
};

export default GmapBlock;
