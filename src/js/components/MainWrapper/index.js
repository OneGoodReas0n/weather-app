import { createDiv } from '../../template';
import LocationDateBlock from './locationDateBlock';
import Content from './Content';

const makeMainWrapperContent = (weatherData) => {
   const mainContentWrapper = createDiv('main-content-wrapper');
   mainContentWrapper.appendChild(LocationDateBlock());
   mainContentWrapper.appendChild(Content(weatherData));
   return mainContentWrapper;
};

export default makeMainWrapperContent;
