import { useState, useEffect } from "react";
import CreditCard from "./credit-card/CreditCard";
import { CardInformation } from "../types";

const App = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");
  // const [cardNumber, setCardNumber] = useState<string>(
  //   "1234567891234567"
  // );
  // const [cardHolder, setCardHolder] = useState<string>("Gaby Fersan");
  const [cardInformation, setCardInformation] =
    useState<CardInformation>({
      cardNum: "",
      cardName: "",
      expMonth: "",
      expYear: "",
      cardCcv: "",
    });

  useEffect(() => {
    console.log(cardInformation);
  }, [cardInformation]);

  return (
    <div className="App">
      <CreditCard
        setCardInformation={setCardInformation}
        cardNumber={cardNumber}
        cardHolder={cardHolder}
      />
    </div>
  );
};

export default App;
