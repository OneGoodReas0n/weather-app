import { createDiv } from '../../../template';
import LeftWrapper from './LeftWrapper';
import RightWrapper from './RightWrapper';

const Content = () => {
   const content = createDiv('content');
   content.appendChild(LeftWrapper());
   content.appendChild(RightWrapper());
   return content;
};

export default Content;
