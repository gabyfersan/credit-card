import React, { useState, useRef, useEffect } from "react";
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
  }, [cardNumArray]);

  const keyUpCardNumber = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const { value } = event.target as HTMLInputElement;
    //alert(event.target.id.match(/\d+/)[0]);

    const id = (event.target as HTMLInputElement).id;
    const index = parseInt(id.match(/\d+/)?.[0] ?? "0");

    if (
      cardNumArray
        .slice(index * 4, 4)
        .filter((item) => typeof item === "number").length === 4 &&
      index < 3
    ) {
      //inputRefs.current[index - 1]?.focus();
      inputRefs.current[index + 1]?.focus();
      // inputRefs.current[index + 1]?.value = event.key;
    }
    // const f = String(value).split("");

    let insertArray = Array.from(value).map(Number);

    const fillArrayWithNulls =
      insertArray.length >= 4
        ? insertArray
        : insertArray.concat(
            Array(4 - insertArray.length).fill(null)
          );

    // cardNumArray.splice(
    //   index * 4,
    //   insertArray.length,
    //   ...insertArray
    // );

    //   setCardNumArray(
    //     cardNumArray.toSpliced(
    //       index * 4,
    //       value.split().length,
    //       f.join(",")
    //     )
    //   );
    // };
    // console.log(
    //   [...cardNumArray],
    //   insertArray,
    //   [...cardNumArray].splice(
    //     index * 4,
    //     insertArray.length,
    //     ...insertArray
    //   )
    // );
    // console.log(cardNumArray);
    // [...cardNumArray].splice(
    //   index * 4,
    //   fillArrayWithNulls.length,
    //   ...fillArrayWithNulls
    // );
    //setCardNumArray(cardNumArray);
    setCardNumArray((prevArray) => {
      const newArray = [...prevArray];
      //newArray.splice(index * 4, 4, ...fillArrayWithNulls);

      newArray.splice(
        index * 4,
        fillArrayWithNulls.length,
        ...fillArrayWithNulls
      );
      return newArray;
    });

    if (value.length === 4 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
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

        {[0, 1, 2, 3].map((i) => (
          <input
            key={i}
            onKeyUp={(e) => keyUpCardNumber(e, i)}
            type="text"
            id={`card-number-${i}`}
            className="input-cart-number"
            maxLength={4}
            ref={(el) => (inputRefs.current[i] = el)}
          />
        ))}

        {/* <input
          onKeyUp={keyUpCardNumber}
          type="num"
          id="card-number-0"
          className="input-cart-number"
          maxLength={4}
        />
        <input
          onKeyUp={keyUpCardNumber}
          type="num"
          id="card-number-1"
          className="input-cart-number"
          maxLength={4}
        />
        <input
          onKeyUp={keyUpCardNumber}
          type="num"
          id="card-number-2"
          className="input-cart-number"
          maxLength={4}
        />
        <input
          onKeyUp={keyUpCardNumber}
          type="num"
          id="card-number-3"
          className="input-cart-number"
          maxLength={4}
        /> */}
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
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option>05</option>
            <option>06</option>
            <option>07</option>
            <option>08</option>
            <option>09</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </select>
        </div>
        <div className="select">
          <select id="card-expiration-year">
            <option></option>
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
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
