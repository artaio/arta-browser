import { TrackingConfig } from '../../trackingConfig';
import type { Shipment } from '../TrackingDrawer';

interface HeaderOpts {
  onClose: (e: any) => void;
  title: string;
  setSelectedShipment: (shipment: Shipment | null) => void;
  multiple: boolean;
  config: TrackingConfig;
}

export const DrawerHeader = ({
  onClose,
  title,
  setSelectedShipment,
  multiple,
  config,
}: HeaderOpts) => {
  return (
    <div class="artajs__tracking__header">
      <div class="artajs__tracking__header__title">
        <div class="artajs__tracking__header__text">{title}</div>
        {multiple && (
          <div class="artajs__tracking__button__container">
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectedShipment(null);
              }}
              class="artajs__tracking__button"
            >
              {config.text.viewShipmentsListLabel}
            </button>
          </div>
        )}
        <div class="artajs__tracking__header__icon">
          <a onClick={onClose} href="#">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="6.70711"
                y1="6.29289"
                x2="18.0208"
                y2="17.6066"
                stroke-width="2"
              />
              <line
                x1="6.29289"
                y1="17.6066"
                x2="17.6066"
                y2="6.29291"
                stroke-width="2"
              />
            </svg>
          </a>
        </div>
      </div>
      <div class="artajs__tracking__header__line" />
    </div>
  );
};
