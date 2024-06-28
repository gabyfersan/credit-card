interface ExpirationSelectInputFieldProps {
  expMonth: string;
  setExpMonth: (value: string) => void;
  expYear: string;
  setExpYear: (value: string) => void;
}

export const ExpirationSelectInputField: React.FC<
  ExpirationSelectInputFieldProps
> = ({ expMonth, setExpMonth, expYear, setExpYear }) => (
  <fieldset className="fieldset-expiration">
    <label htmlFor="card-expiration-month">Expiration date</label>
    <div className="select">
      <select
        id="card-expiration-month"
        value={expMonth}
        onChange={(event) => setExpMonth(event.target.value)}
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
        onChange={(event) => setExpYear(event.target.value)}
      >
        <option value=""></option>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i} value={String(2024 + i).slice(2, 4)}>
            {2024 + i}
          </option>
        ))}
      </select>
    </div>
  </fieldset>
);
