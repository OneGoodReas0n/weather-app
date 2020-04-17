import { createDiv, createImg, createSpan } from '../../template';
import updateIconSVG from '../../../../assets/update_icon.svg';
import arrowDownSVG from '../../../../assets/arrow-down_icon.svg';
import { getCurrentUserSettings } from '../../../utils/cache';

const makeButtonUpdate = () => {
   const buttonUpdate = createDiv('button');
   const updateIcon = createImg(updateIconSVG, 'button__body', 'button__update');
   buttonUpdate.appendChild(updateIcon);
   return buttonUpdate;
};

const makeLangSwitcher = () => {
   const buttonBlock = createDiv('button');
   const langValue = createSpan('EN', 'button__body');
   const icon = createImg(arrowDownSVG, 'button__append');
   buttonBlock.appendChild(langValue);
   buttonBlock.appendChild(icon);
   return buttonBlock;
};

const tempItem = (value, active) => {
   const tempButton = createDiv(
      'button',
      'switcher__item',
      active !== true ? 'switcher__item_inactive' : 'switcher__item_active',
      value === '°C' ? 'switcher__item_left' : 'switcher__item_right'
   );
   tempButton.appendChild(createSpan(value, 'switcher__title'));
   return tempButton;
};

const makeTempSwitcher = () => {
   const buttonBlock = createDiv('#temp-switcher', 'switcher');
   const units =
      getCurrentUserSettings() !== null && getCurrentUserSettings().units !== undefined
         ? getCurrentUserSettings().units
         : 'C';
   const leftButton = tempItem('°C', units === 'C');
   const rightButton = tempItem('°F', units === 'F');
   buttonBlock.appendChild(leftButton);
   buttonBlock.appendChild(rightButton);
   return buttonBlock;
};

const Actions = () => {
   const buttonBlock = createDiv('header__actions');
   buttonBlock.appendChild(makeButtonUpdate());
   buttonBlock.appendChild(makeLangSwitcher());
   buttonBlock.appendChild(makeTempSwitcher());
   return buttonBlock;
};

export default Actions;
