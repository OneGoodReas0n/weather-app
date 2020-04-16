import { Map } from 'mapbox-gl';
import tockens from '../keys/tockens';

const createMap = (container, coordinates) => {
   const { lat, long } = coordinates;
   const map = new Map({
      style: 'mapbox://styles/mapbox/streets-v11',
      attributionControl: false,
      zoom: 14,
      accessToken: tockens.MAPBOX_TOKEN,
      container
   });

   map.setCenter([long, lat]);
   return map;
};

export default createMap;
