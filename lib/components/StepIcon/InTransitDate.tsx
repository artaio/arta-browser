import { StepCTA } from './StepCTA';
import { LargeDate } from '../Date/LargeDate';
import { Shipment } from '../TrackingDrawer';
import type { StepIconProps } from '.';

type LabelAndDates = {
  label: 'inTransitCTABetweenLabel'
  dates: [Date, Date];
} | {
  label: 'inTransitCTAOnLabel' | 'inTransitCTABeforeLabel' | 'inTransitCTAAfterLabel';
  dates: [Date];
} | {
  label: undefined;
  dates: [];
};

// TODO: add delayed delivery logic
const getLabelAndDates = (shipment: Shipment): LabelAndDates => {
  const start = shipment.delivery_start != null ? new Date(shipment.delivery_start) : null;
  const end = shipment.delivery_end != null ? new Date(shipment.delivery_end) : null;

  if (start != null && end != null) {
    if (start.toDateString() === end.toDateString()) {
      return {
        label: 'inTransitCTAOnLabel',
        dates: [start]
      };
    }
    return {
      label: 'inTransitCTABetweenLabel',
      dates: [start, end]
    };
  }

  if (start == null && end != null) {
    return {
      label: 'inTransitCTABeforeLabel',
      dates: [end]
    };
  }

  if (start != null && end == null) {
    return {
      label: 'inTransitCTAAfterLabel',
      dates: [start]
    };
  }

  return {
    label: undefined,
    dates: []
  };

};


export const InTransitDate = ({ shipment, config }: StepIconProps) => {
  const { label, dates } = getLabelAndDates(shipment);

  return label ?
    label === 'inTransitCTABetweenLabel' ?
      <div>
        <StepCTA text={config.text[label]} />
        <div class="artajs__in__transit__date__wrapper">
          <LargeDate date={dates[0]} dateConfig={config.text.dates} minimal={true} />
          <div class="artajs__in__transit__and">{config.text.inTransitCTAAndLabel}</div>
          <LargeDate date={dates[1]} dateConfig={config.text.dates} minimal={true} />
        </div>
      </div>
      :
      <div>
        <StepCTA text={config.text[label]} />
        <LargeDate date={dates[0]} dateConfig={config.text.dates} />
      </div>
    : <StepCTA text={config.text.checkBackLater} />;
};
