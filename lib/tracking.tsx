import { render } from 'preact';
import type { TrackingFullConfig } from './trackingConfig';
import { TrackingDrawer } from './components/TrackingDrawer';
import { validateShipment } from './requests';

const SHIPMENT_LIMIT_IDX = 100;

export default class Tracking {
  public isReady = false;
  public isOpen = false;
  private shipmentIds: string[] = [];
  private fadeOut = {
    fade: {
      left: [{ opacity: 1 }, { opacity: 0 }],
      right: [{ opacity: 1 }, { opacity: 0 }],
    },
    slide: {
      left: [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-100%)' },
      ],
      right: [
        { transform: 'translateX(0)' },
        { transform: 'translateX(100%)' },
      ],
    },
  };
  constructor(
    private readonly shipmentIdOrIds: string | string[],
    private readonly config: TrackingFullConfig,
    private readonly el: HTMLDivElement
  ) {
    if (Array.isArray(this.shipmentIdOrIds)) {
      if (this.shipmentIdOrIds.length === 0) {
        throw new Error('Shipment id array is empty');
      }

      if (
        this.shipmentIdOrIds.some(
          (shipmentId) => typeof shipmentId !== 'string'
        )
      ) {
        throw new Error('Shipment id array contains non-string values');
      }

      if (this.shipmentIdOrIds.some((shipmentId) => shipmentId.length === 0)) {
        throw new Error('Shipment id array contains empty strings');
      }

      if (this.shipmentIdOrIds.length > SHIPMENT_LIMIT_IDX) {
        throw new Error(
          `Shipment id array contains more than ${SHIPMENT_LIMIT_IDX} shipment ids`
        );
      }
    }

    this.shipmentIds = Array.isArray(this.shipmentIdOrIds)
      ? this.shipmentIdOrIds
      : [this.shipmentIdOrIds];
  }

  public open() {
    this.render();
    this.isOpen = true;
  }

  private render() {
    render(
      <TrackingDrawer
        shipmentIds={this.shipmentIds}
        config={this.config}
        onClose={this.config.onClose ?? this.onClose.bind(this)}
      />,
      this.el
    );
  }

  public close() {
    if (this.isOpen) {
      if (this.config.animation?.out?.type != null) {
        const animation = document
          .getElementsByClassName(`artajs__drawer`)[0]
          ?.animate(
            this.fadeOut[this.config.animation.out.type][
              this.config.style.position
            ],
            {
              duration: this.config.animation.out.duration,
              easing: this.config.animation.out.easing,
            }
          );

        animation.onfinish = (e) => {
          e.preventDefault();
          render(<div></div>, this.el);
        };
      } else {
        render(<div></div>, this.el);
      }
    }
    this.isOpen = false;
  }

  public onClose(e: MouseEvent) {
    e.preventDefault();
    this.close();
    this.isOpen = false;
  }

  public async validate() {
    const shipmentIdsOrErrors = await Promise.all(
      this.shipmentIds.map(async (shipmentId) => {
        const errors = await validateShipment(this.config, shipmentId);
        if (errors && Object.keys(errors).length > 0) {
          return errors;
        }
        return shipmentId;
      })
    );

    const newShipmentIds = [];
    for (const shipmentIdOrError of shipmentIdsOrErrors) {
      if (typeof shipmentIdOrError === 'object') {
        console.error('Shipment validation failed', shipmentIdOrError);
      } else {
        newShipmentIds.push(shipmentIdOrError);
      }
    }

    if (newShipmentIds.length === 0) {
      return Promise.reject('No valid shipment ids');
    }
    this.isReady = true;
  }
}
