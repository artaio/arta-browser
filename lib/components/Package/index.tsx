import type { TrackingConfig } from '../../trackingConfig';
import { Pill } from '../Pill';
import type { ArtaObject, Shipment } from '../TrackingDrawer';

export interface PackingsProps {
  shipment: Shipment;
  config: TrackingConfig;
  pkg: Shipment['packages'][number];
  title: string;
  setPackageId: (value: number) => void;
}

export const objectDetailTitle = (obj: ArtaObject, config: TrackingConfig) => {
  if (
    obj.details?.title == null &&
    obj.details?.creator == null &&
    obj.details?.creation_date == null
  ) {
    return config.text.noObjectDetailsTitle;
  }

  let formattedString = '';
  if (obj.details.title && obj.details.creator) {
    formattedString = `${obj.details.title}: ${obj.details.creator}`;
  } else if (obj.details.title) {
    formattedString = obj.details.title;
  } else if (obj.details.creator) {
    formattedString = obj.details.creator;
  }

  if (obj.details.creation_date) {
    formattedString +=
      (formattedString ? ', ' : '') + obj.details.creation_date;
  }
  return formattedString;
};

export const Package = ({
  config,
  shipment,
  pkg,
  title,
  setPackageId,
}: PackingsProps) => {
  const pkgTracking = shipment.tracking.find((t) => t.package_id === pkg.id);

  return (
    <div class="artajs__packings__wrapper">
      <div class="artajs__packings__spacer">
        <div class="artajs__packings__spacer">
          <div class="artajs__packings__header">
            <div class="artajs__packings__header__top">
              <div class="artajs__tracking__header__text">{title}</div>
              <Pill config={config} status={pkg.status} />
            </div>
            {pkgTracking?.carrier_name && pkgTracking.tracking_number && (
              <div class="artajs__packings__header__body">
                {pkgTracking.url ? (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      if (pkgTracking.url == null) {
                        return;
                      }
                      const url = pkgTracking.url.startsWith('http')
                        ? pkgTracking.url
                        : `https://${pkgTracking.url}`;
                      window.open(url, '_blank');
                    }}
                    className="artajs__packings__text__regular__underline"
                  >
                    {pkgTracking.carrier_name} - {pkgTracking.tracking_number}
                  </div>
                ) : (
                  <div class="artajs__tracking__timeline__step__text__primary">
                    {pkgTracking.carrier_name} - {pkgTracking.tracking_number}
                  </div>
                )}
              </div>
            )}
            {pkg.package_events_count > 0 && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setPackageId(pkg.id);
                }}
                class="artajs__packings__header__body"
              >
                <div class="artajs__packings__text__small__underline">
                  {config.text.packageHistoryLabel}
                </div>
              </div>
            )}
          </div>
        </div>
        <div class="artajs__packings__line" />

        <div class="artajs__packings__item">
          {pkg.objects.map((obj) => (
            <div class="artajs__packings__item__content">
              {
                <div class="artajs__tracking__title">
                  {objectDetailTitle(obj, config)}
                </div>
              }
              <div class="artajs__tracking__subtype">{obj.subtype_name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
