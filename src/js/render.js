import { createDiv, createImg } from './template';

const makeTopWrapperContent = () => {
   const topContentWrapper = createDiv('top-content-wrapper');
   const buttonBlock = createDiv('button-block');
   const buttonBlockUpdate = createDiv('button-block-update');
   const updateIcon = createImg(
      '../../assets/update_icon.svg',
      'button-block-update__icon'
   );
   buttonBlockUpdate.appendChild(updateIcon);
   buttonBlock.appendChild(buttonBlockUpdate);
   topContentWrapper.appendChild(buttonBlock);
   return topContentWrapper;
};

const makeMainWrapperContent = () => {
   // const topContentWrapper = createDiv('top-content-wrapper');
   // const buttonBlock = createDiv('button-block');
   // const buttonBlockUpdate = createDiv('button-block-update');
   // const updateIcon = createImg(
   //    '../../assets/update_icon.svg',
   //    'button-block-update__icon'
   // );
   // buttonBlockUpdate.appendChild(updateIcon);
   // buttonBlock.appendChild(buttonBlockUpdate);
   // topContentWrapper.appendChild(buttonBlock);
   // return topContentWrapper;
};

export { makeTopWrapperContent, makeMainWrapperContent };
