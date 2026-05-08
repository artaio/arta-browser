import type { TrackingConfig } from '../../trackingConfig';
import { HexagonAlertBase } from '../ShipmentException/icons/HexagonAlertBase';
import type { Shipment } from '../TrackingDrawer';

interface DeliveryDelayProps {
  config: TrackingConfig;
  shipment: Shipment;
}

const isDeliveryDelayed = (shipment: Shipment): boolean => {
  if (shipment.delivery_end == null) {
    return false;
  }
  const end = new Date(shipment.delivery_end);
  if (Number.isNaN(end.getTime())) {
    return false;
  }
  end.setHours(23, 59, 59, 999);
  return Date.now() > end.getTime();
};

export const DeliveryDelay = ({ config, shipment }: DeliveryDelayProps) => {
  if (
    shipment.status === 'completed' ||
    shipment.status === 'cancelled' ||
    shipment.quote_type === 'track' ||
    !isDeliveryDelayed(shipment)
  ) {
    return null;
  }

  return (
    <div class="artajs__tracking__delay__wrapper">
      <HexagonAlertBase config={config} />
      <div class="artajs__tracking__delay__text">
        {config.text.deliveryDelayedLabel}
      </div>
    </div>
  );
};
