import Arta from './arta';

const init = () => {
  (<any>window).Arta = new Arta();
};

init();

export default (<any>window).Arta;
