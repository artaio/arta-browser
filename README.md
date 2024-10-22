# arta-browser

arta-browser is a TypeScript SDK providing easy setup for Arta's Estimates and Tracking widgets.

* [Arta Estimates](https://manual.arta.io/guides/solutions/no-code/estimates/estimates-widget) to dynamically generate shipping estimates (non-bookable) on your own website.
* [Arta Tracking](https://manual.arta.io/guides/solutions/no-code/post-sale/tracking) to easily present clear and up-to-date tracking information on your own website.

## Installation

### With `<script>` tag

Copy and paste the following snippet before the closing `</body>` HTML tag wherever you want the Estimates widget available for your users (typically on your product pages):

```
<script src="https://cdn.jsdelivr.net/npm/@artaio/arta-browser@latest/dist/bundle.js"></script>
```

And once the above script is loaded the `Arta` object should be available.

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
    city: "Brooklyn",
    region: "NY",
    country: "US",
    postal_code: "11249"
  }

const objects = [
    {
      depth: 2,
      width: 36,
      height: 24,
      subtype: "painting_unframed",
      unit_of_measurement: "in",
      value_currency: "USD",
      value: 500.00
    }
  ]

const requestPreferences = {currency: "EUR"};

const widgetConfig = {
  style: {
    position: "center",
    pricingDisplay: "range",
  },
};

// Setup an instance of the estimates widget
const estimate = Arta.estimate({origin, objects, requestPreferences}, widgetConfig);

// Validate the widget before rendering it
await esimate.validate();

// `estimate.isReady` will be true if validations pass and false if
// they do not. You can choose to render a button to open the widget
// when the widget has been validated.
//
// `estimate.open()` will render the widget on your page.
esimate.isReady && <Button onClick={() => estimate.open()}>Estimate Shipping</Button>
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
      type: "slide",
      duration: 500,
      easing: "ease-in-out",
    },
    out: {
      type: "slide",
      duration: 250,
      easing: "ease-in-out",
    },
  },
  style: {
    color: {
        iconPrimary: "blue"
      }
    }
  }

// Setup an instance of the tracking widget
const tracking = Arta.tracking('<SHIPMENT_ID>', config);

// Validate the widget before rendering it
await tracking.validate();
// `estimate.isReady` will be true if validations pass and false if
// they do not. You can choose to render a button to open the widget
// when the widget has been validated.
//
// `estimate.open()` will render the widget on your page.
tracking.isReady && <Button onClick={() => tracking.open()}>Track</Button>
```

The Arta Tracking widget has many configuration options to customize the look and feel of the widget. You can view the full list of options in [/lib/trackingConfig.ts](/lib/trackingConfig.ts).

## Contributing

Please ensure that all the examples available on https://github.com/artaio/arta-browser-examples are still working before opening a PR.

### Development

To develop a new function on the SDK, run `npm install` to install all the dependencies and then run `npm run build` and the compiled JS code will be stored in the `dist/` folder which is the folder with the content published to NPM.

Please be aware that the current CI setup publishes both the compiled JS code and the bundled version. Then, we use https://www.jsdelivr.com/ to distribute the bundled version stored in NPM.
