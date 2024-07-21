import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  checkAllFieldInForm,
  extractOnlyNumbers,
} from "../utils/utils";
import { CardNameInputField } from "./components/CardNameInputField";
import { CardNumberInputField } from "./components/CardNumberInputField";
import { CCVInputField } from "./components/CCVInputField";
import { ExpirationSelectInputField } from "./components/ExpirationSelectInputField";
import CreditCardBox from "./credit-card-box/CreditCardBox";
import "./style.css";
import { CardInformation, CreditCardProps } from "./types";
import { creditCardSchema } from "./validation/creditCardValidation";

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
  const [expirationMonth, setExpirationMonth] = useState<string>("");
  const [expirationYear, setExpirationYear] = useState<string>("");
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
      expirationMonth,
      expirationYear,
      cardCcv,
    };
    const result = checkAllFieldInForm(creditCardSchema, formValues);
    setIsErrorWhenFormSubmit(!result);
    result && setCardInformation(formValues);
  };
  return (
    <section className="checkout">
      <CreditCardBox
        cardNumArray={cardNumArray}
        cardName={cardName}
        expirationMonth={expirationMonth}
        expirationYear={expirationYear}
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
          expirationMonth={expirationMonth}
          setExpirationMonth={setExpirationMonth}
          expirationYear={expirationYear}
          setExpirationYear={setExpirationYear}
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
    </section>
  );
};

export default CreditCard;
