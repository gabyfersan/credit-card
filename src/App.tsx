import React, { useState, useEffect } from "react";
import CreditCard from "./credit-card/CreditCard";
import { CardInformation } from "./credit-card/types";

const App = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");
  // const [cardNumber, setCardNumber] = useState<string>(
  //   "5555500830030331"
  // );
  // const [cardHolder, setCardHolder] = useState<string>("Anders Karlsson");
  const [cardInformation, setCardInformation] =
    useState<CardInformation>({
      cardNum: "",
      cardName: "",
      expirationMonth: "",
      expirationYear: "",
      cardCcv: "",
    });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submitData = async (cardInformation: CardInformation) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/api/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardInformation),
        }
      );

      if (!response.ok) {
        throw new Error("Payment processing failed.");
      }

      const result = await response.json();
      setSuccess("Payment processed successfully.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cardInformation.cardNum !== "") {
      submitData(cardInformation);
    }
  }, [cardInformation]);

  return (
    <div className="App">
      <CreditCard
        setCardInformation={setCardInformation}
        cardNumber={cardNumber}
        cardHolder={cardHolder}
      />
      <div className="box">
        {loading ? <span>Loading</span> : ""}
        {success ? <span>Success</span> : ""}
        {error ? <span>Error</span> : ""}
      </div>
    </div>
  );
};

export default App;
