import type { TrackingConfig } from '../../trackingConfig';
import { parseStringDate } from '../Date';
import type { Shipment } from '../TrackingDrawer';

export interface TrackingTopProps {
  shipment: Shipment;
  config: TrackingConfig;
}
export const TrackingTop = ({ shipment, config }: TrackingTopProps) => {
  const getLabelAndDates = (shipment: Shipment, config: TrackingConfig) => {

    if (shipment.status === 'completed') {
      return {
        label: config.text.completedCTA,
        dates: shipment.completed_at ? [new Date(shipment.completed_at)] : null,
      };
    }

    if (shipment.status === 'cancelled') {
      return {
        label: config.text.cancelledMessage,
        // TODO: maybe we want to check for cancelled_at here?
        dates: null,
      };
    }

    const start =
      shipment.delivery_start != null
        ? new Date(shipment.delivery_start)
        : null;
    const end =
      shipment.delivery_end != null ? new Date(shipment.delivery_end) : null;

    if (start == null && end == null) {
      return {
        label: config.text.checkBackLater,
        dates: null,
      };
    }

    if (start != null && end != null) {
      if (start.toDateString() === end.toDateString()) {
        return {
          label: config.text.inTransitCTAOnLabel,
          dates: [start],
        };
      }
      return {
        label: config.text.inTransitCTABetweenLabel,
        dates: [start, end],
      };
    }

    if (start == null && end != null) {
      return {
        label: config.text.inTransitCTABeforeLabel,
        dates: [end],
      };
    }

    if (start != null && end == null) {
      return {
        label: config.text.inTransitCTAAfterLabel,
        dates: [start],
      };
    }

    return {
      label: config.text.checkBackLater,
      dates: null,
    };
  };

  const { label, dates } = getLabelAndDates(shipment, config);

  const parsedDates = dates?.map(parseStringDate);

  return (
    <div class="artajs__tracking__top__wrapper">
      <div class="artajs__tracking__top__divider">
        <div class="artajs__tracking__top__cta">
          <div class="artajs__tracking__top__text">{label}</div>
        </div>

        {parsedDates != null && parsedDates.length === 1 && (
          <div class="artajs__tracking__top__date__wrapper">
            <div class="artajs__tracking__top__date__aligner">
              <div class="artajs__tracking__top__date__day">
                {`${config.text.dates.weekdays[parsedDates[0].weekday]}, ${config.text.dates.months[parsedDates[0].month]
                  }`}
              </div>
              <div class="artajs__tracking__top__date__day__numeric">
                {`${parsedDates[0].day}`.padStart(2, '0')}
              </div>
            </div>
          </div>
        )}

        {parsedDates != null && parsedDates.length === 2 && (
          <div class="artajs__tracking__top__date__wrapper">
            <div class="artajs__tracking__top__date__aligner">
              <div class="artajs__tracking__top__date__day">
                {`${config.text.dates.weekdays[parsedDates[0].weekday]}, ${config.text.dates.months[parsedDates[0].month]
                  }`}
              </div>
              <div class="artajs__tracking__top__date__day__numeric">
                {`${parsedDates[0].day}`.padStart(2, '0')}
              </div>
            </div>

            <div class="artajs__tracking__top__date__aligner">
              <div class="artajas__tracking__top__date__and">
                {config.text.inTransitCTAAndLabel}
              </div>
            </div>

            <div class="artajs__tracking__top__date__aligner">
              <div class="artajs__tracking__top__date__day">
                {`${config.text.dates.weekdays[parsedDates[1].weekday]}, ${config.text.dates.months[parsedDates[1].month]
                  }`}
              </div>
              <div class="artajs__tracking__top__date__day__numeric">
                {`${parsedDates[1].day}`.padStart(2, '0')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
