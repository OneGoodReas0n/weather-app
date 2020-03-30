import { createDiv } from '../../../template';
import LeftWrapper from './LeftWrapper';
import RightWrapper from './RightWrapper';

const Content = (weatherData, location) => {
   const content = createDiv('content');
   content.appendChild(LeftWrapper(weatherData));
   content.appendChild(RightWrapper(location));
   return content;
};

export default Content;
