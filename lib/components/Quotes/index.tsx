import { Quote } from '../../MetadataTypes';
import { QuoteRequest } from '../../requests';
import { parseEstimatedLocation } from '../../helper';
import currencies from './currencies';
import { ModalStatus } from '../../ModalStatus';

export const defaultQuoteConfig = {
  shipFromLabel: 'These goods ship from:',
  shipToLabel: 'To:',
  disclaimerLabel: 'Actual shipping costs will be provided at checkout.',
  rangeLabel: 'Shipping estimated between',
  startsAtLabel: 'Shipping Starts at',
  artaInsuranceLabel: 'This estimate includes ARTA Transit Insurance.',
};

export interface QuoteTextConfig {
  shipFromLabel: string;
  shipToLabel: string;
  disclaimerLabel: string;
  rangeLabel: string;
  startsAtLabel: string;
  artaInsuranceLabel: string;
}

export interface QuoteFullTextConfig extends QuoteTextConfig {
  detailOriginLabel: string;
  detailDestinationLabel: string;
  returnLinkLabel: string;
}

interface QuotesOps {
  quoteRequest: QuoteRequest;
  showCostRange: boolean;
  textConfig: QuoteFullTextConfig;
  setStatus: (status: ModalStatus) => void;
}

export const Quotes = ({
  quoteRequest,
  showCostRange,
  textConfig,
  setStatus,
}: QuotesOps) => {
  const onChangeDestination = (e: any) => {
    e.preventDefault();
    setStatus(ModalStatus.OPEN);
  };

  const quotes = quoteRequest.quotes;
  if (quotes && quotes.length > 0) {
    quotes.sort((a: Quote, b: Quote) => {
      return a.total - b.total;
    });
  }
  const currencySymbol = currencies.filter(
    (c) => c.id === quoteRequest.currency
  )[0].symbol;
  const hasInsurance = quoteRequest.insurance === 'arta_transit_insurance';
  const isInternational =
    quoteRequest.origin.estimated_country ===
    quoteRequest.destination.estimated_country;

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
        {parsedDestination ? (
          <span>
            <strong class="artajs__modal__capitalize">
              {parsedDestination}
            </strong>{' '}
            <span class="artajs__modal__quotes__light">
              {textConfig.detailDestinationLabel}
            </span>
          </span>
        ) : (
          <span>...</span>
        )}
      </p>

      {showCostRange && quotes.length > 1 ? (
        <div
          class={`artajs__modal__quotes__box ${!isInternational ? 'artajs__modal__quotes__box__padding__y' : ''
            }`}
        >
          <p class="artajs__modal__quotes__context">{textConfig.rangeLabel}</p>
          <div class="artajs__modal__quotes__price">
            <div class="artajs__modal__quotes__price__amount">
              {currencySymbol}
              {Math.round(quotes[0].total)} - {currencySymbol}
              {Math.round(quotes[quotes.length - 1].total)}
            </div>
            <div class="artajs__modal__quotes__price__currency_code">
              {quoteRequest.currency}
            </div>
          </div>
          {isInternational && (
            <p class="artajs__modal__quotes__disclaimer">
              {hasInsurance ? `${textConfig.artaInsuranceLabel} ${textConfig.disclaimerLabel}` : textConfig.disclaimerLabel}
            </p>
          )}
        </div>
      ) : (
        <div
          class={`artajs__modal__quotes__box ${!isInternational ? 'artajs__modal__quotes__box__padding__y' : ''
            }`}
        >
          <p class="artajs__modal__quotes__context">
            {textConfig.startsAtLabel}
          </p>
          <div class="artajs__modal__quotes__price">
            <div class="artajs__modal__quotes__price__amount">
              {currencySymbol}
              {Math.round(quotes[0].total)}
            </div>
            <div class="artajs__modal__quotes__price__currency_code">
              {quoteRequest.currency}
            </div>
          </div>
          {isInternational && (
            <p class="artajs__modal__quotes__disclaimer">
              {hasInsurance ? `${textConfig.artaInsuranceLabel} ${textConfig.disclaimerLabel}` : textConfig.disclaimerLabel}
            </p>
          )}
        </div>
      )}

      <p class="artajs__modal__quotes__change">
        <a onClick={onChangeDestination} href="#">
          <svg height="12" id="chevron-left" viewBox="0 0 32 32" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z" /></svg>
          {textConfig.returnLinkLabel}
        </a>
      </p>
    </div>
  );
};
