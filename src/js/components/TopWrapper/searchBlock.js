import { createDiv, createImg, createSpan, createInput } from '../../template';

const makeSearchBar = () => {
   const searchBar = createDiv('search-bar');
   const input = createInput('', 'Search city or ZIP', 'search-bar__input');

   const voiceImg = createImg('../../../../assets/voice_svg.svg', 'search-bar__voice');
   searchBar.appendChild(input);
   searchBar.appendChild(voiceImg);
   return searchBar;
};

const makeSearchButton = () => {
   const searchBar = createDiv('search-button');
   const span = createSpan('Search', 'search-button__text');
   searchBar.appendChild(span);
   return searchBar;
};

const SearchBlock = () => {
   const buttonBlock = createDiv('search-block');
   buttonBlock.appendChild(makeSearchBar());
   buttonBlock.appendChild(makeSearchButton());
   return buttonBlock;
};

export default SearchBlock;
