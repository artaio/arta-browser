export const EmptyStep = ({
  stroke,
  text,
}: {
  stroke: string;
  text: string;
}) => {
  return (
    <div class="artajs__tracking__timeline__step">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="5.5"
          fill="none"
          stroke={stroke}
          stroke-width="2"
        />
      </svg>
      <div class="artajs__tracking__timeline__step__text__secondary">
        {text}
      </div>
    </div>
  );
};
