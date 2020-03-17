import { createDiv } from '../../../../template';
import GmapBlock from './gmapBlock';

const RightWrapper = () => {
   const rightWrapper = createDiv('right-wrapper');
   rightWrapper.appendChild(GmapBlock());
   return rightWrapper;
};

export default RightWrapper;
