# arta-browser

arta-browser is a TypeScript SDK providing easy setup for Arta's Estimates and Tracking widgets.

- Use [Arta Estimates](https://manual.arta.io/guides/solutions/no-code/estimates/estimates-widget) to dynamically generate shipping estimates (non-bookable) on your own website.
- Use [Arta Tracking](https://manual.arta.io/guides/solutions/no-code/post-sale/tracking) to easily present clear and up-to-date tracking information on your own website.

## Installation

### With `<script>` tag

Copy and paste the following snippet before the closing `</body>` HTML tag wherever you want the Estimates widget available for your users (typically on your product pages):

```html
<script
  src="https://cdn.jsdelivr.net/npm/@artaio/arta-browser@2.21.0/dist/bundle.js"
  integrity="sha384-7yoeTFjiPMPBNLL6OKE29dbCc1j34h1VH9u2EF5ONy/0nS5ppCY844RQ5ZdtMSRG"
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

// Validate the widget before rendering it. validate() rejects if the request
// fails — a bad API key, a domain the key does not allow, an outage — so catch
// it, or the rejection propagates into your own code.
try {
  await estimate.validate();
} catch (errors) {
  console.error('Arta estimate unavailable', errors);
}

// `estimate.isReady` will be true if validations pass and false if
// they do not. You can choose to render a button to open the widget
// when the widget has been validated.
//
// `estimate.open()` will render the widget on your page.
estimate.isReady && (
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

// Validate the widget before rendering it. validate() rejects when every
// shipment fails to validate, with an array of { shipmentId, errors }.
try {
  await tracking.validate();
} catch (failures) {
  console.error('Arta tracking unavailable', failures);
}
// `tracking.isReady` will be true if validations pass and false if
// they do not. You can choose to render a button to open the widget
// when the widget has been validated.
//
// `tracking.open()` will render the widget on your page.
tracking.isReady && <Button onClick={() => tracking.open()}>Track</Button>;
```

The Arta Tracking widget has many configuration options to customize the look and feel of the widget. You can view the full list of options in [/lib/trackingConfig.ts](/lib/trackingConfig.ts).

## Restricting a publishable API key to your domains

A publishable API key can optionally be restricted to a list of domains, so that
a key copied out of your page source is not usable on another website. The list
lives on the key and is set through the API keys endpoints; a key with an empty
list works from anywhere, which is the default. Up to ten entries per key, and
only on publishable keys.

Matching is on the **domain only**. Neither the port nor the scheme is part of
it, so one entry covers every port you serve on and admits `http` as readily as
`https` — this restricts _where_ a key may be used, not how. An entry is either
an exact hostname (`shop.example.com`) or a wildcard (`*.example.com`, matching
any depth of subdomain but not `example.com` itself). Entries are matched
case-insensitively.

Two things worth knowing before you turn it on. The `Origin` header is set by the
browser, so this reliably stops a key being reused on another website, but it is
not a secret: a non-browser client can send whatever it likes. And because a
request with no origin is rejected, a non-empty list also blocks server-side and
command-line use of that key.

Note that `origin` means two different things here. The HTTP `Origin` header,
which the browser sets and this restriction matches against, is unrelated to the
`origin` in `estimateBody` above, which is where a shipment is collected from.

### Local development

An entry has to be a hostname — at least one dot, and not an IP address. So
neither `localhost` nor `127.0.0.1` can be used. A dotted hostname that resolves
to loopback works, so you do not need a second key:

- `lvh.me` or `app.lvh.me` — public DNS pointing at `127.0.0.1`, so it works in
  every browser with no setup
- `app.localhost` — resolves to loopback in Chrome and Firefox without any
  setup, though Safari does not resolve it
- `myapp.test` — with an entry in your `/etc/hosts`

Since ports are not matched, one entry covers `http://lvh.me:3000`,
`http://lvh.me:8080`, and so on.

### What happens when a request is rejected

The API answers `401`. Because the restriction also covers the validation
endpoints, `validate()` rejects — so the widget never becomes ready, and gating
on `isReady` keeps your button hidden. Catch the rejection, as the examples
above do, or it propagates into your own code.

The SDK logs the possible causes to the console, and names the hostname to add
if an origin restriction is what rejected it. It cannot tell you that for
certain: a `401` means the same thing for a missing key, an unknown or revoked
key, a private API key used in the browser, and a disallowed origin.

Pages opened directly from the filesystem (`file://`) and sandboxed iframes send
`Origin: null`, which a key with domain restrictions always rejects. The SDK
detects that case and says so.

## Contributing

Please ensure that all the examples available on [github.com/artaio/arta-browser-examples](https://github.com/artaio/arta-browser-examples) are still working before opening a PR.

### Development

To develop a new function on the SDK, run `npm install` to install all the dependencies and then run `npm run build` and the compiled JS code will be stored in the `dist/` folder which is the folder with the content published to NPM.

Please be aware that the current CI setup publishes both the compiled JS code and the bundled version. Then, we use https://www.jsdelivr.com/ to distribute the bundled version stored in NPM.
