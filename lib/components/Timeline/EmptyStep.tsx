export const EmptyStep = ({ text }: { text: string }) => {
  return (
    <div class="artajs__tracking__timeline__step">
      {/* TODO use color secondary?? */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="5.5" fill="white" stroke="#9D9D9D" />
      </svg>
      <div class="artajs__tracking__timeline__step__text__secondary">
        {text}
      </div>
    </div>
  );
};
