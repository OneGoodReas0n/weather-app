import '../css/style.scss';
import { makeTopWrapperContent } from './render';
import { createDiv } from './template';

window.onload = () => {
   const { body } = document;
   const container = createDiv('container');
   container.appendChild(makeTopWrapperContent());
   body.appendChild(container);
   //    const mainContentWrapper = createDiv('main-content-wrapper');
};
