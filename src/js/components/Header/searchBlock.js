import { createDiv, createImg, createSpan, createInput } from '../../template';
import voiceSVG from '../../../../assets/voice_svg.svg';

const makeSearchBar = () => {
   const searchBar = createDiv('search__body');
   const input = createInput('Search city or ZIP', '#search_input', 'search__input');

   const voiceImg = createImg(voiceSVG, 'search__voice');
   searchBar.appendChild(input);
   searchBar.appendChild(voiceImg);
   return searchBar;
};

const makeSearchButton = () => {
   const searchBar = createDiv('search__button', 'button');
   const span = createSpan('Search', 'search__title');
   searchBar.appendChild(span);
   return searchBar;
};

const Search = () => {
   const buttonBlock = createDiv('search');
   buttonBlock.appendChild(makeSearchBar());
   buttonBlock.appendChild(makeSearchButton());
   return buttonBlock;
};

export default Search;
