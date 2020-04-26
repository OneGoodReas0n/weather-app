import Header from './Header';
import Content from './Content';
import { createDiv } from '../../template';

const Container = () => {
   const container = createDiv('container');
   container.appendChild(Header());
   container.appendChild(Content());
   return container;
};

export default Container;
