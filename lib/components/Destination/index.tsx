import { useState } from 'preact/hooks';
import { ArtaLocation } from '../../MetadataTypes';
import { withoutPostal } from './countriesWithoutPostalCode';
import { countries } from '../../fixtures/countries';

export interface DestinationTextConfig {
  descriptionLabel: string;
  buttonText: string;
  countryLabel: string;
  zipLabel: string;
  cityLabel: string;
}

export interface DestinationFullTextConfig extends DestinationTextConfig {
  detailOriginLabel: string;
  background: string;
}

export const defaultDestinationConfig = {
  descriptionLabel: 'Get a cost estimate to ship these goods from:',
  buttonText: 'Get Costs',
  countryLabel: 'Country',
  zipLabel: 'Destination Postal/Zip Code',
  cityLabel: 'Destination City',
};

interface DestinationOpts {
  parsedOrigin: string;
  textConfig: DestinationFullTextConfig;
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
    } else {
      setIsWithoutPostal(false);
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
        {textConfig.descriptionLabel}
      </p>
      <p class="artajs__modal__form__row__location">
        {parsedOrigin ? (
          <span>
            <strong class="artajs__modal__capitalize">{parsedOrigin}</strong>{' '}
            <span class="artajs__modal__form__light">
              {textConfig.detailOriginLabel}
            </span>
          </span>
        ) : (
          <span>...</span>
        )}
      </p>
      <form onSubmit={onFormSubmit}>
        <div className="artajs__modal__form__row">
          <strong className="artajs__modal__form__label">{textConfig.countryLabel}</strong>
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
          </label>
        </div>

        <div className="artajs__modal__form__row">
          <strong className="artajs__modal__form__label">
            {isWithoutPostal ? textConfig.cityLabel : textConfig.zipLabel}
          </strong>
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

          </label>
        </div>

        <div className="artajs__modal__form__row">
          <button
            disabled={!enabled || postalCode === '' ? true : false}
            type="submit"
          >
            {textConfig.buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};
