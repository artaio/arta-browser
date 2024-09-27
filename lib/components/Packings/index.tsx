import type { TrackingConfig } from '../../trackingConfig';
import type { Shipment } from '../TrackingDrawer';

export interface PackingsProps {
  shipment: Shipment;
  config: TrackingConfig;
}

export const Packings = ({ config, shipment }: PackingsProps) => {
  return (
    <div class="artajs__packings__wrapper">
      <div class="artajs__packings__spacer">
        <div class="artajs__packings__spacer">
          <div class="artajs__packings__header">
            <div class="artajs__packings__header__top">
              <div class="artajs__tracking__header__text">#1</div>
            </div>
            <div class="artajs__packings__header__body">
              <div class="artajs__packings__text__regular__underline">
                UPS - 1Z8A16V82992972526
              </div>
            </div>
            <div class="artajs__packings__header__body">
              <div class="artajs__packings__text__small__underline">
                {config.text.packageHistoryLabel}
              </div>
            </div>
          </div>
        </div>
        <div class="artajs__packings__line" />

        <div class="artajs__packings__item">
          <div class="artajs__packings__item__content">
            <div class="artajs__tracking__top__text">
              Peter Angermann: Mappenprüfung
            </div>
            <div class="artajs__tracking__timeline__status__date__content">
              Work on Paper (unframed)
            </div>
          </div>
          <div class="artajs__packings__item__content">
            <div class="artajs__tracking__top__text">
              Robert Longo: Untitled
            </div>
            <div class="artajs__tracking__timeline__status__date__content">
              Work on Paper (unframed)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
