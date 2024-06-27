import React, { useState, useRef, useEffect } from "react";
import { extractOnlyNumbers } from "../../utils/utils";
import "./style.css";
//import { Form, Row, Col, Button } from 'react-bootstrap';

interface CreditCardFormProps {
  setCardNum: (a: string) => void;
  setCardName: (a: string) => void;
  setExpMonth: (a: string) => void;
  setExpYear: (a: string) => void;
  setCvv: (a: string) => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  setCardNum,
  setCardName,
  setExpMonth,
  setExpYear,
  setCvv,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [cardNumArray, setCardNumArray] = useState<number[]>(
    new Array(16).fill(null)
  );
  const [expMonth, setExpMonthState] = useState<string>("");
  const [expYear, setExpYearState] = useState<string>("");
  const [cardCcv, setCardCcv] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");

  useEffect(() => {
    console.log("cardNumArray", cardNumArray);
    setCardNum(extractOnlyNumbers(cardNumArray, 0, 16).join(""));
  }, [cardNumArray]);

  const keyUpCardNumber = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log("event.key", event.key);
    let newIndex = index;
    if (
      (event.key.length > 1 && !["Backspace"].includes(event.key)) ||
      (event.key.length === 1 && !/^[0-9]$/.test(event.key))
    ) {
      return;
    }
    const numberToAdd = parseInt(event.key);
    let tSubArray;
    if (
      extractOnlyNumbers(cardNumArray, newIndex).length === 4 &&
      newIndex < 3
    ) {
      newIndex += 1;
      inputRefs.current[newIndex]?.focus();
    }

    if (
      extractOnlyNumbers(cardNumArray, newIndex).length === 0 &&
      newIndex > 0 &&
      event.key == "Backspace"
    ) {
      newIndex -= 1;
      inputRefs.current[newIndex]?.focus();
    }

    tSubArray = extractOnlyNumbers(cardNumArray, newIndex);

    if (event.key == "Backspace") {
      tSubArray.pop();
    } else {
      if (tSubArray.length < 4) {
        tSubArray.push(numberToAdd);
      }
    }

    const fillArrayWithNulls =
      tSubArray.length >= 4
        ? tSubArray
        : tSubArray.concat(Array(4 - tSubArray.length).fill(null));

    setCardNumArray((prevArray) => {
      const newArray = [...prevArray];

      newArray.splice(
        newIndex * 4,
        fillArrayWithNulls.length,
        ...fillArrayWithNulls
      );
      return newArray;
    });
  };
  const keyUpCardName = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const { value } = event.target as HTMLInputElement;
    setCardName(value);
  };

  const handleChangeExpMonth = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setExpMonthState(value);
    setExpMonth(value);
  };

  const handleChangeExpYear = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setExpYearState(value);
    setExpYear(value);
  };

  const handleChangeCardCcv = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCardCcv(value);
    setCvv(value);
  };

  const handleChangeCardHolder = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCardHolder(value);
    setCardName(value);
  };
  return (
    <form className="form" autoComplete="off" noValidate>
      <fieldset>
        <label htmlFor="card-number">Card Number</label>
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            type="text"
            id={`card-number-${index}`}
            className="input-cart-number"
            maxLength={4}
            ref={(el) => (inputRefs.current[index] = el)}
            onKeyUp={(e) => keyUpCardNumber(e, index)}
            value={extractOnlyNumbers(cardNumArray, index).join("")}
          />
        ))}
      </fieldset>
      <fieldset>
        <label htmlFor="card-holder">Card holder</label>
        <input
          type="text"
          id="card-holder"
          value={cardHolder}
          onChange={handleChangeCardHolder}
        />
      </fieldset>
      <fieldset className="fieldset-expiration">
        <label htmlFor="card-expiration-month">Expiration date</label>
        <div className="select">
          <select
            id="card-expiration-month"
            value={expMonth}
            onChange={handleChangeExpMonth}
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
            onChange={handleChangeExpYear}
          >
            <option value=""></option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={String(24 + i)}>
                {2024 + i}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset className="fieldset-ccv">
        <label htmlFor="card-ccv">CCV</label>
        <input
          type="text"
          id="card-ccv"
          maxLength={3}
          value={cardCcv}
          onChange={handleChangeCardCcv}
        />
      </fieldset>
      <button className="btn">
        <i className="fa fa-lock"></i> submit
      </button>
    </form>
  );
};

export default CreditCardForm;
