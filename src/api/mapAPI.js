import { Map } from 'mapbox-gl';
import tokens from '../keys/tokens';

const MapApi = (() => {
   let map;
   const createMap = () => {
      map = new Map({
         style: 'mapbox://styles/mapbox/streets-v11',
         attributionControl: false,
         zoom: 14,
         accessToken: tokens.MAPBOX_TOKEN,
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
