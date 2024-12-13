import { useEffect, useState } from 'preact/hooks';
import { getTrackingStyle } from '../../helper';
import { TrackingFullConfig } from '../../trackingConfig';
import { DrawerHeader } from '../DrawerHeader';
import css from './index.css';
import { loadShipment } from '../../requests';
import { DrawerFooter } from '../DrawerFooter';
import { ShipmentException as ArtaShipmentException } from '../ShipmentException';
import { TrackingShipment } from '../TrackingShipment';
import { SelectTrackingShipment } from '../SelectTrackingShipment';

interface TrackingDrawerProps {
  shipmentIds: string[];
  config: TrackingFullConfig;
  onClose: (e: any) => void;
}

export interface ArtaLocation {
  title: string;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  city: string;
  country: string;
  region: string;
  postal_code: string;
}

export interface ArtaObject {
  id: string;
  current_packing: string;
  images: string[];
  internal_reference: string;
  public_reference: string;
  details: {
    creation_date: string;
    creator: string;
    is_cites: boolean;
    is_fragile: boolean;
    materials: string;
    notes: string;
    title: string;
  };
  depth: number;
  height: number;
  width: number;
  unit_of_measurement: string;
  weight: number;
  weight_unit: string;
  value: number;
  value_currency: string;
  subtype: string;
  subtype_name: string;
  type: string;
}

export interface ArtaPackage {
  id: number;
  handle_with_care: boolean;
  is_sufficiently_packed: boolean;
  eta: string;
  status:
    | 'unknown'
    | 'pending'
    | 'notfound'
    | 'transit'
    | 'out_for_delivery'
    | 'delivered'
    | 'undelivered'
    | 'exception'
    | 'expired';
  objects: ArtaObject[];
  packing_materials: string;
  depth: number;
  height: number;
  width: number;
  unit_of_measurement: string;
  weight: number;
  weight_unit: string;
  package_events_count: number;
}

interface Tracking {
  id: number;
  carrier_name: string;
  package_id: number;
  tracking_number: string;
  url: string | null;
}

export interface ArtaShipmentException {
  created_at: string;
  exception_type_label: string | null;
  hold_until: string | null;
  id: string;
  object_id: string | null;
  package_id: number | null;
  resolution: string | null;
  source: string;
  status: 'new' | 'in_progress' | 'resolved';
  type: {
    id: string;
    name: string;
    category: string;
  };
  updated_at: string;
}

export interface Shipment {
  created_at: string;
  destination: ArtaLocation | null;
  hosted_session_id: string;
  id: string;
  internal_reference: string;
  object_count: number;
  origin: ArtaLocation | null;
  packages: ArtaPackage[];
  package_count: number;
  public_reference: string;
  quote_type: string;
  shortcode: string;
  status:
    | 'cancelled'
    | 'collected'
    | 'completed'
    | 'confirmed'
    | 'in_transit'
    | 'pending';
  total: number;
  total_currency: string;
  updated_at: string;

  cancelled_at: string | null;
  collected_at: string | null;
  completed_at: string | null;
  confirmed_at: string | null;
  in_transit_at: string | null;

  delivery_start: string | null;
  delivery_end: string | null;

  tracking: Tracking[];
  shipment_exceptions: ArtaShipmentException[];
  insurance_policy: 'arta_transit_insurance' | 'no_arta_insurance' | null;
}

export const TrackingDrawer = ({
  shipmentIds,
  config,
  onClose,
}: TrackingDrawerProps) => {
  const position = config.style.position;
  const style = getTrackingStyle(config);

  const [shipments, setShipments] = useState<Shipment[] | null>(null);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const ships = await Promise.all(
        shipmentIds.map(async (shipmentId) => {
          return await loadShipment(config, shipmentId);
        })
      );
      setShipments(ships);
      //TODO should we ship.packages.filter(pkg => pkg.objects?.length)); ??
    })();
  }, [shipmentIds]);

  return (
    <div>
      <style>{css}</style>
      <div class="artajs">
        {config.style.backdropEnabled && (
          <div
            onClick={onClose}
            style={style}
            class="artajs__drawer__backdrop"
          />
        )}
        <div
          style={style}
          class={`artajs__drawer ${
            position === 'left'
              ? 'artajs__drawer__left'
              : 'artajs__drawer__right'
          }`}
        >
          <div class="artajs__tracking__out__wrapper">
            <DrawerHeader
              title={
                selectedShipment
                  ? config.text.header.titleShipmentDetail
                  : shipments && shipments.length > 1
                  ? config.text.header.titleShipmentList
                  : config.text.header.title
              }
              onClose={onClose}
              setSelectedShipment={setSelectedShipment}
              multiple={!!selectedShipment}
              config={config}
            />

            {shipments?.length ? (
              shipments.length === 1 || selectedShipment ? (
                <TrackingShipment
                  shipment={selectedShipment ?? shipments[0]}
                  config={config}
                />
              ) : (
                <SelectTrackingShipment
                  shipments={shipments}
                  config={config}
                  setSelectedShipment={setSelectedShipment}
                />
              )
            ) : (
              <div class="artajs__tracking__body">
                <div class="artajs__drawer__loading" />
                <DrawerFooter />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
