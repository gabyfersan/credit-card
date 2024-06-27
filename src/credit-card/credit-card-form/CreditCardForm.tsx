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
            value={
              //cardNumArray[index] !== null ? cardNumArray[index] : ""
              extractOnlyNumbers(cardNumArray, index).join("")
            }
          />
        ))}
      </fieldset>
      <fieldset>
        <label htmlFor="card-holder">Card holder</label>
        <input type="text" id="card-holder" onKeyUp={keyUpCardName} />
      </fieldset>
      <fieldset className="fieldset-expiration">
        <label htmlFor="card-expiration-month">Expiration date</label>
        <div className="select">
          <select id="card-expiration-month">
            <option></option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i}>
                {String(i + 1).padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>
        <div className="select">
          <select id="card-expiration-year">
            <option></option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i}>{2024 + i}</option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset className="fieldset-ccv">
        <label htmlFor="card-ccv">CCV</label>
        <input type="text" id="card-ccv" maxLength={3} />
      </fieldset>
      <button className="btn">
        <i className="fa fa-lock"></i> submit
      </button>
    </form>
  );
};

export default CreditCardForm;
