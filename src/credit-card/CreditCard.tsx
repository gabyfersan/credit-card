import React, { useState, useRef, useEffect } from "react";
import CreditCardBox from "./credit-card-box/CreditCardBox";
import { CardNumberInputField } from "./components/CardNumberInputField";
import { CardNameInputField } from "./components/CardNameInputField";
import { ExpirationSelectInputField } from "./components/ExpirationSelectInputField";
import { CCVInputField } from "./components/CCVInputField";
import { CardInformation } from "../../types";
import { Button } from "@mui/material";
import { creditCardSchema } from "./validation/creditCardValidation";
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

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        />
        <CardNameInputField
          cardName={cardName}
          setCardName={setCardName}
        />
        <ExpirationSelectInputField
          expMonth={expMonth}
          setExpMonth={setExpMonth}
          expYear={expYear}
          setExpYear={setExpYear}
        />
        <CCVInputField
          cardCcv={cardCcv}
          setCardCcv={setCardCcv}
          onFocus={() => setCardFlipToBackside(true)}
          onBlur={() => setCardFlipToBackside(false)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreditCard;
