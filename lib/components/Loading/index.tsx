export const Loading = () => {
  return (
    <div class="artajs__modal__loading__wrapper">
      <div class="artajs__modal__loading__text">
        Retrieving shipping costs...
      </div>
      <div class="artajs__modal__loading">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 80 80"
          style={{ enableBackground: 'new 0 0 30 30' }}
        >
          <g id="back">
            <polyline class="st0" points="22,50 67,70 40,10 13,70 58,50 	" />
          </g>
          <g id="front">
            <polyline class="st1" points="22,50 67,70 40,10 22,50 	" />
          </g>
        </svg>
      </div>
    </div>
  );
};
