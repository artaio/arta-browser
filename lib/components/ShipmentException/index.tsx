import { TrackingConfig } from '../../trackingConfig';
import { ArtaShipmentException, Shipment } from '../TrackingDrawer';
import { ExceptionIcon } from './icons/ExceptionIcon';

interface ShipmentExceptionProps {
  config: TrackingConfig;
  shipment: Shipment;
}

const exceptionPriorityList = [
  'prepayment_required',
  'direct_payment_required',
  'held_at_customs',
  'incorrect_address',
  'inaccurate_object_details',
  'requested_hold_to_collect',
  'requested_hold_to_deliver',
  'change_of_address_request',
  'wrong_item',
  'not_ready_for_release',
  'not_ready_for_delivery',
  'damaged_items',
  'lost_in_transit',
  'other',
] as const;

export function groupExceptions(
  shipment: Shipment
): Record<string, ArtaShipmentException[]> {
  return shipment.shipment_exceptions
    .filter((e) => e.status !== 'resolved')
    .reduce((acc, e) => {
      const typeId = e.type.id;
      if (!acc[typeId]) {
        acc[typeId] = [];
      }
      acc[typeId].push(e);
      return acc;
    }, {} as Record<string, ArtaShipmentException[]>);
}

export function getTopPriorityExceptions(
  groupedExceptions: Record<string, ArtaShipmentException[]> | null
): ArtaShipmentException[] {
  if (!groupedExceptions) {
    return [];
  }

  const currentExceptionType = exceptionPriorityList.find(
    (type) => groupedExceptions[type] && groupedExceptions[type].length > 0
  );

  if (currentExceptionType) {
    return groupedExceptions[currentExceptionType];
  }

  return [];
}

function heldAtCustomsMessage(
  config: TrackingConfig,
  topPriorityExceptions: ArtaShipmentException[],
  shipment: Shipment
): string {
  const packageIds = shipment.packages.map((pkg) => pkg.id);
  const topPriorityExceptionPackageIds = topPriorityExceptions.map(
    (exception) => exception.package_id
  );

  const hasGenericExceptions = topPriorityExceptionPackageIds.includes(null);
  const hasAllPackageIds = packageIds.every((id) =>
    topPriorityExceptionPackageIds.includes(id)
  );

  if (hasGenericExceptions || hasAllPackageIds) {
    return config.text.singleShipmentHeldAtCustomsLabel;
  }
  return config.text.multipleShipmentsHeldAtCustomsLabel;
}

export function getExceptionMessage(
  config: TrackingConfig,
  topPriorityExceptions: ArtaShipmentException[],
  shipment: Shipment
): string | null {
  if (topPriorityExceptions.length === 0) {
    return null;
  }

  const {
    type: { id: exceptionTypeId },
  } = topPriorityExceptions[0];

  switch (exceptionTypeId) {
    case 'prepayment_required':
    case 'direct_payment_required':
      return config.text.paymentRequiredLabel;
    case 'requested_hold_to_collect':
    case 'requested_hold_to_deliver':
      return config.text.holdRequestedLabel;

    case 'held_at_customs':
      return heldAtCustomsMessage(config, topPriorityExceptions, shipment);

    case 'change_of_address_request':
      return config.text.changeOfAddressRequestLabel;

    default:
      return config.text.shipmentExceptionDefaultLabel;
  }
}

export const ShipmentException = ({
  config,
  shipment,
}: ShipmentExceptionProps) => {
  const topPriorityExceptions = getTopPriorityExceptions(
    groupExceptions(shipment)
  );

  const expcetionMessage = getExceptionMessage(
    config,
    topPriorityExceptions,
    shipment
  );
  const currentException = topPriorityExceptions[0];

  if (!expcetionMessage) {
    return <div />;
  }

  return (
    <div class="artajs__tracking__exception__wrapper">
      <div>
        <ExceptionIcon config={config} currentException={currentException} />
      </div>
      <div class="artajs__tracking__exception__content">
        <div class="artajs__tracking__exception__title">{expcetionMessage}</div>
        <a
          href={`mailto:${config.navigation.shipmentExceptionMailTo}`}
          class="artajs__tracking__exception__cta"
        >
          {config.text.shipmentExceptionCTA}
        </a>
      </div>
    </div>
  );
};
