import { createDiv } from '../../../../template';
import TodayBlock from './todayBlock';
import PreviewBlock from './previewBlock';

const LeftWrapper = (weatherData) => {
   const leftWrapper = createDiv('left-wrapper');
   leftWrapper.appendChild(TodayBlock());
   leftWrapper.appendChild(PreviewBlock());
   return leftWrapper;
};

export default LeftWrapper;
