import type { TrackingConfig } from "../../trackingConfig";
import type { Shipment } from "../TrackingDrawer";

export interface PackageEventsProps {
  shipment: Shipment;
  config: TrackingConfig;
  packageEvents: number;
  setPackageEvents: (value: number | null) => void;
}

export const PackageEvents = ({ shipment, config, setPackageEvents }: PackageEventsProps) => {
  return <div class="artajs__tracking__events__wrapper">
    <div onClick={(e) => {
      e.preventDefault();
      setPackageEvents(null);
    }} class="artajs__tracking__events__return">
      <div class="artajs__tracking__events__return__text">
        {config.text.packageEventsReturnLabel}
      </div>
    </div>
  </div>;
};
