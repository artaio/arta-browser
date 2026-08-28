import {
  PAY_CLOSE_REASONS,
  PAY_COMPLETION_STATUSES,
  type PayCloseReason,
  type PayCompletionStatus,
  type PayError,
  type PayPosition,
} from './payConfig';

// postMessage protocol between the SDK (seller page) and the widget iframe.
// Both repos must agree on this number: the SDK announces it in `init` and
// the widget in `handshake`. v2 = checkout mode (outcome statuses, `open`).

// ---------------------------------------------------------------------------
// Widget iframe -> SDK
// ---------------------------------------------------------------------------

export interface PayHandshakeMessage {
  type: 'arta-pay:handshake';
}

// Sent only after the widget validated the purchase request context
// (`POST /artapay-widget/api/context` succeeded). Maps to `onReady`.
export interface PayReadyMessage {
  type: 'arta-pay:ready';
}

export interface PayResizeMessage {
  type: 'arta-pay:resize';
  height: number;
}

// Sent the moment the outcome screen renders, before the buyer clicks
// "Return to seller".
export interface PayCompleteMessage {
  type: 'arta-pay:complete';
  purchaseRequestId: string;
  purchaseId?: string;
  status: PayCompletionStatus;
}

export interface PayCloseMessage {
  type: 'arta-pay:close';
  purchaseRequestId: string;
  reason: PayCloseReason;
}

export interface PayErrorMessage {
  type: 'arta-pay:error';
  code: string;
  message: string;
  recoverable: boolean;
  requestId?: string;
}

export type PayInboundMessage =
  | PayHandshakeMessage
  | PayReadyMessage
  | PayResizeMessage
  | PayCompleteMessage
  | PayCloseMessage
  | PayErrorMessage;

export type PayInboundMessageType = PayInboundMessage['type'];

// ---------------------------------------------------------------------------
// SDK -> widget iframe
// ---------------------------------------------------------------------------

export interface PayInitMessage {
  type: 'arta-pay:init';
  purchaseRequestId: string;
  clientToken: string;
  // Lets the widget stretch to the frame for side panels / full screen while
  // the centered modal follows the widget's content height.
  position: PayPosition;
}

// The modal became visible; the widget (re)bootstraps its state.
export interface PayOpenMessage {
  type: 'arta-pay:open';
}

// Escape/backdrop. The widget owns the close decision and answers with
// `arta-pay:close` (or ignores it while a payment is processing).
export interface PayCloseRequestMessage {
  type: 'arta-pay:close-request';
}

export type PayOutboundMessage =
  | PayInitMessage
  | PayOpenMessage
  | PayCloseRequestMessage;

export type PayOutboundMessageType = PayOutboundMessage['type'];

// ---------------------------------------------------------------------------
// Parsing. Anything can arrive over postMessage, so the SDK narrows the raw
// data on the `type` discriminator first and validates each payload
// separately: the parsers return `undefined` (or a safe default) instead of
// trusting the shape.
// ---------------------------------------------------------------------------

const INBOUND_TYPES: readonly string[] = [
  'arta-pay:handshake',
  'arta-pay:ready',
  'arta-pay:resize',
  'arta-pay:complete',
  'arta-pay:close',
  'arta-pay:error',
];

export interface RawPayMessage {
  type: PayInboundMessageType;
  [key: string]: unknown;
}

const isRecord = (data: unknown): data is Record<string, unknown> =>
  typeof data === 'object' && data !== null;

const optionalString = (value: unknown): string | undefined =>
  typeof value === 'string' && value.length > 0 ? value : undefined;

export const isPayInboundMessage = (data: unknown): data is RawPayMessage => {
  return (
    isRecord(data) &&
    typeof data.type === 'string' &&
    INBOUND_TYPES.indexOf(data.type) !== -1
  );
};

export const parseResizeHeight = (data: unknown): number | undefined => {
  if (!isRecord(data)) {
    return undefined;
  }
  const height = data.height;
  return typeof height === 'number' && isFinite(height) && height > 0
    ? height
    : undefined;
};

export interface ParsedCompletion {
  purchaseRequestId?: string;
  purchaseId?: string;
  status: PayCompletionStatus;
}

// `undefined` for anything that is not a v2 outcome (including the v1
// `authenticated` signal).
export const parseCompletion = (
  data: unknown
): ParsedCompletion | undefined => {
  if (!isRecord(data)) {
    return undefined;
  }
  const status = data.status;
  if (
    typeof status !== 'string' ||
    (PAY_COMPLETION_STATUSES as readonly string[]).indexOf(status) === -1
  ) {
    return undefined;
  }
  if (data.purchaseId !== undefined && typeof data.purchaseId !== 'string') {
    return undefined;
  }
  return {
    purchaseRequestId: optionalString(data.purchaseRequestId),
    purchaseId: optionalString(data.purchaseId),
    status: status as PayCompletionStatus,
  };
};

// Never returns `undefined`: an error message with a broken payload is still
// an error worth reporting, so malformed fields fall back to safe defaults
// (`unknown`, non-recoverable).
export const parseError = (data: unknown): PayError => {
  const record = isRecord(data) ? data : {};
  return {
    code: optionalString(record.code) ?? 'unknown',
    message: optionalString(record.message) ?? 'Unknown error',
    recoverable: record.recoverable === true,
    requestId: optionalString(record.requestId),
  };
};

export const parseCloseReason = (data: unknown): PayCloseReason => {
  if (!isRecord(data)) {
    return 'customer';
  }
  const reason = data.reason;
  return typeof reason === 'string' &&
    (PAY_CLOSE_REASONS as readonly string[]).indexOf(reason) !== -1
    ? (reason as PayCloseReason)
    : 'customer';
};

export const postPayMessage = (
  target: Window,
  targetOrigin: string,
  message: PayOutboundMessage
): void => {
  target.postMessage(message, targetOrigin);
};
