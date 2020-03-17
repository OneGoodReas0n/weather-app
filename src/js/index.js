import '../css/style.scss';
import TopWrapper from './components/TopWrapper';
import MainWrapper from './components/MainWrapper';
import { createDiv } from './template';

window.onload = () => {
   const { body } = document;
   const container = createDiv('container');
   container.appendChild(TopWrapper());
   container.appendChild(MainWrapper());
   body.appendChild(container);
   //    const mainContentWrapper = createDiv('main-content-wrapper');
};
