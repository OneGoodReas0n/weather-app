import { createDiv } from '../../template';
import ButtonBlock from './buttonBlock';
import SearchBlock from './searchBlock';

const makeTopWrapperContent = () => {
   const topContentWrapper = createDiv('header');
   topContentWrapper.appendChild(ButtonBlock());
   topContentWrapper.appendChild(SearchBlock());
   return topContentWrapper;
};

export default makeTopWrapperContent;
