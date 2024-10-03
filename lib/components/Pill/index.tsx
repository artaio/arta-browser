import type { TrackingConfig } from "../../trackingConfig";
import type { ArtaPackage } from "../TrackingDrawer";

interface PillProps {
  config: TrackingConfig;
  pkg: ArtaPackage;
};

export const Pill = ({ config, pkg }: PillProps) => {
  return <div class="artajs__tracking__pill__wrapper">
    <div class="artajs__tracking__pill__round" style={{ background: config.pill[pkg.status].backgroundColor }}>
      <div class="artajs__tracking__pill__text" style={{ color: config.pill[pkg.status].textColor }}>
        {config.pill[pkg.status].text}
      </div>
    </div>
  </div>;
};