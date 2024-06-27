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
    const inputValue = (event.target as HTMLInputElement).value;
    //alert(event.target.id.match(/\d+/)[0]);

    //const id = (event.target as HTMLInputElement).id;
    //const index = parseInt(id.match(/\d+/)?.[0] ?? "0");
    let tSubArray;
    if (
      extractOnlyNumbers(cardNumArray, newIndex).length === 4 &&
      // cardNumArray
      //   .slice(newIndex * 4, newIndex * 4 + 4)
      //   .filter((item) => typeof item === "number").length === 4
      newIndex < 3
    ) {
      //inputRefs.current[newIndex - 1]?.focus();
      newIndex += 1;
      inputRefs.current[newIndex]?.focus();

      // inputRefs.current[newIndex + 1]?.value = event.key;
    }

    if (
      extractOnlyNumbers(cardNumArray, newIndex).length === 0 &&
      // cardNumArray
      //   .slice(newIndex * 4, newIndex * 4 + 4)
      //   .filter((item) => typeof item === "number").length === 0
      newIndex > 0 &&
      event.key == "Backspace"
    ) {
      //inputRefs.current[newIndex - 1]?.focus();
      newIndex -= 1;
      inputRefs.current[newIndex]?.focus();

      // inputRefs.current[newIndex + 1]?.value = event.key;
    }

    // tSubArray = cardNumArray
    //   .slice(newIndex * 4, newIndex * 4 + 4)
    //   .filter((item) => typeof item === "number");

    tSubArray = extractOnlyNumbers(cardNumArray, newIndex);

    // if (numberToAdd == "Backspace") {
    //   //newIndex += 1;
    //   //inputRefs.current[newIndex]?.focus();
    //   // inputRefs.current[newIndex + 1]?.value = event.key;
    // }

    if (event.key == "Backspace") {
      tSubArray.pop();
    } else {
      if (tSubArray.length < 4) {
        tSubArray.push(numberToAdd);
      }
    }

    //let insertArray = Array.from(value).map(Number);

    const fillArrayWithNulls =
      tSubArray.length >= 4
        ? tSubArray
        : tSubArray.concat(Array(4 - tSubArray.length).fill(null));

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
        newIndex * 4,
        fillArrayWithNulls.length,
        ...fillArrayWithNulls
      );
      return newArray;
    });

    // if (inputValue.length === 4 && newIndex < 3) {
    //   inputRefs.current[newIndex + 1]?.focus();
    // }
    // if (inputValue.length === 0 && newIndex > 0) {
    //   inputRefs.current[newIndex - 1]?.focus();
    // }
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
              extractOnlyNumbers(cardNumArray, index)
                // cardNumArray
                //   .slice(index * 4, index * 4 + 4)
                //   .filter((item) => typeof item === "number")
                .join("")
            }
          />

          // <input
          //   key={i}
          //   onKeyUp={(e) => keyUpCardNumber(e, i)}
          //   type="text"
          //   id={`card-number-${i}`}
          //   className="input-cart-number"
          //   maxLength={4}
          //   ref={(el) => (inputRefs.current[i] = el)}
          // />
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
