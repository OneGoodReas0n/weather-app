import { createDiv, createImg, createSpan, createCustomDropdown } from '../../../template';
import languages from '../../../../localization/languages';
import { swapOptions } from '../../../../utils/functions';
import homeIconSVG from '../../../../../assets/home_icon_small_white.svg';
import { getLangFromCahceOrDefault, getUnitsFromCacheOrDefault } from '../../../../utils/cache';
import { toggleDropdown } from '../../../../utils/handlers';
import getVocabular from '../../../../utils/vocabular';

const makeButtonHome = () => {
   const lang = getLangFromCahceOrDefault();
   const vocabular = getVocabular(lang);
   const buttonUpdate = createDiv('button');
   const homeImg = createImg(homeIconSVG, '#home', 'button__body', 'button__home');
   homeImg.setAttribute('title', `${vocabular.hearder.searchInput.home}`);
   buttonUpdate.appendChild(homeImg);
   return buttonUpdate;
};

const makeLangSwitcher = () => {
   const div = createDiv('#dropdown', 'dropdown');
   const lang = getLangFromCahceOrDefault();
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
   const units = getUnitsFromCacheOrDefault();
   const leftButton = tempItem('°C', units === 'C');
   const rightButton = tempItem('°F', units === 'F');
   buttonBlock.appendChild(leftButton);
   buttonBlock.appendChild(rightButton);
   return buttonBlock;
};

const Actions = () => {
   const buttonBlock = createDiv('header__actions');
   buttonBlock.appendChild(makeButtonHome());
   buttonBlock.appendChild(makeLangSwitcher());
   buttonBlock.appendChild(makeTempSwitcher());
   return buttonBlock;
};

export default Actions;
