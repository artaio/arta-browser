import { ArtaJsFullConfig } from './arta';
import { deepClone, DeepPartial, nestedObjectAssign } from './helper';

export interface DateConfig {
  weekdays: {
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
  };
  months: {
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
  };
}

export interface TrackingConfig {
  style: {
    color: {
      background: string;
      textPrimary: string;
      textSecondary: string;
      border: string;
      borderHover: string;
      borderFocused: string;
    };
    variant: 'default' | 'minimal';
    position: 'left' | 'right';
    fontFamily: string;
    fontSize: number;
  };
  text: {
    header: {
      title: string;
    };
    pendingLabel: string;
    completedLabel: string;
    inTransitLabel: string;
    confirmedLabel: string;
    collectedLabel: string;
    checkBackLater: string;
    inTransitCTAOnLabel: string;
    inTransitCTABetweenLabel: string;
    inTransitCTABeforeLabel: string;
    inTransitCTAAfterLabel: string;
    inTransitCTAAndLabel: string;
    completedCTA: string;
    dates: DateConfig;
    shipsFromLabel: string;
    shipsToLabel: string;
    packageHistoryLabel: string;
  };
}

export type PartialTrackingConfig = DeepPartial<TrackingConfig>;

export interface TrackingFullConfig extends TrackingConfig, ArtaJsFullConfig {}

export const defaultTrackingConfig: TrackingConfig = {
  style: {
    color: {
      background: '#FFFFFF',
      textPrimary: '#110F10',
      textSecondary: '#6F6C65',
      border: '#D7D6D0',
      borderHover: '#6F6C65',
      borderFocused: '#110F10',
    },
    variant: 'default',
    position: 'right',
    fontFamily: 'Neue Haas Grotesk Text Pro, Arial, Helvetica, sans-serif',
    fontSize: 14,
  },
  text: {
    header: {
      title: 'Track Shipment',
    },
    pendingLabel: 'Pending',
    completedLabel: 'Completed',
    inTransitLabel: 'In Transit',
    confirmedLabel: 'Confirmed',
    collectedLabel: 'Collected',
    checkBackLater: 'Please check back later for delivery estimate.',
    inTransitCTAOnLabel: 'Delivery is currently estimated on',
    inTransitCTABetweenLabel: 'Delivery is currently estimated between',
    inTransitCTABeforeLabel: 'Delivery is currently estimated before',
    inTransitCTAAfterLabel: 'Delivery is currently estimated after',
    inTransitCTAAndLabel: 'and',
    completedCTA: 'Shipment delivered on',
    shipsFromLabel: 'Ships from',
    shipsToLabel: 'Ships to',
    packageHistoryLabel: 'Package history',
    dates: {
      weekdays: {
        sunday: 'Sun',
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
      },
      months: {
        january: 'Jan',
        february: 'Feb',
        march: 'Mar',
        april: 'Apr',
        may: 'May',
        june: 'Jun',
        july: 'Jul',
        august: 'Aug',
        september: 'Sep',
        october: 'Oct',
        november: 'Nov',
        december: 'Dec',
      },
    },
  },
};

export const getFullTrackingConfig = (
  artaConfig: ArtaJsFullConfig,
  trackingConfig?: PartialTrackingConfig
): TrackingFullConfig => {
  return nestedObjectAssign(
    deepClone(defaultTrackingConfig),
    artaConfig,
    trackingConfig
  );
};
