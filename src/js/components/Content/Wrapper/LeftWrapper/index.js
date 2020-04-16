import { createDiv } from '../../../../template';
import TodayBlock from './todayForecast';
import PreviewBlock from './nextForecast';

const LeftWrapper = () => {
   const leftWrapper = createDiv('left-wrapper');
   leftWrapper.appendChild(TodayBlock());
   leftWrapper.appendChild(PreviewBlock());
   return leftWrapper;
};

export default LeftWrapper;
