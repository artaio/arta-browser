import { ArtaJsFullConfig } from './arta';
import { ArtaPackageEvent } from './components/PackageEvents';
import type { Shipment } from './components/TrackingDrawer';
import { EstimateBody } from './estimateConfig';
import {
  ArtaLocation,
  Insurance,
  Quote,
  SupportedCurrency,
} from './MetadataTypes';

export interface HostedSession {
  id: string;
  private_token: string;
  origin: ArtaLocation;
}

export interface QuoteRequest {
  quotes: Quote[];
  currency: SupportedCurrency;
  destination: ArtaLocation;
  origin: ArtaLocation;
  insurance: Insurance | null;
  err?: ArtaError;
}

export interface ArtaError {
  status: number;
  errors: { [key: string]: string };
}

const AUTH_KEY = 'ARTA_APIKey';

const logError = ({ status, errors }: ArtaError): void => {
  console.log(errors);
  const keys = Object.keys(errors);
  if (status === 403) {
    console.error('Invalid API Key');
  } else if (status === 401) {
    console.error('Private API Key');
  } else if (status === 422) {
    keys.map((key) => {
      console.error(`${key} ${errors[key]}`);
    });
  } else if (status === 400) {
    keys.map((key) => {
      console.error(`${key} ${errors[key]}`);
    });
  } else {
    console.error('Unkonwn error', status, errors);
  }
};

const artaRequest = async (
  path: string,
  config: ArtaJsFullConfig,
  body?: string,
  headers?: any,
  method: 'POST' | 'GET' = 'POST'
) => {
  const schema = config.httpSchema ? config.httpSchema : 'https';
  const res = await fetch(`${schema}://${config.host}${path}`, {
    method,
    body,
    headers: {
      ...headers,
      Authorization: `${AUTH_KEY} ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  const resBody = await res.json();
  if (!res.ok) {
    const err = Object.assign(
      {},
      {
        errors: resBody['errors'],
        status: res.status,
        statusText: res.statusText,
      }
    );
    logError(err);
    return { err: err };
  }
  return resBody;
};

export const loadHostedSessions = async (
  config: ArtaJsFullConfig,
  estimateBody: EstimateBody
) => {
  const path = '/estimate/hosted_sessions';
  const body = JSON.stringify({ hosted_session: estimateBody });
  const res = await artaRequest(path, config, body);
  return res as HostedSession;
};

export const loadQuoteRequests = async (
  config: ArtaJsFullConfig,
  hostedSession: HostedSession,
  estimateBody: EstimateBody
) => {
  const path = '/estimate/requests';
  const body = JSON.stringify({ request: estimateBody });
  const headers = {
    'hosted-session-id': hostedSession.id,
    'hosted-session-private-token': hostedSession.private_token,
  };
  const res = await artaRequest(path, config, body, headers);
  res.quotes && res.quotes.forEach((q: any) => (q.total = parseFloat(q.total)));
  return res as QuoteRequest;
};

export const validateEstimateBody = async (
  config: ArtaJsFullConfig,
  estimateBody: EstimateBody
) => {
  const path = '/estimate/validate';
  const body = JSON.stringify({ estimate: estimateBody });
  const res = await artaRequest(path, config, body);
  return res.err?.errors;
};

export const loadShipment = async (
  config: ArtaJsFullConfig,
  shipmentId: string
): Promise<Shipment> => {
  const path = `/embedded_tracking/shipments/${shipmentId}`;
  const res = await artaRequest(path, config, undefined, undefined, 'GET');
  return res;
};

export const validateShipment = async (
  config: ArtaJsFullConfig,
  shipmentId: string
) => {
  const path = `/embedded_tracking/shipments/${shipmentId}/validate`;
  const res = await artaRequest(path, config, undefined, undefined, 'GET');
  return res.err?.errors;
};

export const loadPackageEvents = async (
  config: ArtaJsFullConfig,
  shipmentId: string,
  packageId: number
): Promise<Array<ArtaPackageEvent>> => {
  const path = `/embedded_tracking/package_events/${shipmentId}/${packageId}`;
  const res = await artaRequest(path, config, undefined, undefined, 'GET');
  return res;
};
