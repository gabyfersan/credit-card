interface ExpirationSelectInputFieldProps {
  expMonth: string;
  setExpMonthState: (value: string) => void;
  expYear: string;
  setExpYearState: (value: string) => void;
}

export const ExpirationSelectInputField: React.FC<
  ExpirationSelectInputFieldProps
> = ({ expMonth, setExpMonthState, expYear, setExpYearState }) => (
  <fieldset className="fieldset-expiration">
    <label htmlFor="card-expiration-month">Expiration date</label>
    <div className="select">
      <select
        id="card-expiration-month"
        value={expMonth}
        onChange={(event) => setExpMonthState(event.target.value)}
      >
        <option value=""></option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={String(i + 1).padStart(2, "0")}>
            {String(i + 1).padStart(2, "0")}
          </option>
        ))}
      </select>
    </div>
    <div className="select">
      <select
        id="card-expiration-year"
        value={expYear}
        onChange={(event) => setExpYearState(event.target.value)}
      >
        <option value=""></option>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i} value={String(2024 + i)}>
            {2024 + i}
          </option>
        ))}
      </select>
    </div>
  </fieldset>
);
