# arta-browser

arta-browser is a TypeScript SDK providing easy setup for Arta's Estimates widget.

[Arta Estimates](https://manual.arta.io/guides/solutions/no-code/estimates/estimates-widget) enables Arta's clients to dynamically generate shipping estimates (non-bookable) for their customers.

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

### Basic Usage
```jsx
import Arta from '@artaio/arta-browser';

// On load
Arta.init('<YOUR_API_KEY>');
... // Your code
```

#### For Estimates widget
```jsx
// On widget display
const estimate = Arta.estimate({origin, objects}, config); // check types for more details
await esimate.validate(); // mandatory for setting estimate.isReady

// estimate.open() will render the widget
esimate.isReady && <Button onClick={() => estimate.open()}>
```

#### For Tracking widget
```jsx
// On widget display
const shipmentId = '450727fa-9036-4252-8a86-02af6f09caa6'; // arta shipment UUId
const tracking = Arta.tracking(shipmentId, config); // check types for more details
await esimate.validate(); // mandatory for setting tracking.isReady

// tracking.open() will render the widget
esimate.isReady && <Button onClick={() => tracking.open()}>
```

For more details and examples using different frontend frameworks please check https://github.com/artaio/arta-browser-examples.

## Contributing

Please ensure that all the examples available on https://github.com/artaio/arta-browser-examples are still working before opening a PR.

### Development

To develop a new function on the SDK, run `npm install` to install all the dependencies and then run `npm run build` and the compiled JS code will be stored in the `dist/` folder which is the folder with the content published to NPM.

Please be aware that the current CI setup publishes both the compiled JS code and the bundled version. Then, we use https://www.jsdelivr.com/ to distribute the bundled version stored in NPM.
