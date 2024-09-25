import type { TrackingConfig } from "../../trackingConfig";
import type { Shipment } from "../TrackingDrawer";

export interface PackingsProps {
  shipment: Shipment;
  config: TrackingConfig;
}

export const Packings = ({ config, shipment }: PackingsProps) => {
  return <div class="artajs__flex__wrapper">
    <div class={`artajs__trackings__packings__wrapper ${config.style.variant === 'default' ? 'artajs__wrapper__large' : 'artajs__wrapper__minimal'}`}>
      {shipment.packages.map((pkg, index) =>
        <div>
          <div class='artajs__text__large'>
            #{index + 1}
          </div>
          <div class='artajs__package__link'>
            UPS - 1Z8A16V82992972526
          </div>
          <div class='artajs__package__history__link'>
            {config.text.packageHistoryLabel}
          </div>
          <div class='artajs__package__divider'></div>

          <div class='artajs__package__name'>Peter Angermann: Mappenprüfung</div>
          <div class='artajs__text__small'>Work on Paper (unframed)</div>

          <div class='artajs__package__name'>Robert Longo: Untitled</div>
          <div class='artajs__text__small'>Work on Paper (unframed)</div>
        </div>
      )
      }
    </div>
  </div>;
};
