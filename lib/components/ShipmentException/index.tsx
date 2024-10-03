import { TrackingConfig } from "../../trackingConfig";
import { Shipment } from "../TrackingDrawer";

interface ShipmentExceptionProps {
  config: TrackingConfig;
  shipment: Shipment;
}

export const ShipmentException = ({ config, shipment }: ShipmentExceptionProps) => {

  const exception = shipment.shipment_exceptions.find((exception) => exception.status === 'new' || exception.status === 'in_progress');

  if (!exception) {
    return <div />;
  }

  return <div class="artajs__tracking__exception__wrapper">
    <div width={24} height={24}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g clip-path="url(#clip0_68_965)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.876 0.0379302C6.8232 0.0567702 6.72823 0.112618 6.66494 0.162034C6.57775 0.230146 1.92742 5.02415 0.332448 6.69015C0.152016 6.87863 0.08976 6.96179 0.050448 7.06686L0 7.20171V11.9999V16.7981L0.050448 16.933C0.08976 17.038 0.15204 17.1212 0.332448 17.3097C1.91086 18.9587 6.5777 23.7696 6.66494 23.8377C6.89042 24.0135 6.44273 23.9999 12 23.9999C17.5573 23.9999 17.1097 24.0135 17.335 23.8377C17.3982 23.7883 18.6553 22.5005 20.1284 20.9759C24.1688 16.7945 23.8914 17.0872 23.9408 16.953C23.9645 16.8886 23.9929 16.8256 24.004 16.8131C24.0295 16.7841 24.0305 7.14505 24.005 7.16079C23.9946 7.16725 23.967 7.1187 23.9436 7.05289C23.8948 6.91547 24.1922 7.22958 20.1284 3.02391C18.6553 1.49931 17.3982 0.211522 17.335 0.162178C17.1096 -0.0137898 17.5592 -0.00030184 11.9897 0.00181016C7.70887 0.00341816 6.95791 0.00872216 6.876 0.0379302ZM4.47 4.57556L1.512 7.63674V11.9999V16.3631L4.47 19.4243L7.428 22.4855L12 22.4855L16.572 22.4854L19.53 19.4243L22.488 16.3631V12V7.637L19.53 4.57573L16.572 1.51446L12 1.51443L7.428 1.51441L4.47 4.57556ZM11.8079 4.36491C11.6147 4.42825 11.4121 4.5939 11.32 4.76391L11.268 4.85991L11.2617 9.1892L11.2555 13.5185L11.3122 13.6423C11.3935 13.8199 11.5023 13.9322 11.6757 14.0175C12.0594 14.2065 12.5052 14.0412 12.6878 13.6423L12.7445 13.5185L12.7383 9.1892C12.7323 5.04174 12.7302 4.85653 12.688 4.77918C12.6158 4.64694 12.4541 4.48777 12.325 4.42201C12.1958 4.35623 11.9254 4.32637 11.8079 4.36491ZM0.01176 11.9999C0.01176 14.6597 0.014568 15.7478 0.018 14.4179C0.021432 13.088 0.021432 10.9118 0.018 9.58191C0.014568 8.25203 0.01176 9.34011 0.01176 11.9999ZM11.6583 15.6465C11.2841 15.7661 10.9657 16.1166 10.8963 16.4852C10.8213 16.8836 10.931 17.2443 11.2119 17.5235C11.6498 17.9588 12.3502 17.9588 12.7881 17.5235C13.3085 17.0063 13.2181 16.1646 12.5997 15.7677C12.3413 15.6019 11.9539 15.552 11.6583 15.6465Z" fill="#F59E0B" />
        </g>
        <defs>
          <clipPath id="clip0_68_965">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
    <div class="artajs__tracking__exception__content">
      {/* TODO: expose proper message from the backend */}
      <div class="artajs__tracking__exception__title">
        {exception.type}
      </div>
      <a
        href={`mailto:${config.navigation.shipmentExceptionMailTo}`}
        class="artajs__tracking__exception__cta">
        {config.text.shipmentExceptionCTA}
      </a>

    </div>
  </div>;
};
