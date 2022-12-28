import { Header } from '../Header';
import { Destination } from '../Destination';
import { Footer } from '../Footer';

import { useEffect, useState } from 'preact/hooks';
import './index.css';
import { ArtaLocation } from '../../MetadataTypes';
import { Loading } from '../Loading';
import { Quotes } from '../Quotes';
import { parseErrors, parseEstimatedLocation } from '../../helper';
import {
  HostedSession,
  loadHostedSessions,
  loadQuoteRequests,
  QuoteRequest,
} from '../../requests';
import { EstimateBody, EstimateFullConfig } from '../../estimate';
import { Disqualified } from '../Disqualified';
import { ModalStatus } from '../../ModalStatus';

interface ModalOpts {
  estimateBody: EstimateBody;
  config: EstimateFullConfig;
  onClose: (e: any) => void;
}

export const Modal = ({ estimateBody, onClose, config }: ModalOpts) => {
  const position = config.position;
  const [destination, setDestination] = useState<ArtaLocation>();
  const [parsedOrigin, setParsedOrigin] = useState('');
  const [status, setStatus] = useState(ModalStatus.LOADING);
  const [hostedSession, setHostedSession] = useState<HostedSession>();
  const [quoteRequest, setQuoteRequest] = useState<QuoteRequest>();
  const [errors, setErrors] = useState<string[]>();

  useEffect(() => {
    (async () => {
      setStatus(ModalStatus.LOADING);
      const session = await loadHostedSessions(config, estimateBody);
      setHostedSession(session);
      setParsedOrigin(parseEstimatedLocation(session.origin));
      setStatus(ModalStatus.OPEN);
    })();
  }, [estimateBody.origin, estimateBody.objects]);

  useEffect(() => {
    (async () => {
      if (!destination) {
        return;
      }
      setStatus(ModalStatus.LOADING);
      const esimate = { ...estimateBody, destination };

      const sess = hostedSession
        ? hostedSession
        : { id: '', private_token: '', origin: estimateBody.origin };

      const req = await loadQuoteRequests(config, sess, esimate);
      if (req.err) {
        const errorMessages = parseErrors(req.err.errors);
        setErrors(errorMessages);
      } else {
        setQuoteRequest(req);
        if (req.quotes && req.quotes.length > 0) {
          setStatus(ModalStatus.QUOTED);
        } else {
          setStatus(ModalStatus.DISQUALIFIED);
        }
      }
    })();
  }, [destination]);

  return (
    <div class="artajs">
      {position === 'center' && <div class="artajs__modal__backdrop" />}
      <div class={`artajs__modal artajs__modal__${position}`}>
        <Header onClose={onClose} title={config.title} />
        {status === ModalStatus.LOADING && <Loading />}
        {status === ModalStatus.OPEN && (
          <Destination
            parsedOrigin={parsedOrigin}
            destinationLabel={config.destinationLabel}
            destinationButtonText={config.destinationButtonText}
            setDestination={setDestination}
          />
        )}
        {status === ModalStatus.QUOTED && quoteRequest && (
          <Quotes
            quoteRequest={quoteRequest}
            showCostRange={config.pricingDisplay === 'range'}
            setStatus={setStatus}
          />
        )}

        {status === ModalStatus.DISQUALIFIED && quoteRequest && (
          <Disqualified quoteRequest={quoteRequest} setStatus={setStatus} />
        )}

        <Footer />
        {errors && errors.length > 0 && (
          <div class="artajs__modal__error__container">
            <div class="artajs__modal__error">
              {errors.map((error: string, i: number) => {
                return <span key={`arta-error-${i}`}>{error}</span>;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
