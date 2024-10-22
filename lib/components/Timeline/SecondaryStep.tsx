import type { TrackingConfig } from '../../trackingConfig';

export const SecondaryStep = ({ config }: { config: TrackingConfig }) => {
  return (
    <div class="artajs__tracking__timeline__minimal__secondary__step">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
      >
        <path
          d="M8 4C8 6.20914 6.20914 8 4 8C1.79086 8 0 6.20914 0 4C0 1.79086 1.79086 0 4 0C6.20914 0 8 1.79086 8 4Z"
          fill={config.style.color.iconSecondary}
        />
      </svg>
    </div>
  );
};
