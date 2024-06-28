import { useState } from "react";
import CreditCard from "./credit-card/CreditCard";
import { CardInformation } from "../types";

const App = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");
  // setCardNumber("1234567891234567");
  // setCardHolder("Gaby Fersan");
  const [cardInformation, setCardInformation] =
    useState<CardInformation>({
      cardNum: "",
      cardName: "",
      expMonth: "",
      expYear: "",
      cvv: "",
    });

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
