import { Map } from 'mapbox-gl';
import '../css/style.scss';
import TopWrapper from './components/TopWrapper';
import MainWrapper from './components/MainWrapper';
import { createDiv } from './template';
import tockens from '../keys/tockens';
import { arrayReverse } from '../utils/functions';
import getLocation from '../api/geoAPI';
import getForecast from '../api/weatherAPI';

window.onload = () => {
   const { body } = document;
   const container = createDiv('container');
   container.appendChild(TopWrapper());
   container.appendChild(MainWrapper());
   body.appendChild(container);

   const map = new Map({
      style: 'mapbox://styles/mapbox/streets-v11',
      attributionControl: false,
      zoom: 14,
      accessToken: tockens.mapboxTOKEN,
      container: document.getElementById('map-canvas')
   });

   getLocation().then((data) => {
      const { loc, city, region } = data;
      getForecast(city, region).then((weather) => {
         const dataP = document.createElement('p');
         dataP.innerHTML = JSON.stringify(weather);
         body.appendChild(createDiv('api').appendChild(dataP));
      });
      map.setCenter(arrayReverse(String(loc).split(',')));
   });
};
