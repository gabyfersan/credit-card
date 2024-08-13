import React from "react";
import { CreditCardBoxProps } from "../types";
import "./style.css";
import VisaLogo from "./VisaLogo";
import MasterCardLogo from "./MasterCardLogo";
import { getCardType } from "../../utils/utils";

const cardsLogo: Record<string, JSX.Element> = {
  Visa: <VisaLogo />,
  MasterCard: <MasterCardLogo />,
};
const CreditCardBox: React.FC<CreditCardBoxProps> = ({
  cardNumArray,
  cardName,
  expirationMonth,
  expirationYear,
  cardCcv,
  cardFlipToBackside,
}) => {
  return (
    <aside
      className={`credit-card-box ${
        cardFlipToBackside ? "hover" : ""
      }`}
      aria-hidden="true"
    >
      <div className="flip" aria-hidden="true">
        <div className="front">
          <div className="chip"></div>
          <div className="logo">
            {cardsLogo[getCardType(cardNumArray.join(""))]}
          </div>
          <div className="number">
            {cardNumArray.map((number: number, i: number) => {
              let output;
              output = number === null ? "*" : number;
              if ((i + 1) % 4 === 0) {
                output += " ";
              }
              return output;
            })}
          </div>
          <div className="card-holder">
            <label>Card holder</label>
            <div>{cardName}</div>
          </div>
          <div className="card-expiration-date">
            <label>Expires</label>
            <div>
              {expirationMonth ? expirationMonth : "MM"}/
              {expirationYear ? expirationYear : "YY"}
            </div>
          </div>
        </div>
        <div className="back">
          <div className="strip"></div>
          <div className="logo">
            {cardsLogo[getCardType(cardNumArray.join(""))]}
          </div>
          <div className="ccv">
            <label>CCV</label>
            <div>{cardCcv}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CreditCardBox;
