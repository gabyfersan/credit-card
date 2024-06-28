import React, { useState, useRef, useEffect } from "react";
import { extractOnlyNumbers } from "../../utils/utils";
import { CardNumberInputField } from "./CardNumberInputField";
import { CardHolderInputField } from "./CardHolderInputField";
import { ExpirationSelectInputField } from "./ExpirationSelectInputField";
import { CCVInputField } from "./CCVInputField";
import "./style.css";

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
    setCardNum(extractOnlyNumbers(cardNumArray, 0, 16).join(""));
    setCardName(cardHolder);
    setExpMonth(expMonth);
    setExpYear(expYear);
    setCvv(cardCcv);
  }, [cardNumArray, cardCcv, expYear, expMonth, cardHolder]);

  return (
    <form className="form" autoComplete="off" noValidate>
      <CardNumberInputField
        cardNumArray={cardNumArray}
        setCardNumArray={setCardNumArray}
        inputRefs={inputRefs}
      />
      <CardHolderInputField
        cardHolder={cardHolder}
        setCardHolder={setCardHolder}
      />
      <ExpirationSelectInputField
        expMonth={expMonth}
        setExpMonthState={setExpMonthState}
        expYear={expYear}
        setExpYearState={setExpYearState}
      />
      <CCVInputField cardCcv={cardCcv} setCardCcv={setCardCcv} />
      <button className="btn">
        <i className="fa fa-lock"></i> submit
      </button>
    </form>
  );
};

export default CreditCardForm;
