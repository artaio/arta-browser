import Arta from './arta';
import './components/Modal/index.css';

const init = () => {
  (<any>window).Arta = new Arta();
};

init();

export * from './arta';
export * from './estimate';

export default (<any>window).Arta as Arta;
