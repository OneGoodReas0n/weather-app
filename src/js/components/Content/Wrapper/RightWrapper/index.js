import { createDiv } from '../../../../template';
import Map from './map';

const RightWrapper = () => {
   const rightWrapper = createDiv('right-wrapper');
   rightWrapper.appendChild(Map());
   return rightWrapper;
};

export default RightWrapper;
