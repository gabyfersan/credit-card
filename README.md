## Credit Card Component

This component is only usable on Visa and Mastercard
| Mastercard test card number| 5555500830030331 |
| --- | --- |
| Visa test card number | 4111111111111111 |

To install dependencies:

```bash
npm i
```

To run:

Credit card

```bash
npm run dev
```

Use the url

http://127.0.0.1:5173/

Test

```bash
npm run test
```

Uncomment

```bash
runSpeedTest();
```

in index.ts at and see result in teminal

How to use the CreditCard component in a react application.

```bash
import CreditCard from "./credit-card/CreditCard";

const [cardNumber, setCardNumber] = useState<string>("");
const [cardHolder, setCardHolder] = useState<string>("");
const [cardInformation, setCardInformation] =
useState({
cardNum: "",
cardName: "",
expirationMonth: "",
expirationYear: "",
cardCcv: "",
});


<CreditCard
    setCardInformation={setCardInformation}
    cardNumber={cardNumber}
    cardHolder={cardHolder}
/>
```
