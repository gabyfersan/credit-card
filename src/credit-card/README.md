## Part 2: Credit Card Component

This part will test your React/Web skills and your ability to use domain specific logic to create a good user experience.

The assignment is to create a credit card form component that can be dropped in to any React application and be used to process payments.

You can assume that the payment endpoint expects a `POST` request at `/api/payments` and that the credit card information will be received without any sort of encryption or obfuscation.

Make sure you:

- 🧪 Include tests!
- 🤔 Consider what can be validated/detected without making a request to the payment server.
- 💥 Focus on the user experience from a functionality point of view.

## Credit Card Component

To install dependencies:

```bash
npm i
```

To run:
Credit card

```bash
npm run dev
```

Test

```bash
npm run test
```

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
