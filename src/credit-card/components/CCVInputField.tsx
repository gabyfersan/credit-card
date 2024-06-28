// CCVInputField.tsx
import React from "react";

interface CCVInputFieldProps {
  cardCcv: string;
  setCardCcv: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const CCVInputField: React.FC<CCVInputFieldProps> = ({
  cardCcv,
  setCardCcv,
  onFocus,
  onBlur,
}) => {
  return (
    <fieldset className="fieldset-ccv">
      <label htmlFor="card-ccv">CCV</label>
      <input
        type="text"
        id="card-ccv"
        maxLength={3}
        value={cardCcv}
        onChange={(event) => setCardCcv(event.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </fieldset>
  );
};
