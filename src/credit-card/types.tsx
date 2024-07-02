export interface CardInformation {
  cardNum: string;
  cardName: string;
  expMonth: string;
  expYear: string;
  cardCcv: string;
}

export interface CreditCardBoxProps {
  cardNumArray: Array<number>;
  cardName: string;
  expMonth: string;
  expYear: string;
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
  expMonth: string;
  setExpMonth: React.Dispatch<React.SetStateAction<string>>;
  expYear: string;
  setExpYear: React.Dispatch<React.SetStateAction<string>>;
  isErrorWhenFormSubmit: boolean;
}

export interface YearSelectProps {
  expYear: string;
  setExpYear: (value: string) => void;
  errorExpYear: string | null;
  handleErrorCheckExpYear: () => void;
  currentYear: number;
}

export interface MonthSelectProps {
  expMonth: string;
  setExpMonth: (value: string) => void;
  errorExpMonth: string | null;
  handleErrorCheckExpMonth: () => void;
}
