import { Map } from 'mapbox-gl';
import tockens from '../keys/tockens';

const createMap = (container) => {
   const map = new Map({
      style: 'mapbox://styles/mapbox/streets-v11',
      attributionControl: false,
      zoom: 14,
      accessToken: tockens.mapboxTOKEN,
      container
   });
   return map;
};

export default createMap;
