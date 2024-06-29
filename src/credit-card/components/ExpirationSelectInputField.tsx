import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";

interface ExpirationSelectInputFieldProps {
  expMonth: string;
  setExpMonth: (value: string) => void;
  expYear: string;
  setExpYear: (value: string) => void;
}

export const ExpirationSelectInputField: React.FC<
  ExpirationSelectInputFieldProps
> = ({ expMonth, setExpMonth, expYear, setExpYear }) => (
  <Grid container spacing={2} className="fieldset-expiration">
    <Grid item xs={6}>
      <FormControl fullWidth>
        <InputLabel id="card-expiration-month-label">
          Month
        </InputLabel>
        <Select
          labelId="card-expiration-month-label"
          id="card-expiration-month"
          value={expMonth}
          label="Month"
          onChange={(event) => setExpMonth(event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i} value={String(i + 1).padStart(2, "0")}>
              {String(i + 1).padStart(2, "0")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <FormControl fullWidth>
        <InputLabel id="card-expiration-year-label">Year</InputLabel>
        <Select
          labelId="card-expiration-year-label"
          id="card-expiration-year"
          value={expYear}
          label="Year"
          onChange={(event) => setExpYear(event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem key={i} value={String(2024 + i).slice(2, 4)}>
              {2024 + i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);
