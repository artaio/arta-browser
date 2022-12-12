import { Component, h } from 'preact';

export default class Quotes extends Component {
  changeAction = (e, onChange) => {
    onChange();
    e.preventDefault();
  };

  render({ onChange, request }, _) {
    const originDisplay = Arta.originDisplay || null;
    const destinationDisplay =
      Arta.destinationDisplay ||
      `${Arta.configuration.destination.postal_code}, ${Arta.configuration.destination.country}`;

    return (
      <div class="artajs__modal__quotes">
        <p class="artajs__modal__quotes__context">
          Unfortunately we could not retrieve costs for shipping these goods
          from:
        </p>
        <p class="artajs__modal__quotes__origin">
          {originDisplay ? (
            <span>
              <span class="artajs__modal__capitalize">{originDisplay}</span>{' '}
              <span class="artajs__modal__quotes__light">(origin)</span>
            </span>
          ) : (
            <span>...</span>
          )}
        </p>
        <p class="artajs__modal__quotes__destination">
          <span class="artajs__modal__quotes__small">To:</span>{' '}
          {destinationDisplay ? (
            <span>
              <strong class="artajs__modal__capitalize">
                {destinationDisplay}
              </strong>{' '}
              <span class="artajs__modal__quotes__light">(destination)</span>
            </span>
          ) : (
            <span>...</span>
          )}
        </p>
        <div class="artajs__modal__quotes__box">
          <p class="artajs__modal__quotes__disqualified">
            Please contact
            <br />
            <a
              class="artajs__modal__quotes__box__link"
              href="mailto:hello@arta.io"
            >
              hello@arta.io
            </a>
            <br />
            to request a custom quote
          </p>
        </div>
        <p class="artajs__modal__quotes__change">
          <a onClick={(e) => this.changeAction(e, onChange)} href="#">
            <svg
              width="20"
              height="8"
              viewBox="0 0 20 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.58562 7.46419C3.97614 7.85471 4.60931 7.85471 4.99983 7.46419C5.39036 7.07366 5.39036 6.4405 4.99983 6.04997L3.80697 4.85706L18.9999 4.85706C19.5522 4.85706 19.9999 4.40934 19.9999 3.85706C19.9999 3.30477 19.5522 2.85706 18.9999 2.85706L3.84988 2.85706L4.99993 1.70705C5.39045 1.31653 5.39045 0.683363 4.99993 0.292839C4.6094 -0.0976858 3.97624 -0.0976858 3.58571 0.292839L4.62519e-08 3.87847L3.58562 7.46419Z"
                fill="#99A5B2"
              />
            </svg>
            Change Destination
          </a>
        </p>
      </div>
    );
  }
}
