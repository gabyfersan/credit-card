interface CardHolderInputFieldProps {
  cardName: string;
  setCardName: (value: string) => void;
}

export const CardHolderInputField: React.FC<
  CardHolderInputFieldProps
> = ({ cardName, setCardName }) => (
  <fieldset>
    <label htmlFor="card-holder">Card holder</label>
    <input
      type="text"
      id="card-holder"
      value={cardName}
      onChange={(event) => setCardName(event.target.value)}
    />
  </fieldset>
);
