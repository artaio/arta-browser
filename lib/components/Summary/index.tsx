import type { TrackingConfig } from '../../trackingConfig';
import type { Shipment } from '../TrackingDrawer';

export interface SummaryProps {
  shipment: Shipment;
  config: TrackingConfig;
}

export const Summary = ({ config, shipment }: SummaryProps) => {
  return (
    <div class="artajs__tracking__summary__wrapper">
      <div class="artajs__tracking__summary__content">
        <div class="artajs__tracking__summary__title">{shipment.shortcode}</div>
        {/* TODO: ask Dylan what to do/show here */}
        <div class="artajs__tracking__summary__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
          >
            <g clip-path="url(#clip0_2_4662)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 1.42308C3.19609 1.42308 0.923077 3.69609 0.923077 6.5C0.923077 9.30391 3.19609 11.5769 6 11.5769C8.80391 11.5769 11.0769 9.30391 11.0769 6.5C11.0769 3.69609 8.80391 1.42308 6 1.42308ZM0 6.5C0 3.18629 2.68629 0.5 6 0.5C9.31371 0.5 12 3.18629 12 6.5C12 9.81371 9.31371 12.5 6 12.5C2.68629 12.5 0 9.81371 0 6.5ZM7.00164 4.08971C6.45469 3.61112 5.54559 3.61112 4.99864 4.08971C4.8068 4.25756 4.51522 4.23812 4.34737 4.04629C4.17952 3.85446 4.19895 3.56288 4.39079 3.39502C5.28577 2.61192 6.71451 2.61192 7.60949 3.39502C8.54061 4.20975 8.54061 5.55948 7.60949 6.37421C7.45155 6.51241 7.27759 6.62561 7.09418 6.71437C6.67801 6.91578 6.46168 7.19057 6.46168 7.42308V7.88462C6.46168 8.13952 6.25504 8.34615 6.00014 8.34615C5.74524 8.34615 5.5386 8.13952 5.5386 7.88462V7.42308C5.5386 6.63598 6.19047 6.12624 6.69207 5.88349C6.80446 5.82909 6.90862 5.76092 7.00164 5.67952C7.51246 5.23256 7.51246 4.53667 7.00164 4.08971ZM5.53846 9.73077C5.53846 9.47587 5.7451 9.26923 6 9.26923H6.00462C6.25952 9.26923 6.46615 9.47587 6.46615 9.73077V9.73538C6.46615 9.99029 6.25952 10.1969 6.00462 10.1969H6C5.7451 10.1969 5.53846 9.99029 5.53846 9.73538V9.73077Z"
                fill="#6F6C65"
              />
            </g>
            <defs>
              <clipPath id="clip0_2_4662">
                <rect
                  width="12"
                  height="12"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div class="artajs__tracking__summary__date">
        {`${config.text.bookedLabel}${new Date(
          shipment.created_at
        ).toLocaleString()}`}
      </div>
    </div>
  );
};
