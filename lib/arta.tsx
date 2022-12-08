import { render } from 'preact';
import { Modal } from './components/Modal';
import { ArtaObject, Origin } from './types';

enum ModalStatus {
  CLOSED,
  DISQUALIFIED,
  LOADING,
  OPEN,
  QUOTED,
}

export interface IArta {
  status: ModalStatus;
  ready: boolean;
  init: (apiKey: string) => void;
}

export default class Arta implements IArta {
  private apiKey: string | undefined;
  private el: HTMLDivElement | undefined;
  constructor(public status = ModalStatus.CLOSED, public ready = false) {}

  public init(apiKey: string): void {
    this.apiKey = apiKey;
    if (document.querySelectorAll("#arta-widget").length) {
      return;
    }
    this.el = document.createElement('div');
    this.el.id = 'arta-widget';
    document.body.appendChild(this.el);
  }

  public estimate(artaOrigin: Origin, artaObject: ArtaObject) {
    return {
      open: () => {
        console.log(artaOrigin, this.el);
        render(<Modal color={artaOrigin}/>, this.el!);
      }
    };
  }
}
