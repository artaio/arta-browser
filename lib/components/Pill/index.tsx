import type { TrackingConfig } from '../../trackingConfig';
import type { ArtaPackage, Shipment } from '../TrackingDrawer';

interface PillProps {
  config: TrackingConfig;
  status: ArtaPackage['status'] | Shipment['status'];
}

export const Pill = ({ config, status }: PillProps) => {
  const pillStatus = status === 'in_transit' ? 'transit' : status;

  return (
    <div class="artajs__tracking__pill__wrapper">
      <div
        class="artajs__tracking__pill__round"
        style={{ background: config.pill[pillStatus].backgroundColor }}
      >
        <div
          class="artajs__tracking__pill__text"
          style={{ color: config.pill[pillStatus].textColor }}
        >
          {config.pill[pillStatus].text}
        </div>
      </div>
    </div>
  );
};
