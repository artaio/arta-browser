import type { TimelineProps } from '.';
import { SimpleDate } from '../Date/SimpleDate';
import { CancelledIcon } from './defaultIcons/CancelledIcon';
import { PendingIcon } from './defaultIcons/PendingIcon';
import { CollectedIconBase } from './icons/CollectedIconBase';
import { CompletedIconBase } from './icons/CompletedIconBase';
import { ConfirmedIconBase } from './icons/ConfirmedIconBase';
import { InTransitIconBase } from './icons/InTransitIconBase';
import { SecondaryStep } from './SecondaryStep';

const InvisibleStep = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
    ></svg>
  );
};

const Step = ({ config, shipment, idx }: TimelineProps & { idx: number }) => {
  const shouldRenderInvisibleStep = () => {
    const { status, quote_type } = shipment;

    switch (status) {
      case 'confirmed':
        return quote_type === 'self_ship' ? idx < 3 || idx === 5 : idx < 3;

      // Theoretically self_ship should never have a collected status
      // But handle it just in case
      case 'collected':
        return quote_type === 'self_ship'
          ? idx < 2 || idx > 3
          : idx < 2 || idx > 4;

      case 'in_transit':
        return quote_type === 'self_ship'
          ? idx < 2 || idx > 3
          : idx < 1 || idx > 3;

      case 'completed':
        return quote_type === 'self_ship' ? idx > 2 || idx === 0 : idx > 2;

      default:
        return true;
    }
  };

  if (shouldRenderInvisibleStep()) {
    return <InvisibleStep />;
  }

  return <SecondaryStep config={config} />;
};
export const TimelineMinimal = ({ config, shipment }: TimelineProps) => {
  const labelMap = {
    pending: 'pendingLabel',
    confirmed: 'confirmedLabel',
    in_transit: 'inTransitLabel',
    collected: 'collectedLabel',
    completed: 'completedLabel',
    cancelled: 'cancelledLabel',
  } as const;

  const dateMap = {
    pending: 'created_at',
    confirmed: 'confirmed_at',
    collected: 'collected_at',
    in_transit: 'in_transit_at',
    completed: 'completed_at',
    cancelled: 'cancelled_at',
  } as const;

  return (
    <div class="artajs__tracking__timeline__minimal__wrapper">
      {shipment.status === 'cancelled' || shipment.status === 'pending' ? (
        shipment.status === 'pending' ? (
          <PendingIcon config={config} />
        ) : (
          <CancelledIcon config={config} />
        )
      ) : (
        <div class="artajs__tracking__timeline__minimal__divider">
          <div class="artajs__tracking__timeline__minimal__step">
            <div class="artajs__tracking__timeline__minimal__spacing">
              <Step config={config} shipment={shipment} idx={0} />
              <Step config={config} shipment={shipment} idx={1} />
              <Step config={config} shipment={shipment} idx={2} />

              {shipment.status === 'confirmed' && (
                <ConfirmedIconBase config={config} />
              )}
              {shipment.status === 'collected' && (
                <CollectedIconBase config={config} />
              )}
              {shipment.status === 'in_transit' && (
                <InTransitIconBase config={config} />
              )}
              {shipment.status === 'completed' && (
                <CompletedIconBase config={config} />
              )}

              <Step config={config} shipment={shipment} idx={3} />
              <Step config={config} shipment={shipment} idx={4} />
              <Step config={config} shipment={shipment} idx={5} />
            </div>
          </div>

          <div class="artajs__tracking__timeline__status__text__wrapper">
            <div class="artajs__tracking__timeline__status__text__large">
              {config.text[labelMap[shipment.status]]}
            </div>
            <SimpleDate
              date={shipment[dateMap[shipment.status]]}
              dateConfig={config.text.dates}
            />
          </div>
        </div>
      )}
    </div>
  );
};
