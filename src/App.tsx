import { useState } from 'react';
import CreditCard from './credit-card/CreditCard';
import { CardInformation } from '../types';

const App = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardInformation, setCardInformation] = useState<CardInformation>({
    cardNum: '',
    cardName: '',
    expMonth: '',
    expYear: '',
    cvv: '',
  });

  return (
    <div className="App">
      <CreditCard setCardInformation={setCardInformation} />
    </div>
  );
};

export default App;
