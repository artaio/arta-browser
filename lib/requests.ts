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
}

/**
 * One failure shape for every way a request can fail, so a caller has a single
 * thing to handle rather than a transport error and a response error. `status`
 * is the HTTP status where there was a response, and `NO_RESPONSE` where the
 * request never reached the server at all.
 */
export interface ArtaError {
  status: number;
  statusText?: string;
  /** The request that failed. */
  url: string;
  errors: { [key: string]: string };
}

/**
 * A request either resolves with its payload or with an `err`. Keeping `err`
 * required on its own branch is what makes the union narrow: an optional `err?`
 * on the payload type does not, because the truthiness of an optional property
 * never narrows its parent.
 */
export interface ArtaErrorResult {
  err: ArtaError;
}

export type ArtaResult<T> = T | ArtaErrorResult;

/**
 * Checks the shape of `err` rather than just its presence. A bare `'err' in res`
 * would classify a success payload that happens to carry an `err` key as a
 * failure, and would narrow `{ err: 'boom' }` to a type whose `err.errors` does
 * not exist — so consumers reading `err.errors` would throw. Every failure this
 * module produces sets a numeric `status`, so that is the discriminant.
 */
export const isArtaError = (res: unknown): res is ArtaErrorResult => {
  if (typeof res !== 'object' || res === null || !('err' in res)) {
    return false;
  }
  const { err } = res as { err: unknown };
  return (
    typeof err === 'object' &&
    err !== null &&
    typeof (err as ArtaError).status === 'number'
  );
};

const AUTH_KEY = 'ARTA_APIKey';

/** No HTTP status exists when the request never reached the server. */
const NO_RESPONSE = 0;

/**
 * Both validators reject only when the error map has keys, so an error response
 * whose body omits `errors` — or sends it empty — must not produce an empty map
 * here: that would mark the widget ready on a failed request.
 */
const errorsOrFallback = (
  errors: unknown,
  res: Response
): ArtaError['errors'] => {
  if (
    typeof errors === 'object' &&
    errors !== null &&
    Object.keys(errors).length > 0
  ) {
    return errors as ArtaError['errors'];
  }
  return { detail: res.statusText || `HTTP ${res.status}` };
};

/**
 * A 401 has several indistinguishable causes: a missing or malformed key, an
 * unknown or revoked one, a private API key used in the browser, an origin the
 * key does not allow, and organization-level paths besides. Only the origin is
 * something the SDK can see, so name it and let the integrator rule it out.
 */
const unauthorizedHint = (): string => {
  const causes =
    'The other causes are a missing, unknown or revoked key, or a private API ' +
    'key used in the browser.';

  if (typeof location === 'undefined') {
    return causes;
  }

  // Browsers disagree on what a file:// page reports: Firefox gives 'null',
  // Chromium and Safari give 'file://'. Anything that is not http(s) cannot be
  // an allowlist entry, so treat them all as the opaque case.
  if (!/^https?:\/\//.test(location.origin)) {
    return (
      'This page has no usable origin, which a publishable API key with valid ' +
      'origin domains configured always rejects. Pages opened from the ' +
      `filesystem and sandboxed iframes both do this (this page reports ` +
      `"${location.origin}"). ${causes}`
    );
  }

  return (
    'If this key has valid origin domains configured, it must include the ' +
    `hostname ${location.hostname} (this page is ${location.origin}). ` +
    causes
  );
};

const logError = ({ status, errors, url }: ArtaError): void => {
  const keys = Object.keys(errors ?? {});
  if (status === 401) {
    console.error(
      `Arta: request not authorized. ${unauthorizedHint()}`,
      errors
    );
  } else if (url) {
    console.error(`Request to ${url} failed`, errors);
  } else if (status === 403) {
    // 403 means the credential is recognised but the organization is not
    // entitled, which the old 'Invalid API Key' wording had backwards — and it
    // is the organization, not the key, so say so or the reader rotates a key
    // that was never the problem.
    console.error(
      'Arta: your Arta organization is not permitted to make that request.',
      errors
    );
  } else if (status === 422) {
    keys.map((key) => {
      console.error(`${key} ${errors[key]}`);
    });
  } else if (status === 400) {
    keys.map((key) => {
      console.error(`${key} ${errors[key]}`);
    });
  } else {
    console.error('Unknown error', status, errors);
  }
};

const artaRequest = async <T>(
  path: string,
  config: ArtaJsFullConfig,
  body?: string,
  headers?: any,
  method: 'POST' | 'GET' = 'POST'
): Promise<ArtaResult<T>> => {
  const schema = config.httpSchema ? config.httpSchema : 'https';
  const url = `${schema}://${config.host}${path}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      body,
      headers: {
        ...headers,
        Authorization: `${AUTH_KEY} ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    // fetch rejects before any status exists: offline, DNS failure, or the
    // request blocked by the browser or an extension.
    const err: ArtaError = {
      status: NO_RESPONSE,
      url,
      errors: { request: e instanceof Error ? e.message : String(e) },
    };
    logError(err);
    return { err };
  }

  let resBody: any;
  try {
    resBody = await res.json();
  } catch (e) {
    // A proxy, WAF or captive portal in front of the API can answer with
    // something that is not JSON, on a success status as readily as an error.
    // The parse error names what arrived, so keep it.
    const err: ArtaError = {
      status: res.status,
      statusText: res.statusText,
      url,
      errors: { response: e instanceof Error ? e.message : String(e) },
    };
    logError(err);
    return { err };
  }

  if (!res.ok) {
    const err: ArtaError = {
      errors: errorsOrFallback(resBody?.errors, res),
      status: res.status,
      statusText: res.statusText,
      url,
    };
    logError(err);
    return { err };
  }

  return resBody as T;
};

export const loadHostedSessions = async (
  config: ArtaJsFullConfig,
  estimateBody: EstimateBody
): Promise<ArtaResult<HostedSession>> => {
  const path = '/estimate/hosted_sessions';
  const body = JSON.stringify({ hosted_session: estimateBody });
  return await artaRequest<HostedSession>(path, config, body);
};

export const loadQuoteRequests = async (
  config: ArtaJsFullConfig,
  hostedSession: HostedSession,
  estimateBody: EstimateBody
): Promise<ArtaResult<QuoteRequest>> => {
  const path = '/estimate/requests';
  const body = JSON.stringify({ request: estimateBody });
  const headers = {
    'hosted-session-id': hostedSession.id,
    'hosted-session-private-token': hostedSession.private_token,
  };
  const res = await artaRequest<QuoteRequest>(path, config, body, headers);
  if (isArtaError(res)) {
    return res;
  }
  res.quotes && res.quotes.forEach((q: any) => (q.total = parseFloat(q.total)));
  return res;
};

export const validateEstimateBody = async (
  config: ArtaJsFullConfig,
  estimateBody: EstimateBody
): Promise<ArtaError['errors'] | undefined> => {
  const path = '/estimate/validate';
  const body = JSON.stringify({ estimate: estimateBody });
  const res = await artaRequest<unknown>(path, config, body);
  return isArtaError(res) ? res.err.errors : undefined;
};

export const loadShipment = async (
  config: ArtaJsFullConfig,
  shipmentId: string
): Promise<ArtaResult<Shipment>> => {
  const path = `/embedded_tracking/shipments/${shipmentId}`;
  return await artaRequest<Shipment>(path, config, undefined, undefined, 'GET');
};

export const validateShipment = async (
  config: ArtaJsFullConfig,
  shipmentId: string
): Promise<ArtaError['errors'] | undefined> => {
  const path = `/embedded_tracking/shipments/${shipmentId}/validate`;
  const res = await artaRequest<unknown>(
    path,
    config,
    undefined,
    undefined,
    'GET'
  );
  return isArtaError(res) ? res.err.errors : undefined;
};

export const loadPackageEvents = async (
  config: ArtaJsFullConfig,
  shipmentId: string,
  packageId: number
): Promise<ArtaResult<Array<ArtaPackageEvent>>> => {
  const path = `/embedded_tracking/package_events/${shipmentId}/${packageId}`;
  return await artaRequest<Array<ArtaPackageEvent>>(
    path,
    config,
    undefined,
    undefined,
    'GET'
  );
};
