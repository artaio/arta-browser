import { type ArtaJsFullConfig } from './arta';

// Created server-side by the seller with its private API key
// (`POST /purchase_requests`). The client token is short-lived (15 min) and
// only ever travels to the widget over postMessage, never in a URL.
export interface PayInput {
  purchaseRequestId: string;
  clientToken: string;
}

// Outcome vocabulary shared with the widget (protocol v2) and the seller
// integration reference. `confirmed` = deposit charged, purchase active;
// `processing` = deposit charge still settling (ACH); `declined` is reserved
// and not emitted by the widget yet.
export const PAY_COMPLETION_STATUSES = [
  'confirmed',
  'processing',
  'declined',
] as const;

export type PayCompletionStatus = typeof PAY_COMPLETION_STATUSES[number];

export interface PayCompletion {
  purchaseRequestId: string;
  // Present once ag has created the purchase (`confirmed`/`processing`).
  purchaseId?: string;
  status: PayCompletionStatus;
}

export const PAY_CLOSE_REASONS = ['customer', 'complete', 'error'] as const;

export type PayCloseReason = typeof PAY_CLOSE_REASONS[number];

export interface PayCloseEvent {
  purchaseRequestId: string;
  reason: PayCloseReason;
}

export interface PayError {
  code: string;
  message: string;
  // `false` means the checkout cannot continue with this purchase request
  // (expired/claimed/cancelled token, ineligible org, ...). The SDK closes the
  // modal and reports `onClose {reason: 'error'}` for those.
  recoverable: boolean;
  // Server-side correlation id when the widget has one.
  requestId?: string;
}

// All callbacks are advisory. `onReady` means the widget validated the
// purchase request context and can be opened; `onComplete` fires as soon as
// the outcome is known, before the buyer dismisses the widget. Confirm the
// final state server-side with `GET /purchase_requests/:id`.
export interface PayCallbacks {
  onReady?: () => void;
  onComplete?: (result: PayCompletion) => void;
  onClose?: (event: PayCloseEvent) => void;
  onError?: (error: PayError) => void;
}

export type PayPosition = 'center' | 'full_screen' | 'left' | 'right';

// Where the Arta-hosted modal lives on the seller's page. Same vocabulary as
// the estimate widget's position option.
export interface PayConfig {
  position: PayPosition;
}

export type PartialPayConfig = Partial<PayConfig>;

// `payOrigin` (from `Arta.init`'s config) is the origin that serves the
// widget document and the first-party sign-in pages. It defaults to
// production and is only meant to be overridden for local development and QA
// environments.
export interface PayFullConfig extends PayConfig, ArtaJsFullConfig {}

const defaultPayConfig: PayConfig = {
  position: 'center',
};

export const getFullPayConfig = (
  artaConfig: ArtaJsFullConfig,
  payConfig: PartialPayConfig = {}
): PayFullConfig => {
  return Object.assign({}, defaultPayConfig, artaConfig, payConfig);
};

export const DEFAULT_PAY_ORIGIN = 'https://collectors.arta.io';
