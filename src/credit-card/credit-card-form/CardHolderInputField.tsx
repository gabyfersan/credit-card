interface CardHolderInputFieldProps {
  cardHolder: string;
  setCardHolder: (value: string) => void;
}

export const CardHolderInputField: React.FC<
  CardHolderInputFieldProps
> = ({ cardHolder, setCardHolder }) => (
  <fieldset>
    <label htmlFor="card-holder">Card holder</label>
    <input
      type="text"
      id="card-holder"
      value={cardHolder}
      onChange={(event) => setCardHolder(event.target.value)}
    />
  </fieldset>
);
