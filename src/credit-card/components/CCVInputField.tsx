interface CCVInputFieldProps {
  cardCcv: string;
  setCardCcv: (value: string) => void;
}

export const CCVInputField: React.FC<CCVInputFieldProps> = ({
  cardCcv,
  setCardCcv,
}) => (
  <fieldset className="fieldset-ccv">
    <label htmlFor="card-ccv">CCV</label>
    <input
      type="text"
      id="card-ccv"
      maxLength={3}
      value={cardCcv}
      onChange={(event) => setCardCcv(event.target.value)}
    />
  </fieldset>
);
