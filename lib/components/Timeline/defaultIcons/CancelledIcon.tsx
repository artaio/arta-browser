import type { TrackingConfig } from '../../../trackingConfig';
import { CancelledIconBase } from '../icons/CancelledIconBase';

export const CancelledIcon = ({ config }: { config: TrackingConfig }) => {
  return (
    <div class="artajs__tracking__timeline__default__step__icon">
      <CancelledIconBase config={config} />
      <div class="artajs__tracking__timeline__status__text__large">
        {config.text.cancelledLabel}
      </div>
    </div>
  );
};
