import { createDiv, createImg, createInput } from '../../template';
import voiceSVG from '../../../../assets/voice_svg.svg';
import homeSVG from '../../../../assets/home_icon_small.svg';

const makeSearchBar = () => {
   const searchBar = createDiv('search__body');
   const input = createInput('Search city or ZIP', '#search_input', 'search__input');

   const voiceImg = createImg(voiceSVG, '#voice', 'search__voice');
   voiceImg.setAttribute('title', 'Voice search');

   const homeImg = createImg(homeSVG, '#home', 'search__home');
   homeImg.setAttribute('title', 'Home');

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
