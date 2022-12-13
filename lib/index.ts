import Arta from './arta';

import './components/Modal/index.css';

const init = () => {
  (<any>window).Arta = new Arta();
};

init();

export default (<any>window).Arta;
