import { createDiv } from '../../../../template';
import GmapBlock from './gmapBlock';

const RightWrapper = (location) => {
   const rightWrapper = createDiv('right-wrapper');
   rightWrapper.appendChild(GmapBlock(location));
   return rightWrapper;
};

export default RightWrapper;
