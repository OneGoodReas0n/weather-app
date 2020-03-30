import { createDiv } from '../../template';
import LocationDateBlock from './locationDateBlock';
import Content from './Content';

const makeMainWrapperContent = (location, weatherData) => {
   const mainContentWrapper = createDiv('main-content-wrapper');
   mainContentWrapper.appendChild(LocationDateBlock(location));
   mainContentWrapper.appendChild(Content(weatherData, location));
   return mainContentWrapper;
};

export default makeMainWrapperContent;
