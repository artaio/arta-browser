interface HeaderOpts {
  onClose: (e: any) => void;
  title: string;
  lineColor: string;
}

export const DrawerHeader = ({ onClose, title, lineColor }: HeaderOpts) => {
  return (
    <div>
      <div class="artajs__drawer__header">
        <div className="artajs__drawer__header__cta">{title}</div>
        <div className="artajs__drawer__header__close">
          <a onClick={onClose} href="#">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="6.70711"
                y1="6.29289"
                x2="18.0208"
                y2="17.6066"
                stroke-width="2"
              />
              <line
                x1="6.29289"
                y1="17.6066"
                x2="17.6066"
                y2="6.29291"
                stroke-width="2"
              />
            </svg>
          </a>
        </div>
      </div>
      <svg class="artajs__drawer__header__divider" width="100%" height="5">
        <line
          x1="0"
          y1="5"
          x2="100%"
          y2="5"
          style={`stroke: ${lineColor} ; stroke-width: 1;`}
        />
      </svg>
    </div>
  );
};
