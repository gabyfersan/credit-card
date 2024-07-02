import React, { useState, useRef, useEffect } from "react";
import CreditCardBox from "./credit-card-box/CreditCardBox";
import { CardNumberInputField } from "./components/CardNumberInputField";
import { CardNameInputField } from "./components/CardNameInputField";
import { ExpirationSelectInputField } from "./components/ExpirationSelectInputField";
import { CCVInputField } from "./components/CCVInputField";
import { CardInformation, CreditCardProps } from "./types";
import { Button } from "@mui/material";
import { creditCardSchema } from "./validation/creditCardValidation";
import "./style.css";
import {
  checkAllFieldInForm,
  extractOnlyNumbers,
} from "../utils/utils";

const CreditCard: React.FC<CreditCardProps> = ({
  setCardInformation,
  cardNumber,
  cardHolder,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [cardNumArray, setCardNumArray] = useState<number[]>(
    cardNumber
      ? cardNumber.split("").map(Number)
      : new Array(16).fill(null)
  );
  const [expMonth, setExpMonth] = useState<string>("");
  const [expYear, setExpYear] = useState<string>("");
  const [cardCcv, setCardCcv] = useState<string>("");
  const [cardName, setCardName] = useState<string>(cardHolder);
  const [cardFlipToBackside, setCardFlipToBackside] =
    useState<boolean>(false);
  const [isErrorWhenFormSubmit, setIsErrorWhenFormSubmit] =
    useState<boolean>(false);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    setIsErrorWhenFormSubmit(false);
  });

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues: CardInformation = {
      cardNum: extractOnlyNumbers(cardNumArray, 0, 16).join(""),
      cardName,
      expMonth,
      expYear,
      cardCcv,
    };
    const result = checkAllFieldInForm(creditCardSchema, formValues);
    setIsErrorWhenFormSubmit(!result);
    result && setCardInformation(formValues);
  };
  return (
    <div className="checkout">
      <CreditCardBox
        cardNumArray={cardNumArray}
        cardName={cardName}
        expMonth={expMonth}
        expYear={expYear}
        cardCcv={cardCcv}
        cardFlipToBackside={cardFlipToBackside}
      />

      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <CardNumberInputField
          cardNumArray={cardNumArray}
          setCardNumArray={setCardNumArray}
          inputRefs={inputRefs}
          isErrorWhenFormSubmit={isErrorWhenFormSubmit}
        />
        <CardNameInputField
          cardName={cardName}
          setCardName={setCardName}
          isErrorWhenFormSubmit={isErrorWhenFormSubmit}
        />
        <ExpirationSelectInputField
          expMonth={expMonth}
          setExpMonth={setExpMonth}
          expYear={expYear}
          setExpYear={setExpYear}
          isErrorWhenFormSubmit={isErrorWhenFormSubmit}
        />
        <CCVInputField
          cardCcv={cardCcv}
          setCardCcv={setCardCcv}
          onFocus={() => setCardFlipToBackside(true)}
          onBlur={() => setCardFlipToBackside(false)}
          isErrorWhenFormSubmit={isErrorWhenFormSubmit}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreditCard;
