import {
  Typography,
  FormLabel,
  FormControl,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { checkForErrorInFormFields } from "../../utils/utils";
import { ExpirationSelectInputFieldProps, refProp } from "../types";
import {
  creditCardSchema,
  expirationSchema,
} from "../validation/creditCardValidation";
import { MonthSelect } from "./MonthSelect";
import { YearSelect } from "./YearSelect";

export const ExpirationSelectInputField: React.FC<
  ExpirationSelectInputFieldProps
> = ({
  expirationMonth,
  setExpirationMonth,
  expirationYear,
  setExpirationYear,
  isErrorWhenFormSubmit,
}) => {
  const ref = useRef<refProp>(null);
  const [errorExpirationYear, setErrorExpirationYear] = useState<
    string | null
  >(null);
  const [errorExpirationMonth, setErrorExpirationMonth] = useState<
    string | null
  >(null);
  const currentYear = new Date().getFullYear();
  const [errorExpiration, setErrorExpiration] = useState<
    string | null
  >(null);

  const errorCheckExpirationDate = () => {
    const result = expirationSchema.safeParse({
      expirationMonth,
      expirationYear,
    });
    if (result.success) {
      setErrorExpiration(null);
    } else {
      setErrorExpiration(result.error.errors[0].message);
    }
  };

  const handleErrorCheckExpirationYear = () => {
    checkForErrorInFormFields(
      {
        name: "expirationYear",
        value: expirationYear,
      },
      setErrorExpirationYear,
      creditCardSchema.pick({ expirationYear: true })
    );
    errorCheckExpirationDate();
  };

  const handleErrorCheckExpirationMonth = () => {
    checkForErrorInFormFields(
      {
        name: "expirationMonth",
        value: expirationMonth,
      },
      setErrorExpirationMonth,
      creditCardSchema.pick({ expirationMonth: true })
    );
    errorCheckExpirationDate();
  };

  useEffect(() => {
    (errorExpirationYear || isErrorWhenFormSubmit) &&
      handleErrorCheckExpirationYear();
    (errorExpirationMonth || isErrorWhenFormSubmit) &&
      handleErrorCheckExpirationMonth();
  }, [isErrorWhenFormSubmit, expirationMonth, expirationYear]);

  return (
    <FormControl fullWidth>
      <FormLabel
        sx={{ top: "-5px" }}
        onClick={() => ref.current?.focus()}
      >
        <Typography component="h2" variant="h6">
          Expiration Date
        </Typography>
      </FormLabel>

      <FormGroup row>
        <MonthSelect
          expirationMonth={expirationMonth}
          setExpirationMonth={setExpirationMonth}
          errorExpirationMonth={errorExpirationMonth}
          handleErrorCheckExpirationMonth={
            handleErrorCheckExpirationMonth
          }
          ref={ref}
        />

        <YearSelect
          expirationYear={expirationYear}
          setExpirationYear={setExpirationYear}
          errorExpirationYear={errorExpirationYear}
          handleErrorCheckExpirationYear={
            handleErrorCheckExpirationYear
          }
          currentYear={currentYear}
        />
      </FormGroup>
      <FormHelperText
        error={true}
        style={{ position: "relative", top: "-1.4rem", height: "0" }}
      >
        {errorExpiration ? errorExpiration : " "}
      </FormHelperText>
    </FormControl>
  );
};
