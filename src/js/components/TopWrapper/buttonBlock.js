import { createDiv, createImg, createSpan } from '../../template';

const makeButtonUpdate = () => {
   const buttonUpdate = createDiv('button', 'button-update');
   const updateIcon = createImg(
      '../../assets/update_icon.svg',
      'button-block-update__icon'
   );
   buttonUpdate.appendChild(updateIcon);
   return buttonUpdate;
};

const makeLangSwitcher = () => {
   const buttonBlock = createDiv('button', 'lang-switcher');
   const langValue = createSpan('EN', 'lang-switcher__title');
   const icon = createImg(
      '../../assets/arrow-down_icon.svg',
      'lang-switcher__icon'
   );
   buttonBlock.appendChild(langValue);
   buttonBlock.appendChild(icon);
   return buttonBlock;
};

const tempItem = (value, active) => {
   const tempButton = createDiv(
      'button',
      'temp-switcher__item',
      active !== true
         ? 'temp-switcher__item_inactive'
         : 'temp-switcher__item_active',
      value === '°C' ? 'switch-button__left' : 'switch-button__right'
   );
   tempButton.appendChild(createSpan(value, 'temp-switcher__item__span'));
   return tempButton;
};

const makeTempSwitcher = () => {
   const buttonBlock = createDiv('button', 'temp-switcher');
   const leftButton = tempItem('°C', true);
   const rightButton = tempItem('°F', false);
   buttonBlock.appendChild(leftButton);
   buttonBlock.appendChild(rightButton);
   return buttonBlock;
};

const ButtonBlock = () => {
   const buttonBlock = createDiv('button-block');
   buttonBlock.appendChild(makeButtonUpdate());
   buttonBlock.appendChild(makeLangSwitcher());
   buttonBlock.appendChild(makeTempSwitcher());
   return buttonBlock;
};

export default ButtonBlock;
