import { useState } from 'preact/hooks';
import { ArtaLocation } from '../../MetadataTypes';
import { withoutPostal } from './countriesWithoutPostalCode';
import { countries } from '../../fixtures/countries';

interface DestinationTextConfig {
  destinationDescriptionLabel: string;
  destinationButtonText: string;
  destinationCountryLabel: string;
  destinationZipLabel: string;
  destinationCityLabel: string;
  detailOriginLabel: string;
}

interface DestinationOpts {
  parsedOrigin: string;
  textConfig: DestinationTextConfig;
  setDestination: (location: ArtaLocation) => void;
}

export const Destination = ({
  parsedOrigin,
  textConfig,
  setDestination,
}: DestinationOpts) => {
  const [country, setCountry] = useState('US');
  const [isWithoutPostal, setIsWithoutPostal] = useState(false);
  const [postalCode, setPostalCode] = useState('');

  const isDestinationError = false;
  const enabled = true;

  const onCountryChange = (e: any) => {
    setCountry(e.target.value);

    if (withoutPostal.has(e.target.value)) {
      setIsWithoutPostal(true);
      setPostalCode('');
    }
  };

  const onPostalCodeInput = (e: any) => {
    setPostalCode(e.target.value);
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    setDestination({
      postal_code: postalCode,
      country,
    });
  };

  return (
    <div className="artajs__modal__form">
      <p class="artajs__modal__form__row__context">
        {textConfig.destinationDescriptionLabel}
      </p>
      <p class="artajs__modal__form__row__location">
        {parsedOrigin ? (
          <span>
            <span class="artajs__modal__capitalize">{parsedOrigin}</span>{' '}
            <span class="artajs__modal__form__light">{textConfig.detailOriginLabel}</span>
          </span>
        ) : (
          <span>...</span>
        )}
      </p>
      <form onSubmit={onFormSubmit}>
        <div className="artajs__modal__form__row">
          <label
            class={`artajs__modal__textfield__outlined ${
              isDestinationError
                ? 'artajs__modal__textfield__outlined__error'
                : ''
            }`}
            for="country"
          >
            <select
              id="country"
              onChange={onCountryChange}
              placeholder=" "
              value={country}
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            <span>{textConfig.destinationCountryLabel}</span>
          </label>
        </div>

        <div className="artajs__modal__form__row">
          <label
            class={`artajs__modal__textfield__outlined ${
              isDestinationError
                ? 'artajs__modal__textfield__outlined__error'
                : ''
            }`}
            for="postal_code"
          >
            <input
              id="postal_code"
              onInput={onPostalCodeInput}
              placeholder=" "
              type="text"
              value={postalCode}
            />
            <span>
              {isWithoutPostal
                ? textConfig.destinationCityLabel
                : textConfig.destinationZipLabel}
            </span>
          </label>
        </div>

        <div className="artajs__modal__form__row">
          <button
            disabled={!enabled || postalCode === '' ? true : false}
            type="submit"
          >
            {textConfig.destinationButtonText}
            <div class="artajs__modal__form__arrow__container">
              <svg
                width="20"
                height="8"
                viewBox="0 0 20 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.4144 0.292893C16.0239 -0.0976312 15.3907 -0.0976313 15.0002 0.292893C14.6096 0.683417 14.6096 1.31658 15.0002 1.70711L16.193 2.90002L1.00008 2.90002C0.44779 2.90002 7.61476e-05 3.34774 7.61235e-05 3.90002C7.60993e-05 4.45231 0.44779 4.90002 1.00008 4.90002L16.1501 4.90002L15.0001 6.05003C14.6096 6.44055 14.6096 7.07372 15.0001 7.46424C15.3906 7.85477 16.0238 7.85477 16.4143 7.46424L20 3.87861L16.4144 0.292893Z"
                  fill="white"
                />
              </svg>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};
