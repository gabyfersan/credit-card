import {
  Typography,
  FormLabel,
  FormControl,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { checkForErrorInFormFields } from "../../utils/utils";
import { ExpirationSelectInputFieldProps } from "../types";
import {
  creditCardSchema,
  expSchema,
} from "../validation/creditCardValidation";
import { MonthSelect } from "./MonthSelect";
import { YearSelect } from "./YearSelect";

export const ExpirationSelectInputField: React.FC<
  ExpirationSelectInputFieldProps
> = ({
  expMonth,
  setExpMonth,
  expYear,
  setExpYear,
  isErrorWhenFormSubmit,
}) => {
  const ref = useRef(null);
  const [errorExpYear, setErrorExpYear] = useState<string | null>(
    null
  );
  const [errorExpMonth, setErrorExpMonth] = useState<string | null>(
    null
  );
  const currentYear = new Date().getFullYear();
  const [errorExp, setErrorExp] = useState<string | null>(null);

  const errorCheckExperationDate = () => {
    const result = expSchema.safeParse({
      expMonth,
      expYear,
    });
    if (result.success) {
      setErrorExp(null);
    } else {
      setErrorExp(result.error.errors[0].message);
    }
  };

  const handleErrorCheckExpYear = () => {
    checkForErrorInFormFields(
      {
        name: "expYear",
        value: expYear,
      },
      setErrorExpYear,
      creditCardSchema.pick({ expYear: true })
    );
    errorCheckExperationDate();
  };

  const handleErrorCheckExpMonth = () => {
    checkForErrorInFormFields(
      {
        name: "expMonth",
        value: expMonth,
      },
      setErrorExpMonth,
      creditCardSchema.pick({ expMonth: true })
    );
    errorCheckExperationDate();
  };

  useEffect(() => {
    (errorExpYear || isErrorWhenFormSubmit) &&
      handleErrorCheckExpYear();
    (errorExpMonth || isErrorWhenFormSubmit) &&
      handleErrorCheckExpMonth();
  }, [isErrorWhenFormSubmit, expMonth, expYear]);

  return (
    <FormControl fullWidth>
      <FormLabel sx={{ top: "-5px" }}>
        <Typography component="h2" variant="h6">
          Expiration Date
        </Typography>
      </FormLabel>

      <FormGroup row>
        <MonthSelect
          expMonth={expMonth}
          setExpMonth={setExpMonth}
          errorExpMonth={errorExpMonth}
          handleErrorCheckExpMonth={handleErrorCheckExpMonth}
          ref={ref}
        />

        <YearSelect
          expYear={expYear}
          setExpYear={setExpYear}
          errorExpYear={errorExpYear}
          handleErrorCheckExpYear={handleErrorCheckExpYear}
          currentYear={currentYear}
        />
      </FormGroup>
      <FormHelperText error={true}>
        {errorExp ? errorExp : " "}
      </FormHelperText>
    </FormControl>
  );
};
