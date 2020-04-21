import { createDiv, createImg, createSpan, createCustomDropdown } from '../../template';
import languages from '../../../localization/languages';
import { swapOptions, getUserLangOrDefault } from '../../../utils/functions';
import updateIconSVG from '../../../../assets/update_icon.svg';
import { getCurrentUserSettings } from '../../../utils/cache';
import { toggleDropdown } from '../../../utils/handlers';

const makeButtonUpdate = () => {
   const buttonUpdate = createDiv('button');
   const updateIcon = createImg(updateIconSVG, 'button__body', 'button__update');
   buttonUpdate.appendChild(updateIcon);
   return buttonUpdate;
};

const makeLangSwitcher = () => {
   const div = createDiv('#dropdown', 'dropdown');
   const currentSettings = getCurrentUserSettings();
   let lang = getUserLangOrDefault();
   if (currentSettings !== null && currentSettings !== undefined) {
      lang = currentSettings.lang;
   }
   const langArray = swapOptions(lang, languages);
   const langDropdown = createCustomDropdown(langArray, '#dropdown-list', 'dropdown__list');
   langDropdown.childNodes.forEach((e) => {
      e.addEventListener('click', toggleDropdown);
   });
   div.appendChild(langDropdown);
   return div;
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
   const userSettings = getCurrentUserSettings();
   const units =
      userSettings !== null && userSettings.units !== undefined ? userSettings.units : 'C';
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
