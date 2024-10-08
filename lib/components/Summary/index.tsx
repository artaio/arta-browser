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
      </div>
      <div class="artajs__tracking__summary__date">
        {`${config.text.bookedLabel}${new Date(
          shipment.created_at
        ).toLocaleString()}`}
      </div>
    </div>
  );
};
