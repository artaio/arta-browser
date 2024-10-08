import type { TrackingConfig } from '../../../trackingConfig';

export const PendingIconBase = ({ config }: { config: TrackingConfig }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z"
        fill={config.style.color.iconPrimary}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.6 12.7099C21.0537 12.7722 20.7821 12.8299 20.436 12.9569C19.9435 13.1376 19.4518 13.4292 19.0675 13.7685C18.4101 14.349 17.9618 15.0797 17.7375 15.9361L17.6715 16.1881L16.1018 16.2007C14.5707 16.2131 14.5273 16.2147 14.3413 16.267C13.9273 16.3832 13.4827 16.6632 13.2316 16.9657C12.9688 17.2825 12.8246 17.5821 12.7433 17.9798C12.6968 18.2076 12.696 18.3411 12.6963 25.7558C12.6966 33.0276 12.6983 33.3079 12.7415 33.5161C12.8361 33.9723 13.0303 34.3374 13.3465 34.6536C13.6418 34.9489 13.9818 35.1382 14.4183 35.2505C14.5683 35.2891 14.8514 35.2921 18.336 35.2921H22.092L22.2276 35.2285C22.4002 35.1476 22.5475 35.0002 22.6284 34.8276C22.719 34.6343 22.719 34.3658 22.6284 34.1725C22.5475 33.9999 22.4002 33.8526 22.2276 33.7716L22.092 33.7081L14.724 33.6841L14.609 33.6165C14.4785 33.5398 14.3633 33.395 14.3278 33.2633C14.3119 33.2041 14.3058 30.6435 14.3099 25.701C14.3158 18.462 14.3174 18.2254 14.3607 18.1441C14.4234 18.0265 14.5157 17.9325 14.628 17.8719C14.7235 17.8203 14.7336 17.82 16.656 17.8081C18.5799 17.7961 18.5885 17.7959 18.7016 17.7436C18.868 17.6667 18.9719 17.5794 19.0632 17.4399C19.1617 17.2894 19.1929 17.1699 19.2119 16.8721C19.2575 16.1542 19.5284 15.5575 20.0325 15.0644C20.6333 14.4765 21.5139 14.1998 22.332 14.3417C23.0435 14.4651 23.6372 14.8299 24.071 15.4102C24.3848 15.8299 24.5484 16.308 24.5973 16.9482C24.6139 17.1642 24.6317 17.2544 24.6754 17.342C24.7547 17.5013 24.9133 17.6561 25.0747 17.7317L25.212 17.7961L27.144 17.8081C29.0664 17.82 29.0765 17.8203 29.172 17.8719C29.2843 17.9325 29.3767 18.0265 29.4393 18.1441C29.4808 18.222 29.4849 18.3176 29.496 19.4641C29.5077 20.6704 29.5093 20.7028 29.5603 20.8133C29.8049 21.3427 30.4872 21.4612 30.879 21.0424C30.9386 20.9786 31.0109 20.8756 31.0397 20.8133C31.091 20.7023 31.0922 20.6757 31.099 19.4678C31.1067 18.1317 31.0989 18.0227 30.9706 17.6555C30.7422 17.0016 30.1542 16.4611 29.46 16.2671C29.2726 16.2147 29.2301 16.2131 27.6983 16.2007L26.1285 16.1881L26.0625 15.9361C25.8871 15.2662 25.5684 14.6617 25.1273 14.1622C24.4615 13.4083 23.5471 12.9044 22.572 12.754C22.3509 12.72 21.7507 12.6927 21.6 12.7099ZM21.6 15.5476C21.089 15.6812 20.7556 16.1247 20.7567 16.6694C20.7575 17.0205 20.8761 17.2858 21.1359 17.5174C21.3625 17.7193 21.5937 17.8069 21.9 17.8069C22.2063 17.8069 22.4376 17.7193 22.6641 17.5174C22.9239 17.2858 23.0426 17.0205 23.0433 16.6694C23.0449 15.892 22.3497 15.3516 21.6 15.5476ZM17.4452 21.849C17.237 21.9239 17.0503 22.0948 16.9602 22.2931C16.9216 22.378 16.9097 22.452 16.9097 22.6081C16.9097 22.8538 16.959 22.9812 17.121 23.1544C17.254 23.2965 17.4018 23.373 17.5984 23.4015C17.7944 23.4298 22.5028 23.4296 22.6989 23.4013C22.8906 23.3736 23.0263 23.3077 23.1584 23.1784C23.3788 22.9625 23.4582 22.6197 23.3529 22.3392C23.2887 22.1686 23.1206 21.9782 22.9586 21.8928L22.836 21.8281L20.184 21.8229C18.0564 21.8188 17.5149 21.8239 17.4452 21.849ZM28.632 22.5039C26.58 22.5971 24.7194 23.6431 23.5797 25.3441C22.1468 27.4828 22.1384 30.2741 23.5583 32.4276C24.0309 33.1442 24.6694 33.7789 25.404 34.262C27.0768 35.3622 29.2281 35.6052 31.1194 34.9075C31.4317 34.7923 32.0221 34.5023 32.292 34.3314C33.0935 33.824 33.824 33.0935 34.3313 32.2921C34.5022 32.0222 34.7923 31.4317 34.9075 31.1194C35.6105 29.2134 35.3606 27.0611 34.2396 25.3681C33.2095 23.8122 31.5396 22.7759 29.7 22.5508C29.398 22.5139 28.8968 22.4918 28.632 22.5039ZM28.476 24.1218C27.8523 24.177 27.287 24.3443 26.688 24.6511C25.8135 25.0991 25.099 25.8136 24.6511 26.6881C24.3245 27.3256 24.1755 27.8495 24.1171 28.5656C24.0403 29.5073 24.2947 30.5585 24.8 31.3876C26.0806 33.489 28.7523 34.2873 30.957 33.2273C31.4739 32.9788 31.8005 32.7528 32.204 32.3647C32.658 31.928 32.9216 31.5709 33.1911 31.0278C33.8583 29.6832 33.8637 28.1408 33.2059 26.7964C32.3322 25.0109 30.4514 23.9473 28.476 24.1218ZM17.5798 25.3197C17.3266 25.357 17.0708 25.5538 16.9607 25.7958C16.9219 25.8814 16.9095 25.9566 16.9089 26.1121C16.9081 26.2874 16.9173 26.3351 16.9745 26.4515C17.0483 26.6017 17.1967 26.7516 17.3556 26.8364L17.46 26.8921L19.0594 26.8987C20.6344 26.9053 20.6608 26.9046 20.7937 26.8549C20.9485 26.7969 21.1362 26.6285 21.2125 26.479C21.3259 26.2566 21.3212 25.9476 21.2009 25.7267C21.0791 25.5029 20.8781 25.3643 20.6129 25.3212C20.4381 25.2929 17.7714 25.2916 17.5798 25.3197ZM17.5165 28.8327C17.1959 28.903 16.9455 29.1863 16.9059 29.5237C16.8742 29.793 16.9908 30.0661 17.2119 30.2409C17.4324 30.4152 17.3728 30.4102 19.1422 30.4027L20.724 30.3961L20.8419 30.3361C20.9824 30.2646 21.1521 30.1013 21.216 29.9761C21.2413 29.9265 21.2722 29.8225 21.2846 29.745C21.3439 29.3737 21.1651 29.0405 20.82 28.8793L20.676 28.8121L19.164 28.8075C18.0358 28.8041 17.6176 28.8105 17.5165 28.8327Z"
        fill={config.style.color.iconSecondary}
      />
      <path
        d="M28.5134 26.4623C28.5606 26.2071 28.7409 25.9908 28.9865 25.8948C29.3452 25.7545 29.7554 25.9272 29.9306 26.2922L29.9997 26.4362L29.9998 28.4851L31.0378 28.4926C32.0619 28.5001 32.0774 28.501 32.1958 28.5554C32.4295 28.6628 32.601 28.8816 32.6392 29.121C32.6969 29.4829 32.4997 29.8253 32.1588 29.9548C32.0463 29.9976 31.9535 30.0002 30.5758 30.0002C29.198 30.0002 29.1053 29.9976 28.9928 29.9548C28.7425 29.8597 28.5612 29.6446 28.5134 29.3862C28.4786 29.1977 28.4786 26.6508 28.5134 26.4623Z"
        fill={config.style.color.iconSecondary}
      />
    </svg>
  );
};
