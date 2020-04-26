import { createDiv } from '../../../template';
import LocationDate from './locationDateBlock';
import Wrapper from './Wrapper';

const makeMainWrapperContent = () => {
   const mainContentWrapper = createDiv('content');
   mainContentWrapper.appendChild(LocationDate());
   mainContentWrapper.appendChild(Wrapper());
   return mainContentWrapper;
};

export default makeMainWrapperContent;
