import { Header } from '../Header';
import { Destination } from '../Destination';
import { Footer } from '../Footer';

import { useEffect, useState } from 'preact/hooks';
import './index.css';
import { ArtaObject, ArtaLocation } from '../../types';
import { ArtaJsConfig } from '../../arta';
import { Loading } from '../Loading';

export enum ModalStatus {
  CLOSED,
  DISQUALIFIED,
  LOADING,
  OPEN,
  QUOTED,
}
interface ModalOpts {
  origin: ArtaLocation;
  objects: ArtaObject[];
  config: ArtaJsConfig;
}

export const Modal = ({ origin, objects, config }: ModalOpts) => {

  const position = config.position;
  const [destination, setDestination] = useState<ArtaLocation>();
  const [parsedOrigin, setParsedOrigin] = useState('');
  const [status, setStatus] = useState(ModalStatus.LOADING);

  useEffect(() => {
    const validate = async () => {
      setStatus(ModalStatus.LOADING);
      const req = await fetch('https://api.arta.io/estimate/hosted_sessions', {
        method: 'POST',
        body: JSON.stringify({
          hosted_session: { objects, origin },
        }),
        headers: {
          Authorization: `ARTA_APIKey ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      const res = await req.json();

      const region =
        res.origin.estimated_country === 'US' && res.origin.estimated_region
          ? res.origin.estimated_region
          : '';
      setParsedOrigin(
        `${res.origin.estimated_city.toLowerCase()}, ${region}, ${
          res.origin.estimated_country
        }`
      );
      setStatus(ModalStatus.OPEN);
    };

    validate();
  }, [origin, objects]);

  return (
    <div class="artajs">
      {position === 'center' && <div class="artajs__modal__backdrop" />}
      <div class={`artajs__modal artajs__modal__${position}`}>
        <Header />
        {status === ModalStatus.LOADING ? (
          <Loading />
        ) : (
          status === ModalStatus.OPEN && (
            <Destination
              parsedOrigin={parsedOrigin}
              setDestination={setDestination}
              setStatus={setStatus}
            />
          )
        )}
        <Footer />
      </div>
    </div>
  );
};
