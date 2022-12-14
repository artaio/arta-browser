import { Header } from '../Header';
import { Destination } from '../Destination';
import { Footer } from '../Footer';

import { useEffect, useState } from 'preact/hooks';
import './index.css';
import { ArtaLocation } from '../../MetadataTypes';
import { ArtaJsConfig } from '../../arta';
import { Loading } from '../Loading';
import { Quotes } from '../Quotes';
import { parseEstimatedLocation } from '../../helper';
import {
  HostedSession,
  loadHostedSessions,
  loadQuoteRequests,
  QuoteRequest,
} from '../../requests';
import { EstimateBody } from '../../estimate';
import { Disqualified } from '../Disqualified';

export enum ModalStatus {
  CLOSED,
  DISQUALIFIED,
  LOADING,
  OPEN,
  QUOTED,
}
interface ModalOpts {
  estimateBody: EstimateBody;
  config: ArtaJsConfig;
}

export const Modal = ({ estimateBody, config }: ModalOpts) => {
  const position = config.position;
  const [destination, setDestination] = useState<ArtaLocation>();
  const [parsedOrigin, setParsedOrigin] = useState('');
  const [status, setStatus] = useState(ModalStatus.LOADING);
  const [hostedSession, setHostedSession] = useState<HostedSession>();
  const [quoteRequest, setQuoteRequest] = useState<QuoteRequest>();

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
      setQuoteRequest(req);

      if(!req.disqualifications || req.disqualifications.length > 0) {
        setStatus(ModalStatus.DISQUALIFIED);
      } else {
        setStatus(ModalStatus.QUOTED);
      }

    })();
  }, [destination]);

  return (
    <div class="artajs">
      {position === 'center' && <div class="artajs__modal__backdrop" />}
      <div class={`artajs__modal artajs__modal__${position}`}>
        <Header />
        {status === ModalStatus.LOADING && <Loading />}
        {status === ModalStatus.OPEN && (
          <Destination
            parsedOrigin={parsedOrigin}
            setDestination={setDestination}
          />
        )}
        {status === ModalStatus.QUOTED && quoteRequest && (
          <Quotes quoteRequest={quoteRequest} setStatus={setStatus} />
        )}

        {status === ModalStatus.DISQUALIFIED && quoteRequest &&
          <Disqualified quoteRequest={quoteRequest} setStatus={setStatus} />
        }

        <Footer />
      </div>
    </div>
  );
};
