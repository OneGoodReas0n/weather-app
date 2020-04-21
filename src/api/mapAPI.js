import { Map } from 'mapbox-gl';
import tockens from '../keys/tockens';

const MapApi = (() => {
   let map;
   const createMap = () => {
      map = new Map({
         style: 'mapbox://styles/mapbox/streets-v11',
         attributionControl: false,
         zoom: 14,
         accessToken: tockens.MAPBOX_TOKEN,
         container: document.getElementById('map-canvas')
      });
      return map;
   };

   return {
      getInstance: () => {
         if (map === undefined) {
            map = createMap();
         }
         return map;
      }
   };
})();

export default MapApi;
