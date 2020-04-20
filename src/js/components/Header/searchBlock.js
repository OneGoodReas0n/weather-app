import { createDiv, createImg, createInput } from '../../template';
import voiceSVG from '../../../../assets/voice_svg.svg';
import homeSVG from '../../../../assets/home_icon_small.svg';
import { getCurrentUserSettings } from '../../../utils/cache';
import { createVocabular } from '../../../utils/updateData';

const makeSearchBar = () => {
   const { lang } = getCurrentUserSettings();
   const vocabular = createVocabular(lang);
   const searchBar = createDiv('search__body');
   const input = createInput(
      `${vocabular.hearder.searchInput.placeholder}`,
      '#search_input',
      'search__input'
   );

   const voiceImg = createImg(voiceSVG, '#voice', 'search__voice');
   voiceImg.setAttribute('title', `${vocabular.hearder.searchInput.voiceSearch}`);

   const homeImg = createImg(homeSVG, '#home', 'search__home');
   homeImg.setAttribute('title', `${vocabular.hearder.searchInput.home}`);

   searchBar.appendChild(input);
   searchBar.appendChild(voiceImg);
   searchBar.appendChild(homeImg);
   return searchBar;
};

const Search = () => {
   const buttonBlock = createDiv('search');
   buttonBlock.appendChild(makeSearchBar());
   return buttonBlock;
};

export default Search;
