export const Invalidated = ({
  message,
  detail,
}: {
  message: string;
  detail: string;
}) => {
  return (
    <div class="artajs__modal__quotes">
      <div class="artajs__modal__quotes__box">
        <p class="artajs__modal__quotes__disqualified">{message}</p>
        <br />
        <p class="artajs__modal__quotes__disqualified">{detail}</p>
      </div>
    </div>
  );
};
