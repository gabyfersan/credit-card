import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { YearSelectProps } from "../types";

export const YearSelect: React.FC<YearSelectProps> = ({
  expirationYear,
  setExpirationYear,
  errorExpirationYear,
  handleErrorCheckExpirationYear,
  currentYear,
}) => {
  return (
    <FormControl sx={{ width: "50%" }}>
      <InputLabel id="card-expiration-year-label">Year</InputLabel>
      <Select
        labelId="card-expiration-year-label"
        value={expirationYear}
        label="Year"
        onChange={(event) => setExpirationYear(event.target.value)}
        name="expirationYear"
        onBlur={handleErrorCheckExpirationYear}
        error={!!errorExpirationYear}
        type="text"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Array.from({ length: 5 }, (_, i) => (
          <MenuItem key={i} value={String(currentYear + i).slice(2)}>
            {String(currentYear + i)}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={true}>
        {errorExpirationYear ? errorExpirationYear : " "}
      </FormHelperText>
    </FormControl>
  );
};
