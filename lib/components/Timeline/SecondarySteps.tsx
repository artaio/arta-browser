import { TrackingConfig } from '../../trackingConfig';

export const SecondarySteps = ({ config }: { config: TrackingConfig }) => {
  return (
    <div class="artajs__tracking__timeline__triple__dots">
      <svg
        width="29"
        height="26"
        viewBox="0 0 29 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="2.33325"
          cy="24"
          r="2"
          fill={config.style.color.iconTertiary}
        />
        <circle
          cx="10.3333"
          cy="24"
          r="2"
          fill={config.style.color.iconTertiary}
        />
        <circle
          cx="18.3333"
          cy="24"
          r="2"
          fill={config.style.color.iconTertiary}
        />
        <circle
          cx="26.3333"
          cy="24"
          r="2"
          fill={config.style.color.iconTertiary}
        />
      </svg>
    </div>
  );
};