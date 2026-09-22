# arta-browser

arta-browser is a TypeScript SDK providing easy setup for Arta's Estimates and Tracking widgets and the Arta Pay checkout.

* Use [Arta Estimates](https://manual.arta.io/guides/solutions/no-code/estimates/estimates-widget) to dynamically generate shipping estimates (non-bookable) on your own website.
* Use [Arta Tracking](https://manual.arta.io/guides/solutions/no-code/post-sale/tracking) to easily present clear and up-to-date tracking information on your own website.
* Use [Arta Pay](#arta-pay-checkout) to let buyers pay a deposit and finance the rest with their Arta credit line, in a modal on your checkout page.

## Installation

### With `<script>` tag

Copy and paste the following snippet before the closing `</body>` HTML tag wherever you want the Estimates widget available for your users (typically on your product pages):

```html
<script
  src="https://cdn.jsdelivr.net/npm/@artaio/arta-browser@2.23.1/dist/bundle.js"
  integrity="sha384-Z3euTa2mVIbuvRrH9S3yGX3I3w3BlmrlMRpJGvrIIy5SCX6XLcfwVoVlKzTsTsCL"
  crossorigin="anonymous"
></script>
```

And once the above script is loaded the `Arta` object should be available.

The snippet pins the latest published version and verifies it with [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity); the version and `integrity` hash above are updated automatically on every release.

### With `npm`

In your project run
```
npm install @artaio/arta-browser
```

And you can then import `Arta` object for example:

```js
import Arta from '@artaio/arta-browser';
```

## Basic Usage

### For the Estimates widget

```jsx
// On page load, initialize the Arta SDK with your publishable API key
Arta.init('<YOUR_API_KEY>');

// Set up origin and object details, request preferences as well as
// your widget configuration overrides
const origin = {
  city: 'Brooklyn',
  region: 'NY',
  country: 'US',
  postal_code: '11249',
};

const objects = [
  {
    depth: 2,
    width: 36,
    height: 24,
    subtype: 'painting_unframed',
    unit_of_measurement: 'in',
    value_currency: 'USD',
    value: 500.0,
  },
];

const requestPreferences = { currency: 'EUR' };

const widgetConfig = {
  style: {
    position: 'center',
    pricingDisplay: 'range',
  },
};

// Setup an instance of the estimates widget
const estimate = Arta.estimate(
  { origin, objects, requestPreferences },
  widgetConfig
);

// Validate the widget before rendering it
await esimate.validate();

// `estimate.isReady` will be true if validations pass and false if
// they do not. You can choose to render a button to open the widget
// when the widget has been validated.
//
// `estimate.open()` will render the widget on your page.
esimate.isReady && (
  <Button onClick={() => estimate.open()}>Estimate Shipping</Button>
);

```

The Arta Estimates widget has many configuration options to customize the look and feel of the widget. You can view the full list of options in [/lib/estimateConfig.ts](/lib/estimateConfig.ts) and view a live demo at [manual.arta.io/estimates-demo](https://manual.arta.io/estimates-demo/).

For additional examples using different frontend frameworks please check out [artaio/arta-browser-examples on GitHub](https://github.com/artaio/arta-browser-examples).

### For the Tracking widget

```jsx
// On page load, initialize the Arta SDK with your publishable API key
Arta.init('<YOUR_API_KEY>');

// Optionally, build your Tracking widget configuration
const config = {
  animation: {
    in: {
      type: 'slide',
      duration: 500,
      easing: 'ease-in-out',
    },
    out: {
      type: 'slide',
      duration: 250,
      easing: 'ease-in-out',
    },
  },
  style: {
    color: {
      iconPrimary: 'blue',
    },
  },
};

// Setup an instance of the tracking widget
const tracking = Arta.tracking('<SHIPMENT_ID>', config);

// Validate the widget before rendering it
await tracking.validate();
// `tracking.isReady` will be true if validations pass and false if
// they do not. You can choose to render a button to open the widget
// when the widget has been validated.
//
// `tracking.open()` will render the widget on your page.
tracking.isReady && <Button onClick={() => tracking.open()}>Track</Button>;
```

The Arta Tracking widget has many configuration options to customize the look and feel of the widget. You can view the full list of options in [/lib/trackingConfig.ts](/lib/trackingConfig.ts).

### Arta Pay checkout

Arta Pay lets a buyer pay a deposit on your order and finance the rest with their Arta credit line, in an Arta-hosted modal on your page. It has a server half and a page half:

1. **Your server** creates a purchase request with your **private** API key (`POST https://api.arta.io/purchase_requests`, with the order amounts, buyer email and line items) and gets back an `id` and a short-lived `client_token`. Pass only `{ purchaseRequestId, clientToken }` to the page — the private key never leaves your server.
2. **Your page** initializes with your **public** key and opens the checkout:

```js
Arta.init('<PUBLIC_KEY>');

const checkout = Arta.pay(
  { purchaseRequestId, clientToken },
  {
    onReady: () => (payButton.disabled = false),
    onComplete: ({ purchaseRequestId, purchaseId, status }) => {
      // status: 'confirmed' | 'processing' | 'declined' — confirm server-side
    },
    onClose: ({ reason }) => {}, // 'customer' | 'complete' | 'error'
    onError: ({ code, message, recoverable }) => {},
  },
  { position: 'center' }
);

payButton.addEventListener('click', () => checkout.open());
```

The widget mounts hidden and validates the purchase request, so `onReady` means "ready to open". `open()` shows the modal, `close()` hides it (reopening resumes) and `destroy()` removes it. `onComplete` fires once when the outcome is known; the callbacks are advisory, so confirm the order server-side with `GET /purchase_requests/:id`. `position` accepts `'center'` (default), `'left'`, `'right'` or `'full_screen'`. The `PayCompletion`, `PayCloseEvent` and `PayError` types are exported from the package.

## Contributing

Please ensure that all the examples available on [github.com/artaio/arta-browser-examples](https://github.com/artaio/arta-browser-examples) are still working before opening a PR.

### Development

To develop a new function on the SDK, run `npm install` to install all the dependencies and then run `npm run build` and the compiled JS code will be stored in the `dist/` folder which is the folder with the content published to NPM.

Please be aware that the current CI setup publishes both the compiled JS code and the bundled version. Then, we use https://www.jsdelivr.com/ to distribute the bundled version stored in NPM.
