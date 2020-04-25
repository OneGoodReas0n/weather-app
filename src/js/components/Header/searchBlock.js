import { createDiv, createImg, createInput } from '../../template';
import voiceSVG from '../../../../assets/voice_svg.svg';
import { getCurrentUserSettings } from '../../../utils/cache';
import getVocabular from '../../../utils/vocabular';
import { getUserLangOrDefault } from '../../../utils/functions';

const makeSearchBar = () => {
   const currentSettings = getCurrentUserSettings();
   let lang = getUserLangOrDefault();
   if (currentSettings !== null && currentSettings !== undefined) {
      lang = currentSettings.lang;
   }
   const vocabular = getVocabular(lang);
   const searchBar = createDiv('search__body');
   const input = createInput(
      `${vocabular.hearder.searchInput.placeholder}`,
      '#search_input',
      'search__input'
   );

   const voiceImg = createImg(voiceSVG, '#voice', 'search__voice');
   voiceImg.setAttribute('title', `${vocabular.hearder.searchInput.voiceSearch}`);
   searchBar.appendChild(input);
   searchBar.appendChild(voiceImg);
   return searchBar;
};

const Search = () => {
   const buttonBlock = createDiv('search');
   buttonBlock.appendChild(makeSearchBar());
   return buttonBlock;
};

export default Search;
