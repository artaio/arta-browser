
import Estimate from './estimate';
import { ArtaObject, ArtaLocation } from './types';

export interface ArtaJsConfig {
  position?: 'center' | 'left' | 'right';
  apiKey: string;
}

export interface IArta {
  ready: boolean;
  init: (apiKey: string, config?: ArtaJsConfig) => void;
}

export type ValidateResult = any;

const defaultConfig: Partial<ArtaJsConfig> = {
  position: 'right',
};

export default class Arta implements IArta {
  private el: HTMLDivElement | undefined;
  private config: ArtaJsConfig | undefined;

  constructor(public ready = false) {}

  public init(apiKey: string, config?: ArtaJsConfig): void {
    this.config = Object.assign({ ...defaultConfig, apiKey }, config);

    if (document.querySelectorAll('#arta-widget').length) {
      return;
    }
    this.el = document.createElement('div');
    this.el.id = 'arta-widget';
    document.body.appendChild(this.el);
  }

  public estimate(artaOrigin: ArtaLocation, artaObjects: ArtaObject[]) {
    return new Estimate(artaOrigin, artaObjects, this.config!, this.el!);
  }
}
