### Pre-release notice

arta-browser is in a pre-release beta. The package's API is unstable and expected to change prior to public release. Please only make use of the package in coordination with ARTA during this period.

# arta-browser

Our Estimates widget allows you to display non-bookable shipping estimates to your customers during the product discovery phase, in order to give your customers the all-in cost insights they’re looking for. Our mobile-friendly javascript widget is easy to set up and is designed to reduce drop-offs, caused by surprise shipping costs, further down the conversion funnel.

- Quick setup
- Performant - ARTA provides estimates across all service tiers in under two seconds on average.
- Works across devices - mobile friendly layout works well across a wide variety of view ports.
- Insurance & White Glove Services - estimates will reflect Insurance and white glove services if requested.
- Global - get cost estimates for shipping across the globe.

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
