import { useEffect, useState } from 'preact/hooks';

import type { TrackingFullConfig } from "../../trackingConfig";
import type { Shipment } from "../TrackingDrawer";
import { loadPackageEvents } from '../../requests';
import { parseStringDate } from '../Date';
import { DrawerFooter } from '../DrawerFooter';

export interface PackageEventsProps {
  shipment: Shipment;
  config: TrackingFullConfig;
  packageId: number;
  setPackageId: (value: number | null) => void;
}

export interface ArtaPackageEvent {
  datetime: string;
  id: string;
  location: string | null;
  // TODO check if summary is nullable
  summary: string | null;
}

const groupByDate = (data: ArtaPackageEvent[]): Record<string, ArtaPackageEvent[]> => {
  return data.reduce((groups, item) => {
    const date = item.datetime.split('T')[0]; // Extract the date portion (YYYY-MM-DD)

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(item);
    return groups;
  }, {} as Record<string, ArtaPackageEvent[]>);
};

const formatDate = (date: string, config: TrackingFullConfig) => {
  const { day, weekday, month, year } = parseStringDate(date);
  return `${config.text.dates.weekdays[weekday]}, ${config.text.dates.months[month]} ${day}, ${year}`;
};

export const PackageEvents = ({ shipment, config, setPackageId, packageId }: PackageEventsProps) => {

  const [eventHistory, setEventHistory] = useState<Array<ArtaPackageEvent> | null>(null);
  const [groupedEventHistory, setGroupedEventHistory] = useState<Record<string, ArtaPackageEvent[]> | null>(null);

  const packageIdx = shipment.packages.findIndex((p) => p.id === packageId);
  const pkgTracking = shipment.tracking.find(t => t.package_id === shipment.packages[packageIdx].id);

  let counter = eventHistory?.length ?? 0;

  useEffect(() => {
    (async () => {
      const hist = await loadPackageEvents(config, shipment.id, packageId);
      setEventHistory(hist);
      setGroupedEventHistory(groupByDate(hist));
    })();
  }, [packageId]);

  return <div class="artajs__tracking__events__wrapper">
    <div onClick={(e) => {
      e.preventDefault();
      setPackageId(null);
    }} class="artajs__tracking__events__return">
      <div class="artajs__tracking__events__return__text">
        {config.text.packageIdReturnLabel}
      </div>
    </div>

    <div class="artajs__tracking__events__header">
      <div class="artajs__tracking__events__header__title">
        {config.text.packageLabel} #{packageIdx + 1} {config.text.historyLabel}
      </div>
      {pkgTracking?.carrier_name && pkgTracking.tracking_number &&
        (pkgTracking.url ?
          <div
            onClick={(e) => {
              e.preventDefault();
              if (pkgTracking.url == null) {
                return;
              }
              const url = pkgTracking.url.startsWith('http') ? pkgTracking.url : `https://${pkgTracking.url}`;
              window.open(url, '_blank');
            }}
            className="artajs__packings__text__regular__underline"
          >
            {pkgTracking.carrier_name} - {pkgTracking.tracking_number}
          </div>
          :
          <div class="artajs__tracking__timeline__step__text__primary">
            {pkgTracking.carrier_name} - {pkgTracking.tracking_number}
          </div>
        )
      }
    </div>

    {groupedEventHistory ?
      <div class="artajs__tracking__events__body">
        {Object.values(groupedEventHistory).map((events, idx) => {
          return <div class="artajs__tracking__events__group">
            <div class="artajs__tracking__events__date">
              {formatDate(events[0].datetime, config)}
            </div>

            <div class="artajs__tracking__events__group__item">
              {events.map((event, idx2) => {
                return <div class="artajs__tracking__events__group__content">
                  <div class={idx === 0 && idx2 === 0 ?
                    'artajs__tracking__events__group__number__primary' :
                    'artajs__tracking__events__group__number__secondary'}>
                    {counter--}
                  </div>
                  <div class="artajs__tracking__events__group__divider">
                    <div class="artajs__tracking__events__round">
                      {idx === 0 && idx2 === 0 ? <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <circle cx="15" cy="15" r="7.5" fill="#110F10" />
                      </svg> :
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                        >
                          <circle cx="15" cy="15" r="7" fill="white" stroke="#9D9D9D" />
                        </svg>
                      }
                    </div>
                    <hr class="artajs__tracking__events__vertical" width="1" style="0 auto" />
                  </div>
                  <div class="artajs__tracking__events__group__summary">
                    <div class={idx === 0 && idx2 === 0 ?
                      "artajs__tracking__events__group__location" :
                      "artajs__tracking__events__group__location__secondary"}>
                      {event.location ?? config.text.unknownLocation}
                    </div>
                    <div class="artajs__tracking__events__group__time">
                      {new Date(event.datetime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                    </div>
                    <div class="artajs__tracking__events__group__description">
                      {event.summary}
                    </div>
                  </div>
                </div>;
              })}
            </div>
          </div>;
        })}
        <DrawerFooter />
      </div> :

      <div class="artajs__tracking__body">
        <div class="artajs__drawer__loading" />
        <DrawerFooter />
      </div>
    }

  </div >;
};
