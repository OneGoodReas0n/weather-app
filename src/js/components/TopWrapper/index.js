import { createDiv } from '../../template';
import ButtonBlock from './buttonBlock';
import SearchBlock from './searchBlock';

const makeTopWrapperContent = () => {
   const topContentWrapper = createDiv('top-content-wrapper');
   topContentWrapper.appendChild(ButtonBlock());
   topContentWrapper.appendChild(SearchBlock());
   return topContentWrapper;
};

export default makeTopWrapperContent;
