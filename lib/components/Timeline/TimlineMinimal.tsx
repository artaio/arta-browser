import type { TimelineProps } from '.';
import { SimpleDate } from '../Date/SimpleDate';
import { CancelledIcon } from './defaultIcons/CancelledIcon';
import { PendingIcon } from './defaultIcons/PendingIcon';
import { CollectedIconBase } from './icons/CollectedIconBase';
import { CompletedIconBase } from './icons/CompletedIconBase';
import { ConfirmedIconBase } from './icons/ConfirmedIconBase';
import { InTransitIconBase } from './icons/InTransitIconBase';
import { SecondaryStep } from './SecondaryStep';

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
              {shipment.status === 'confirmed' ? (
                <ConfirmedIconBase config={config} />
              ) : (
                <SecondaryStep config={config} />
              )}
              {shipment.quote_type !== 'self_ship' &&
                (shipment.status === 'collected' ? (
                  <CollectedIconBase config={config} />
                ) : (
                  <SecondaryStep config={config} />
                ))}

              {shipment.status === 'in_transit' ? (
                <InTransitIconBase config={config} />
              ) : (
                <SecondaryStep config={config} />
              )}

              {shipment.status === 'completed' ? (
                <CompletedIconBase config={config} />
              ) : (
                <SecondaryStep config={config} />
              )}
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
