import { parseEstimatedLocation } from '../../helper';
import { QuoteRequest } from '../../requests';
import { ModalStatus } from '../../ModalStatus';

export interface DisqualifiedTextConfig {
  shipFromLabel: string;
  shipToLabel: string;
  contactEmail: string;
  emailHeaderLabel: string;
  emailFooterLabel: string;
}

export interface DisqualifiedFullTextConfig extends DisqualifiedTextConfig {
  detailOriginLabel: string;
  detailDestinationLabel: string;
  returnLinkLabel: string;
}

export const defaultDisqualifiedConfig = {
  shipFromLabel:
    'Unfortunately we could not retrieve costs for shipping these goods from:',
  shipToLabel: 'To:',
  contactEmail: 'hello@arta.io',
  emailHeaderLabel: 'Please contact',
  emailFooterLabel: 'to request a custom quote',
};

interface DisqualifiedOpts {
  quoteRequest: QuoteRequest;
  textConfig: DisqualifiedFullTextConfig;
  setStatus: (status: ModalStatus) => void;
}

export const Disqualified = ({
  quoteRequest,
  textConfig,
  setStatus,
}: DisqualifiedOpts) => {
  const onChangeDestination = (e: any) => {
    e.preventDefault();
    setStatus(ModalStatus.OPEN);
  };

  const parsedOrigin = parseEstimatedLocation(quoteRequest.origin);
  const parsedDestination = parseEstimatedLocation(quoteRequest.destination);

  return (
    <div class="artajs__modal__quotes">
      <p class="artajs__modal__quotes__context">{textConfig.shipFromLabel}</p>
      <p class="artajs__modal__quotes__origin">
        <span>
          <strong class="artajs__modal__capitalize">{parsedOrigin}</strong>{' '}
          <span class="artajs__modal__quotes__light">
            {textConfig.detailOriginLabel}
          </span>
        </span>
      </p>
      <p class="artajs__modal__quotes__destination">
        <span class="artajs__modal__quotes__small">
          {textConfig.shipToLabel}
        </span>{' '}
        <span>
          <strong class="artajs__modal__capitalize">{parsedDestination}</strong>{' '}
          <span class="artajs__modal__quotes__light">
            {textConfig.detailDestinationLabel}
          </span>
        </span>
      </p>
      <div class="artajs__modal__quotes__box">
        <p class="artajs__modal__quotes__disqualified">
          {textConfig.emailHeaderLabel + ' '}
          <a
            class="artajs__modal__quotes__box__link"
            href={`mailto:${textConfig.contactEmail}`}
          >
            {textConfig.contactEmail}
          </a>
          {' ' + textConfig.emailFooterLabel}
        </p>
      </div>
      <p class="artajs__modal__quotes__change">
        <a onClick={onChangeDestination} href="#">
          <svg height="12" id="chevron-left" viewBox="0 0 32 32" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z" /></svg>
          {textConfig.returnLinkLabel}
        </a>
      </p>
    </div>
  );
};
