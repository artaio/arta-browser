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

interface PillConfig {
  textColor: string;
  backgroundColor: string;
  text: string;
}

export interface TrackingConfig {
  navigation: {
    shipmentExceptionMailTo: string;
  };
  style: {
    color: {
      background: string;
      textPrimary: string;
      textSecondary: string;
      border: string;
      icon: string;
      iconBackground: string;
      exceptionIcon: string;
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
    cancelledLabel: string;
    checkBackLater: string;
    cancelledMessage: string;
    noObjectDetailsTitle: string;
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
    bookedLabel: string;
    shipmentExceptionCTA: string;
    packageIdReturnLabel: string;
    packageLabel: string;
    historyLabel: string;
    unknownLocation: string;
    paymentRequiredLabel: string;
    holdRequestedLabel: string;
    multipleShipmentsHeldAtCustomsLabel: string;
    singleShipmentHeldAtCustomsLabel: string;
    changeOfAddressRequestLabel: string;
    shipmentExceptionDefaultLabel: string;
  };
  pill: {
    unknown: PillConfig;
    pending: PillConfig;
    notfound: PillConfig;
    transit: PillConfig;
    out_for_delivery: PillConfig;
    delivered: PillConfig;
    undelivered: PillConfig;
    exception: PillConfig;
    expired: PillConfig;
  };
}

export type PartialTrackingConfig = DeepPartial<TrackingConfig>;

export interface TrackingFullConfig extends TrackingConfig, ArtaJsFullConfig {}

export const defaultTrackingConfig: TrackingConfig = {
  navigation: {
    shipmentExceptionMailTo: 'hello@arta.io',
  },
  style: {
    color: {
      background: '#FFFFFF',
      textPrimary: '#110F10',
      textSecondary: '#6F6C65',
      border: '#D7D6D0',
      icon: 'white',
      iconBackground: 'black',
      exceptionIcon: '#F59E0B',
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
    cancelledLabel: 'Cancelled',
    cancelledMessage: 'This shipment was cancelled.',
    checkBackLater: 'Please check back later for delivery estimate.',
    noObjectDetailsTitle: 'Title Not Provided',
    inTransitCTAOnLabel: 'Delivery is currently estimated on',
    inTransitCTABetweenLabel: 'Delivery is currently estimated between',
    inTransitCTABeforeLabel: 'Delivery is currently estimated before',
    inTransitCTAAfterLabel: 'Delivery is currently estimated after',
    inTransitCTAAndLabel: 'and',
    completedCTA: 'Shipment delivered on',
    shipsFromLabel: 'Ships from',
    shipsToLabel: 'Ships to',
    packageHistoryLabel: 'Package history',
    bookedLabel: 'Booked: ',
    shipmentExceptionCTA: 'Contact Arta for more information',
    packageIdReturnLabel: '< Back',
    packageLabel: 'Package',
    historyLabel: 'History',
    unknownLocation: '-',
    paymentRequiredLabel: 'Payment required.',
    holdRequestedLabel: 'This shipment is on hold by request.',
    singleShipmentHeldAtCustomsLabel: 'This shipment is being held by Customs',
    multipleShipmentsHeldAtCustomsLabel:
      'One or more packages are being held by Customs',
    changeOfAddressRequestLabel:
      'A change of address was requested which may impact delivery timelines.',
    shipmentExceptionDefaultLabel: 'There is an exception with this shipment.',
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
  pill: {
    unknown: {
      textColor: '#202020',
      backgroundColor: '#D2D2D2',
      text: 'Unknown',
    },
    pending: {
      textColor: '#202020',
      backgroundColor: '#D2D2D2',
      text: 'Pending',
    },
    notfound: {
      textColor: '#202020',
      backgroundColor: '#D2D2D2',
      text: 'Not Found',
    },
    transit: {
      textColor: '#379464',
      backgroundColor: '#EFF8F3',
      text: 'In Transit',
    },
    out_for_delivery: {
      textColor: '#379464',
      backgroundColor: '#EFF8F3',
      text: 'Out for Delivery',
    },
    delivered: {
      textColor: '#173E2A',
      backgroundColor: '#D6EDE1',
      text: 'Delivered',
    },
    undelivered: {
      textColor: '#772424',
      backgroundColor: '#FEF9F9',
      text: 'Undelivered',
    },
    exception: {
      textColor: '#976315',
      backgroundColor: '#FEF6E9',
      text: 'Exception',
    },
    expired: {
      textColor: '#772424',
      backgroundColor: '#FEF9F9',
      text: 'Expired',
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
