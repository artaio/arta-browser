import { TrackingFullConfig } from '../../trackingConfig';
import { objectDetailTitle } from '../Package';
import { Pill } from '../Pill';
import {
  getExceptionMessage,
  getTopPriorityExceptions,
  groupExceptions,
} from '../ShipmentException';
import { DrawerFooter } from '../DrawerFooter';
import { ShipToFrom } from '../ShipToFrom';
import { Shipment } from '../TrackingDrawer';
import { hasActiveException } from '../TrackingShipment';
import { getLabelAndDates } from '../TrackingTop';

interface SelectTrackingShipmentProps {
  shipments: Shipment[];
  config: TrackingFullConfig;
  setSelectedShipment: (shipment: Shipment) => void;
}

const labelDates = (dates: Date[], config: TrackingFullConfig) => {
  return dates
    .map((d) =>
      d.toLocaleDateString(
        config.text.dates.locale,
        config.text.dates.formatOptions
      )
    )
    .join(` ${config.text.inTransitCTAAndLabel} `);
};

const getShipmentStatus = (shipment: Shipment) => {
  const activeException = hasActiveException(shipment);
  if (activeException) {
    return 'exception';
  }

  return shipment.status;
};

const getShipmentExceptionMessage = (
  shipment: Shipment,
  config: TrackingFullConfig
) => {
  const topPriorityExceptions = getTopPriorityExceptions(
    groupExceptions(shipment)
  );

  return getExceptionMessage(config, topPriorityExceptions, shipment);
};

export const SelectTrackingShipment = ({
  shipments,
  config,
  setSelectedShipment,
}: SelectTrackingShipmentProps) => {
  const labelsAndDates = shipments.map((shipment) =>
    getLabelAndDates(shipment, config)
  );

  return (
    <div class="artajs__tracking__body">
      {shipments.map((shipment, idx) => (
        <div
          class="artajs__tracking__select__shipment__card"
          key={`shipment-card-${idx}`}
        >
          <div class="artajs__tracking__select__shipment__content">
            <div class="artajs__tracking__select__shipment__header">
              <div class="artajs__tracking__select__shipment__header__item">
                <div class="artajs__packings__header__top">
                  <div class="artajs__tracking__header__text">
                    {shipment.shortcode}
                  </div>
                  <Pill status={getShipmentStatus(shipment)} config={config} />
                </div>
                {hasActiveException(shipment) ? (
                  <div class="artajs__tracking__select__shipment__exception__content">
                    <div class="artajs__tracking__select__shipment__exception__title">
                      {getShipmentExceptionMessage(shipment, config)}
                    </div>
                    <a
                      href={`mailto:${config.navigation.shipmentExceptionMailTo}`}
                      class="artajs__tracking__exception__cta"
                      style={{ textAlign: 'left' }}
                    >
                      {config.text.shipmentExceptionCTA}
                    </a>
                  </div>
                ) : (
                  labelsAndDates[idx].dates != null && (
                    <div>
                      <div class="artajs__tracking__timeline__step__text__primary">
                        {labelsAndDates[idx].label}
                      </div>
                      <div class="artajs__tracking__title">
                        {labelDates(labelsAndDates[idx].dates, config)}
                      </div>
                    </div>
                  )
                )}
              </div>
              <div class="artajs__tracking__header__line"></div>
              <ShipToFrom shipment={shipment} config={config} />
            </div>

            {shipment.packages
              .filter((pkg) => pkg?.objects?.length)
              .map((pkg) => (
                <div class="artajs__packings__item">
                  {pkg.objects.map((obj) => {
                    const hasImage = obj.shipment_object_images && obj.shipment_object_images.length > 0;
                    const thumbnailUrl = hasImage && obj.shipment_object_images
                      ? `${config.httpSchema}://${config.host}/shipment_images/60x60/resize/${obj.shipment_object_images[0].filename}`
                      : null;

                    return (
                      <div class="artajs__packings__item__row">
                        {config.showThumbnails && (
                          <div class="artajs__packings__item__thumbnail">
                            {thumbnailUrl ? (
                              <img
                                src={thumbnailUrl}
                                alt="shipment object image"
                                class="artajs__packings__item__thumbnail__img"
                              />
                            ) : (
                              <div class="artajs__packings__item__thumbnail__placeholder" />
                            )}
                          </div>
                        )}
                        <div class="artajs__packings__item__content">
                          <div class="artajs__tracking__title">
                            {objectDetailTitle(obj, config)}
                          </div>
                          <div class="artajs__tracking__subtype">
                            {obj.subtype_name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

            {shipment.packages.some((pkg) => pkg?.objects?.length) && (
              <div class="artajs__tracking__header__line"></div>
            )}

            <button
              class="artajs__tracking__button"
              onClick={(e) => {
                e.preventDefault();
                setSelectedShipment(shipment);
              }}
            >
              {config.text.viewShipmentDetailLabel}
            </button>
          </div>
        </div>
      ))}

      <DrawerFooter />
    </div>
  );
};
