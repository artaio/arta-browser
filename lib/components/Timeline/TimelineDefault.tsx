import type { TimelineProps } from '.';
import { Shipment } from '../TrackingDrawer';
import { CheckedStep } from './CheckedStep';
import { CheckedSteps } from './CheckedSteps';
import { EmptyStep } from './EmptyStep';
import { SecondarySteps } from './SecondarySteps';
import { CancelledIcon } from './defaultIcons/CancelledIcon';
import { CollectedIcon } from './defaultIcons/CollectedIcon';
import { CompletedIcon } from './defaultIcons/CompletedIcon';
import { ConfirmedIcon } from './defaultIcons/ConfirmedIcon';
import { InTransitIcon } from './defaultIcons/InTransitIcon';
import { PendingIcon } from './defaultIcons/PendingIcon';

const isSmaller = (a: Shipment['status'], b: Shipment['status']): boolean => {
  const statuses = [
    'pending',
    'confirmed',
    'collected',
    'in_transit',
    'completed',
  ];
  return statuses.indexOf(a) < statuses.indexOf(b);
};

export const TimelineDefault = ({ config, shipment }: TimelineProps) => {
  return (
    <div class="artajs__tracking__timeline__default__wrapper">
      {shipment.status === 'cancelled' ? <CancelledIcon config={config} /> :
        <div class="artajs__tracking__timeline__default__steps">
          {shipment.status === 'pending' ? (
            <PendingIcon config={config} />
          ) : shipment.status === 'confirmed' ? (
            <ConfirmedIcon config={config} shipment={shipment} />
          ) : (
            <CheckedStep
              text={config.text.confirmedLabel}
              date={shipment.confirmed_at}
              config={config}
            />
          )}

          {shipment.status === 'pending' || shipment.status === 'confirmed' ? (
            <SecondarySteps />
          ) : (
            <CheckedSteps />
          )}
          {shipment.quote_type !== 'self_ship' &&
            (shipment.status === 'collected' ? (
              <CollectedIcon config={config} shipment={shipment} />
            ) : isSmaller(shipment.status, 'collected') ? (
              <EmptyStep text={config.text.collectedLabel} />
            ) : (
              <CheckedStep
                text={config.text.collectedLabel}
                date={shipment.collected_at}
                config={config}
              />
            ))}
          {shipment.quote_type !== 'self_ship' &&
            (shipment.status === 'collected' ||
              isSmaller(shipment.status, 'collected') ? (
              <SecondarySteps />
            ) : (
              <CheckedSteps />
            ))}
          {shipment.status === 'in_transit' ? (
            <InTransitIcon config={config} shipment={shipment} />
          ) : isSmaller(shipment.status, 'in_transit') ? (
            <EmptyStep text={config.text.inTransitLabel} />
          ) : (
            <CheckedStep
              text={config.text.inTransitLabel}
              date={shipment.in_transit_at}
              config={config}
            />
          )}
          {shipment.status === 'in_transit' ||
            isSmaller(shipment.status, 'in_transit') ? (
            <SecondarySteps />
          ) : (
            <CheckedSteps />
          )}
          {shipment.status === 'completed' ? (
            <CompletedIcon config={config} shipment={shipment} />
          ) : isSmaller(shipment.status, 'completed') ? (
            <EmptyStep text={config.text.completedLabel} />
          ) : (
            <CheckedStep
              text={config.text.completedLabel}
              date={shipment.completed_at}
              config={config}
            />
          )}
        </div>}
    </div>
  );
};
