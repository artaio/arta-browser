import { useEffect, useState } from 'preact/hooks';
import { TrackingFullConfig } from '../../trackingConfig';
import { ShipToFrom } from '../ShipToFrom';
import { Package } from '../Package';
import { Timeline } from '../Timeline';
import { TrackingTop } from '../TrackingTop';
import { DrawerFooter } from '../DrawerFooter';
import { DrawerInsurance } from '../DrawerInsurance';
import { Summary } from '../Summary';
import { ShipmentException as ArtaShipmentException } from '../ShipmentException';
import { PackageEvents } from '../PackageEvents';
import type { Shipment, ArtaPackage } from '../TrackingDrawer';

interface TrackingShipmentsProps {
  shipment: Shipment;
  config: TrackingFullConfig;
}

export const hasActiveException = (shipment: Shipment) => {
  return (
    shipment.shipment_exceptions.some((ex) => ex.status !== 'resolved') &&
    shipment.status !== 'completed'
  );
};

export const TrackingShipment = ({
  shipment,
  config,
}: TrackingShipmentsProps) => {
  const [packagesWithObjects, setPackagesWithObjects] = useState<ArtaPackage[]>(
    []
  );
  const [packageId, setPackageId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      setPackagesWithObjects(shipment.packages);
    })();
  }, [shipment]);

  if (packageId != null) {
    return (
      <PackageEvents
        packageId={packageId}
        shipment={shipment}
        config={config}
        setPackageId={setPackageId}
      />
    );
  }

  return (
    <div class="artajs__tracking__body">
      <Timeline shipment={shipment} config={config} />
      <div class="artajs__tracking__timeline__divider" />
      {hasActiveException(shipment) && (
        <ArtaShipmentException shipment={shipment} config={config} />
      )}
      <TrackingTop config={config} shipment={shipment} />
      <ShipToFrom config={config} shipment={shipment} />
      {packagesWithObjects.map((pkg, index) => (
        <Package
          title={`#${index + 1}`}
          pkg={pkg}
          shipment={shipment}
          config={config}
          setPackageId={setPackageId}
        />
      ))}
      {shipment.insurance_policy != null && <DrawerInsurance />}
      <Summary config={config} shipment={shipment} />
      <DrawerFooter />
    </div>
  );
};
