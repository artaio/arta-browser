import './index.css';

export interface ModalOpts {
  color: 'red' | 'blue' | 'green';
};

export const Modal = ({color}: ModalOpts) => {
  return (
    <div id="artajs" className={`box ${color}`}>
    </div>
  );
};