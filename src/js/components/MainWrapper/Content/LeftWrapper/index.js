import { createDiv } from '../../../../template';
import TodayBlock from './todayBlock';
import PreviewBlock from './previewBlock';
import { getWeatherForNow, getWeatherForNextDays } from '../../../../../utils/functions';

const LeftWrapper = (weatherData) => {
   const leftWrapper = createDiv('left-wrapper');
   leftWrapper.appendChild(TodayBlock(getWeatherForNow(new Date(), weatherData)));
   leftWrapper.appendChild(PreviewBlock(getWeatherForNextDays(new Date(), weatherData, 3)));
   return leftWrapper;
};

export default LeftWrapper;
