import { createDiv } from '../../../template';
import LeftWrapper from './LeftWrapper';
import RightWrapper from './RightWrapper';

const Content = (weatherData) => {
   const content = createDiv('content');
   content.appendChild(LeftWrapper(weatherData));
   content.appendChild(RightWrapper());
   return content;
};

export default Content;
