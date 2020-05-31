import { createDiv } from '../../../../template';
import LeftWrapper from './LeftWrapper';
import RightWrapper from './RightWrapper';

const Wrapper = () => {
   const wrapper = createDiv('wrapper');
   wrapper.appendChild(LeftWrapper());
   wrapper.appendChild(RightWrapper());
   return wrapper;
};

export default Wrapper;
