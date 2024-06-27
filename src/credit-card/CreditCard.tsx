import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import CreditCardBox from './credit-card-box/CreditCardBox';
import CreditCardForm from './credit-card-form/CreditCardForm';
import { CardInformation } from '../../types';
import './style.css';

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
  const [cardNum, setCardNum] = useState(cardNumber);
  const [cardName, setCardName] = useState(cardHolder);
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCvv] = useState('');
  return (
    <div className="checkout">
      <CreditCardBox
        cardNum={cardNum}
        cardName={cardName}
        expMonth={expMonth}
        expYear={expYear}
        cvv={cvv}
      />
      <CreditCardForm
        setCardNum={setCardNum}
        setCardName={setCardName}
        setExpMonth={setExpMonth}
        setExpYear={setExpYear}
        setCvv={setCvv}
      />
    </div>
  );
};

export default CreditCard;
