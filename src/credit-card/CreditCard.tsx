import React, { useState, useRef, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import CreditCardBox from "./credit-card-box/CreditCardBox";
import { CardNumberInputField } from "./components/CardNumberInputField";
import { CardHolderInputField } from "./components/CardHolderInputField";
import { ExpirationSelectInputField } from "./components/ExpirationSelectInputField";
import { CCVInputField } from "./components/CCVInputField";
import { CardInformation } from "../../types";
import { extractOnlyNumbers } from "../utils/utils";
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
