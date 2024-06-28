import React, { useState, useRef, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import CreditCardBox from "./credit-card-box/CreditCardBox";
import { CardInformation } from "../../types";

import { extractOnlyNumbers } from "../utils/utils";
import { CardNumberInputField } from "./components/CardNumberInputField";
import { CardHolderInputField } from "./components/CardHolderInputField";
import { ExpirationSelectInputField } from "./components/ExpirationSelectInputField";
import { CCVInputField } from "./components/CCVInputField";
import "./style.css";

interface CreditCardProps {
  setCardInformation: (a: CardInformation) => void;
  cardHolder: string;
  cardNumber: string;
}

const CreditCard: React.FC<CreditCardProps> = ({
  setCardInformation,
  cardNumber,
  cardHolder,
}) => {
  // const [cardNum, setCardNum] = useState(cardNumber);
  // const [cardName, setCardName] = useState(cardHolder);
  // const [expMonth, setExpMonth] = useState("");
  // const [expYear, setExpYear] = useState("");
  // const [cvv, setCvv] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [cardNumArray, setCardNumArray] = useState<number[]>(
    new Array(16).fill(null)
  );
  const [expMonth, setExpMonth] = useState<string>("");
  const [expYear, setExpYear] = useState<string>("");
  const [cardCcv, setCardCcv] = useState<string>("");
  const [cardName, setCardName] = useState<string>(cardHolder);
  const [cardNum, setCardNum] = useState<string>(cardNumber);

  useEffect(() => {
    setCardNum(extractOnlyNumbers(cardNumArray, 0, 16).join(""));
  }, [cardNumArray]);

  return (
    <div className="checkout">
      <CreditCardBox
        cardNum={cardNum}
        cardName={cardName}
        expMonth={expMonth}
        expYear={expYear}
        cardCcv={cardCcv}
      />
      {/* <CreditCardForm
        setCardNum={setCardNum}
        setCardName={setCardName}
        setExpMonth={setExpMonth}
        setExpYear={setExpYear}
        setCvv={setCvv}
      /> */}

      <form className="form" autoComplete="off" noValidate>
        <CardNumberInputField
          cardNumArray={cardNumArray}
          setCardNumArray={setCardNumArray}
          inputRefs={inputRefs}
        />
        <CardHolderInputField
          cardName={cardName}
          setCardName={setCardName}
        />
        <ExpirationSelectInputField
          expMonth={expMonth}
          setExpMonth={setExpMonth}
          expYear={expYear}
          setExpYear={setExpYear}
        />
        <CCVInputField cardCcv={cardCcv} setCardCcv={setCardCcv} />
        <button className="btn">
          <i className="fa fa-lock"></i> submit
        </button>
      </form>
    </div>
  );
};

export default CreditCard;

// interface CreditCardFormProps {
//   setCardNum: (a: string) => void;
//   setCardName: (a: string) => void;
//   setExpMonth: (a: string) => void;
//   setExpYear: (a: string) => void;
//   setCvv: (a: string) => void;
// }

// const CreditCardForm: React.FC<CreditCardFormProps> = ({
//   setCardNum,
//   setCardName,
//   setExpMonth,
//   setExpYear,
//   setCvv,
// }) => {

//return (

//);
// };

//export default CreditCardForm;
