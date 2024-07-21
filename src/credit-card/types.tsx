export interface CardInformation {
  cardNum: string;
  cardName: string;
  expirationMonth: string;
  expirationYear: string;
  cardCcv: string;
}

export interface CreditCardProps {
  setCardInformation: React.Dispatch<
    React.SetStateAction<CardInformation>
  >;
  cardHolder: string;
  cardNumber: string;
}

export interface CreditCardBoxProps {
  cardNumArray: Array<number>;
  cardName: string;
  expirationMonth: string;
  expirationYear: string;
  cardCcv: string;
  cardFlipToBackside: boolean;
}

export interface CardHolderInputFieldProps {
  cardName: string;
  setCardName: React.Dispatch<React.SetStateAction<string>>;
  isErrorWhenFormSubmit: boolean;
}

export interface CardNumberInputFieldProps {
  cardNumArray: number[];
  setCardNumArray: React.Dispatch<React.SetStateAction<number[]>>;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  isErrorWhenFormSubmit: boolean;
}

export interface CCVInputFieldProps {
  cardCcv: string;
  setCardCcv: React.Dispatch<React.SetStateAction<string>>;
  onFocus: () => void;
  onBlur: () => void;
  isErrorWhenFormSubmit: boolean;
}

export interface ExpirationSelectInputFieldProps {
  expirationMonth: string;
  setExpirationMonth: React.Dispatch<React.SetStateAction<string>>;
  expirationYear: string;
  setExpirationYear: React.Dispatch<React.SetStateAction<string>>;
  isErrorWhenFormSubmit: boolean;
}

export interface YearSelectProps {
  expirationYear: string;
  setExpirationYear: React.Dispatch<React.SetStateAction<string>>;
  errorExpirationYear: string | null;
  handleErrorCheckExpirationYear: () => void;
  currentYear: number;
}

export interface MonthSelectProps {
  expirationMonth: string;
  setExpirationMonth: React.Dispatch<React.SetStateAction<string>>;
  errorExpirationMonth: string | null;
  handleErrorCheckExpirationMonth: () => void;
}
