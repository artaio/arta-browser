import { ArtaJsConfig } from './arta';
import { EstimateBody } from './estimate';
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
}

const AUTH_KEY = 'ARTA_APIKey';
export const loadHostedSessions = async (
  config: ArtaJsConfig,
  estimateBody: EstimateBody
) => {
  const req = await fetch(`https://${config.host}/estimate/hosted_sessions`, {
    method: 'POST',
    body: JSON.stringify({ hosted_session: estimateBody }),
    headers: {
      Authorization: `${AUTH_KEY} ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
  });
  const res = await req.json();
  return res as HostedSession;
};

export const loadQuoteRequests = async (
  config: ArtaJsConfig,
  hostedSession: HostedSession,
  estimateBody: EstimateBody
) => {
  const req = await fetch(`https://${config.host}/estimate/requests`, {
    method: 'POST',
    body: JSON.stringify({ request: estimateBody }),
    headers: {
      Authorization: `${AUTH_KEY} ${config.apiKey}`,
      'Content-Type': 'application/json',
      'hosted-session-id': hostedSession.id,
      'hosted-session-private-token': hostedSession.private_token,
    },
  });

  const res = await req.json();
  res.quotes.forEach((q: any) => (q.total = parseFloat(q.total)));
  return res as QuoteRequest;
};

export const validateEstimateBody = async (
  config: ArtaJsConfig,
  estimateBody: EstimateBody
) => {
  await fetch(`https://${config.host}/estimate/validate`, {
    method: 'POST',
    body: JSON.stringify({ estimate: estimateBody }),
    headers: {
      Authorization: `${AUTH_KEY} ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
  });
};
