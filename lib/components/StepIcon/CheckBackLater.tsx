import type { TrackingConfig } from '../../trackingConfig';

export const CheckBackLater = ({ config }: { config: TrackingConfig }) => {
  return (
    <div class="artajs__flex__wraper">
      <div class="artajs__drawer__step__check_back_later">
        {config.text.checkBackLater}
      </div>
    </div>
  );
};
