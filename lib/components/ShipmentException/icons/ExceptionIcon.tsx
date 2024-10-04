import type { TrackingConfig } from '../../../trackingConfig';
import type { ArtaShipmentException } from '../../TrackingDrawer';
import { HexagonAlertBase } from './HexagonAlertBase';
import { HexagonPauseBase } from './HexagonPauseBase';
import { HexagonStopBase } from './HexagonStopBase';

export interface ExceptionIconProps {
  config: TrackingConfig;
  currentException: ArtaShipmentException;
}

export const ExceptionIcon = ({
  config,
  currentException,
}: ExceptionIconProps) => {
  if (currentException.type.category === 'Action Required') {
    return <HexagonStopBase config={config} />;
  } else if (currentException.type.category === 'Shipment Hold') {
    return <HexagonPauseBase config={config} />;
  }
  return <HexagonAlertBase config={config} />;
};
