import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { checkForErrorInFormFields } from "../../utils/utils";
import { ExpirationSelectInputFieldProps } from "../types";
import { creditCardSchema } from "../validation/creditCardValidation";
import { MonthSelect } from "./MonthSelect"; // Adjust the import path as necessary
import { YearSelect } from "./YearSelect"; // Adjust the import path as necessary

export const ExpirationSelectInputField: React.FC<
  ExpirationSelectInputFieldProps
> = ({ expMonth, setExpMonth, expYear, setExpYear, isErrorWhenFormSubmit }) => {
  const [errorExpYear, setErrorExpYear] = useState<string | null>(null);
  const [errorExpMonth, setErrorExpMonth] = useState<string | null>(null);
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
    (errorExpYear || isErrorWhenFormSubmit) && handleErrorCheckExpYear();
    (errorExpMonth || isErrorWhenFormSubmit) && handleErrorCheckExpMonth();
  }, [isErrorWhenFormSubmit, expMonth, expYear]);

  return (
    <Box>
      <Typography component='h2' for='month'>
        Expiration Date
      </Typography>
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
    </Box>
  );
};
