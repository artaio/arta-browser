import { ArtaJsFullConfig } from './arta';
import { deepClone, DeepPartial, nestedObjectAssign } from './helper';

export interface DateConfig {
  locale: Intl.LocalesArgument;
  formatOptions: Intl.DateTimeFormatOptions;
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

export type AnimationConfig =
  | {
      type: null;
    }
  | {
      type: 'slide' | 'fade';
      duration: number;
      easing: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    };

export interface TrackingConfig {
  onClose?: (e: MouseEvent) => void;
  navigation: {
    shipmentExceptionMailTo: string;
  };
  style: {
    color: {
      background: string;
      textPrimary: string;
      textSecondary: string;
      border: string;
      iconPrimary: string;
      iconSecondary: string;
      iconTertiary: string;
      exceptionIcon: string;
      buttonBackground: string;
      buttonBackgroundHover: string;
      buttonBorder: string;
      buttonText: string;
      buttonTextHover: string;
      buttonBorderHover: string;
    };
    variant: 'default' | 'minimal';
    position: 'left' | 'right';
    fontFamily: string;
    fontSize: number;
    backdropEnabled: boolean;
    backdropColor: string;
  };
  text: {
    header: {
      title: string;
      titleShipmentList: string;
      titleShipmentDetail: string;
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
    viewShipmentDetailLabel: string;
    viewShipmentsListLabel: string;
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

    cancelled: PillConfig;
    collected: PillConfig;
    completed: PillConfig;
    confirmed: PillConfig;
  };
  animation: {
    in: AnimationConfig;
    out: AnimationConfig;
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
      border: '#E7E7E7',
      iconPrimary: 'black',
      iconSecondary: 'white',
      iconTertiary: '#8C8984',
      exceptionIcon: '#F59E0B',
      buttonBackground: '#110F10',
      buttonBackgroundHover: '#6F6C65',
      buttonBorder: '#110F10',
      buttonText: '#FFFFFF',
      buttonTextHover: '#FFFFFF',
      buttonBorderHover: '#110F10',
    },
    variant: 'default',
    position: 'right',
    fontFamily: 'Neue Haas Grotesk Text Pro, Arial, Helvetica, sans-serif',
    fontSize: 14,
    backdropEnabled: true,
    backdropColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    header: {
      title: 'Track Shipment',
      titleShipmentList: 'Shipments List',
      titleShipmentDetail: 'Shipment Detail',
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
    viewShipmentDetailLabel: 'View Details',
    viewShipmentsListLabel: '< All Shipments',
    dates: {
      locale: navigator.language,
      formatOptions: { dateStyle: 'medium' },
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
      backgroundColor: '#E7E7E7',
      text: 'Unknown',
    },
    pending: {
      textColor: '#202020',
      backgroundColor: '#E7E7E7',
      text: 'Pending',
    },
    notfound: {
      textColor: '#202020',
      backgroundColor: '#E7E7E7',
      text: 'Not Found',
    },
    transit: {
      textColor: '#276947',
      backgroundColor: '#EFF8F3',
      text: 'In Transit',
    },
    out_for_delivery: {
      textColor: '#276947',
      backgroundColor: '#EFF8F3',
      text: 'Out for Delivery',
    },
    delivered: {
      textColor: '#173E2A',
      backgroundColor: '#D6EDE1',
      text: 'Delivered',
    },
    undelivered: {
      textColor: '#8C8984',
      backgroundColor: '#E7E7E7',
      text: 'Undelivered',
    },
    exception: {
      textColor: '#875706',
      backgroundColor: '#FEF9F9',
      text: 'Exception',
    },
    expired: {
      textColor: '#8C8984',
      backgroundColor: '#E7E7E7',
      text: 'Expired',
    },
    cancelled: {
      textColor: '#772424',
      backgroundColor: '#FEF9F9',
      text: 'Cancelled',
    },
    collected: {
      textColor: '#173E2A',
      backgroundColor: '#D6EDE1',
      text: 'Collected',
    },
    completed: {
      textColor: '#173E2A',
      backgroundColor: '#D6EDE1',
      text: 'Completed',
    },
    confirmed: {
      textColor: '#173E2A',
      backgroundColor: '#D6EDE1',
      text: 'Confirmed',
    },
  },
  animation: {
    in: {
      type: null,
    },
    out: {
      type: null,
    },
  },
};

export const getFullTrackingConfig = (
  artaConfig: ArtaJsFullConfig,
  trackingConfig?: PartialTrackingConfig
): TrackingFullConfig => {
  const merged = nestedObjectAssign(
    deepClone(defaultTrackingConfig),
    artaConfig,
    trackingConfig
  );

  // Do not merge the default formatOptions: { dateStyle: 'medium' }, as it will override
  // the object property if none is passed which can lead to formatLocaleString to throw
  merged.text.dates.formatOptions =
    trackingConfig?.text?.dates?.formatOptions ??
    defaultTrackingConfig.text.dates.formatOptions;
  return merged;
};
