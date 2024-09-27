import type { TrackingConfig } from '../../../trackingConfig';
import { PendingIconBase } from '../icons/PendingIconBase';

export const PendingIcon = ({ config }: { config: TrackingConfig }) => {
  return (
    <div class="artajs__tracking__timeline__default__step__icon">
      <PendingIconBase config={config} />
      <div class="artajs__tracking__timeline__status__text__large">
        {config.text.pendingLabel}
      </div>
    </div>
  );
};
