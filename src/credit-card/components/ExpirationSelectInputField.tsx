import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";
import { creditCardSchema } from "../validation/creditCardValidation";
import { handleOnBlurForErrorHandling } from "../../utils/utils";

interface ExpirationSelectInputFieldProps {
  expMonth: string;
  setExpMonth: (value: string) => void;
  expYear: string;
  setExpYear: (value: string) => void;
  isErrorWhenFormSubmit: boolean;
}

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

  const handleOnBlurForYearAndMonth = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const name = event?.target?.name as string;
    handleOnBlurForErrorHandling(
      event.target,
      setError,
      name === "expMonth"
        ? creditCardSchema.pick({ expMonth: true })
        : creditCardSchema.pick({ expYear: true })
    );
  };

  useEffect(() => {
    if (isErrorWhenFormSubmit) {
      handleOnBlurForErrorHandling(
        {
          name: "expMonth",
          value: expMonth,
        },
        setErrorExpMonth,
        creditCardSchema.pick({ expMonth: true })
      );
      handleOnBlurForErrorHandling(
        {
          name: "expYear",
          value: expYear,
        },
        setErrorExpYear,
        creditCardSchema.pick({ expYear: true })
      );
    }
  }, [isErrorWhenFormSubmit]);

  return (
    <Box>
      <Typography component="h2">Experation date</Typography>
      <Grid container spacing={2} className="fieldset-expiration">
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="card-expiration-month-label">
              Month
            </InputLabel>
            <Select
              labelId="card-expiration-month-label"
              id="card-expiration-month"
              value={expMonth}
              label="Month"
              onChange={(event) => {
                setExpMonth(event.target.value);
              }}
              name="expMonth"
              onBlur={(event) =>
                handleOnBlurForYearAndMonth(event, setErrorExpMonth)
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem
                  key={i}
                  value={String(i + 1).padStart(2, "0")}
                >
                  {String(i + 1).padStart(2, "0")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormHelperText error={true}>
            {errorExpMonth ? errorExpMonth : " "}
          </FormHelperText>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="card-expiration-year-label">
              Year
            </InputLabel>
            <Select
              labelId="card-expiration-year-label"
              id="card-expiration-year"
              value={expYear}
              label="Year"
              onChange={(event) => setExpYear(event.target.value)}
              name="expYear"
              onBlur={(event) =>
                handleOnBlurForYearAndMonth(event, setErrorExpYear)
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Array.from({ length: 5 }, (_, i) => (
                <MenuItem
                  key={i}
                  value={String(currentYear + i).slice(2)}
                >
                  {String(currentYear + i)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormHelperText error={true}>
            {errorExpYear ? errorExpYear : " "}
          </FormHelperText>
        </Grid>
      </Grid>
    </Box>
  );
};
