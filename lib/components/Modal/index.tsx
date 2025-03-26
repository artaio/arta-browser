import { Header } from '../Header';
import { Destination } from '../Destination';
import { Footer } from '../Footer';

import { useEffect, useState } from 'preact/hooks';
import css from './index.css';
import { ArtaLocation } from '../../MetadataTypes';
import { Loading } from '../Loading';
import { Quotes } from '../Quotes';
import {
  getDestinationConfig,
  getDisqualifiedConfig,
  getQuoteConfig,
  getEstimateStyle,
  parseErrors,
  parseEstimatedLocation,
} from '../../helper';
import {
  HostedSession,
  loadHostedSessions,
  loadQuoteRequests,
  QuoteRequest,
} from '../../requests';
import { EstimateBody, EstimateFullConfig } from '../../estimateConfig';
import { Disqualified } from '../Disqualified';
import { ModalStatus } from '../../ModalStatus';
import { Invalidated } from '../Invalidated';

interface ModalOpts {
  estimateBody: EstimateBody;
  config: EstimateFullConfig;
  onClose: (e: any) => void;
}

export const Modal = ({ estimateBody, onClose, config }: ModalOpts) => {
  const position = config.style.position;
  const [destination, setDestination] = useState<ArtaLocation>();
  const [parsedOrigin, setParsedOrigin] = useState('');
  const [status, setStatus] = useState(ModalStatus.LOADING);
  const [hostedSession, setHostedSession] = useState<HostedSession>();
  const [quoteRequest, setQuoteRequest] = useState<QuoteRequest>();
  const [errors, setErrors] = useState<string[]>();

  const style = getEstimateStyle(config);

  useEffect(() => {
    (async () => {
      setErrors([]);
      setStatus(ModalStatus.LOADING);
      const session = await loadHostedSessions(config, estimateBody);
      setHostedSession(session);
      setParsedOrigin(parseEstimatedLocation(session.origin));

      if (!session.origin.city && !session.origin.estimated_city) {
        setStatus(ModalStatus.INVALIDATED);
        return;
      }
      setStatus(ModalStatus.OPEN);
    })();
  }, [estimateBody.origin, estimateBody.objects]);

  useEffect(() => {
    (async () => {
      setErrors([]);
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
        setStatus(ModalStatus.OPEN);
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
    <div>
      <style>{css}</style>
      <div class="artajs">
        {position === 'center' && (
          <div class="artajs__modal__backdrop" onClick={onClose} />
        )}
        <div class={`artajs__modal artajs__modal__${position}`} style={style}>
          <Header
            onClose={onClose}
            title={config.text.header.title}
            lineColor={config.style.color.border}
          />
          {status === ModalStatus.LOADING && (
            <div>
              <Loading />
              <Footer absolute={true} />
            </div>
          )}
          {status === ModalStatus.OPEN && (
            <Destination
              parsedOrigin={parsedOrigin}
              textConfig={getDestinationConfig(config)}
              setDestination={setDestination}
            />
          )}
          {status === ModalStatus.QUOTED && quoteRequest && (
            <Quotes
              quoteRequest={quoteRequest}
              showCostRange={config.style.pricingDisplay === 'range'}
              textConfig={getQuoteConfig(config)}
              setStatus={setStatus}
            />
          )}

          {status === ModalStatus.INVALIDATED && (
            <Invalidated
              message={config.text.invalidated.message}
              detail={config.text.invalidated.detail}
            />
          )}

          {status === ModalStatus.DISQUALIFIED && quoteRequest && (
            <Disqualified
              quoteRequest={quoteRequest}
              textConfig={getDisqualifiedConfig(config)}
              setStatus={setStatus}
            />
          )}

          {status !== ModalStatus.LOADING && <Footer />}
          {errors && errors.length > 0 && (
            <div class="artajs__modal__error__container">
              <div class="artajs__modal__error">
                {errors.map((error: string, i: number) => {
                  return <span key={`arta-error-${i}`}>{error}</span>;
                })}
              </div>

              <div className="artajs__modal__error__close">
                <a onClick={() => setErrors([])} href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="6.70711"
                      y1="6.29289"
                      x2="18.0208"
                      y2="17.6066"
                      stroke-width="2"
                    />
                    <line
                      x1="6.29289"
                      y1="17.6066"
                      x2="17.6066"
                      y2="6.29291"
                      stroke-width="2"
                    />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
