import {
  Grid,
  Typography,
  FormLabel,
  FormControl,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { checkForErrorInFormFields } from "../../utils/utils";
import { ExpirationSelectInputFieldProps } from "../types";
import { creditCardSchema } from "../validation/creditCardValidation";
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
  const [errorExpYear, setErrorExpYear] = useState<string | null>(
    null
  );
  const [errorExpMonth, setErrorExpMonth] = useState<string | null>(
    null
  );
  const currentYear = new Date().getFullYear();

  const handleErrorCheckExpYear = () => {
    checkForErrorInFormFields(
      {
        name: "expYear",
        value: expYear,
      },
      setErrorExpYear,
      creditCardSchema.pick({ expYear: true })
    );
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
  };

  useEffect(() => {
    (errorExpYear || isErrorWhenFormSubmit) &&
      handleErrorCheckExpYear();
    (errorExpMonth || isErrorWhenFormSubmit) &&
      handleErrorCheckExpMonth();
  }, [isErrorWhenFormSubmit, expMonth, expYear]);

  return (
    <FormControl fullWidth>
      <FormLabel id="month-select" sx={{ top: "10px" }}>
        <Typography component="h2" variant="h6">
          Expiration Date
        </Typography>
      </FormLabel>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MonthSelect
            expMonth={expMonth}
            setExpMonth={setExpMonth}
            errorExpMonth={errorExpMonth}
            handleErrorCheckExpMonth={handleErrorCheckExpMonth}
          />
        </Grid>
        <Grid item xs={6}>
          <YearSelect
            expYear={expYear}
            setExpYear={setExpYear}
            errorExpYear={errorExpYear}
            handleErrorCheckExpYear={handleErrorCheckExpYear}
            currentYear={currentYear}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};
