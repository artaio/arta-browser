import { useEffect, useState } from 'preact/hooks';
import { getTrackingStyle } from '../../helper';
import { TrackingFullConfig } from '../../trackingConfig';
import { DrawerHeader } from '../DrawerHeader';
import './index.css';
import { loadShipment } from '../../requests';
import { ShipToFrom } from '../ShipToFrom';
import { Packings } from '../Packings';
import { Timeline } from '../Timeline';
import { TrackingTop } from '../TrackingTop';

interface TrackingDrawerProps {
  shipmentId: string;
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

interface ArtaObject {
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
  type: string;
}

interface Package {
  id: string;
  handle_with_care: boolean;
  is_sufficiently_packed: boolean;
  eta: string;
  status: string;
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

export interface Shipment {
  created_at: string;
  destination: ArtaLocation;
  hosted_session_id: string;
  id: string;
  internal_reference: string;
  object_count: number;
  origin: ArtaLocation;
  packages: Package[];
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
}

export const TrackingDrawer = ({
  shipmentId,
  config,
  onClose,
}: TrackingDrawerProps) => {
  const position = config.style.position;
  const style = getTrackingStyle(config);

  const [shipment, setShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    (async () => {
      setShipment(await loadShipment(config, shipmentId));
    })();
  }, [shipmentId]);

  return (
    <div>
      <div class="artajs">
        {/* <div class="artajs__drawer__backdrop" /> */}
        <div
          style={style}
          class={`artajs__drawer ${
            position === 'left'
              ? 'artajs__drawer__left'
              : 'artajs__drawer__right'
          }`}
        >
          <div class="artajs__tracking__out__wrapper">
            <DrawerHeader title={config.text.header.title} onClose={onClose} />
            {shipment != null ? (
              <div class="artajs__tracking__body">
                <Timeline shipment={shipment} config={config} />
                {config.style.variant === 'default' && (
                  <div class="artajs__tracking__timeline__divider" />
                )}
                <TrackingTop config={config} shipment={shipment} />
                <ShipToFrom config={config} shipment={shipment} />
                <Packings config={config} shipment={shipment} />
              </div>
            ) : (
              // TODO: proper loading
              <div class="artajs__tracking__body">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
