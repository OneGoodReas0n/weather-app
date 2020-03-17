import { createDiv } from '../../template';
import LocationDateBlock from './locationDateBlock';
import Content from './Content';

const makeMainWrapperContent = () => {
   const mainContentWrapper = createDiv('main-content-wrapper');
   mainContentWrapper.appendChild(LocationDateBlock());
   mainContentWrapper.appendChild(Content());
   return mainContentWrapper;
};

export default makeMainWrapperContent;
