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
  expYear,
  setExpYear,
  errorExpYear,
  handleErrorCheckExpYear,
  currentYear,
}) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="card-expiration-year-label">Year</InputLabel>
      <Select
        labelId="card-expiration-year-label"
        id="card-expiration-year"
        value={expYear}
        label="Year"
        onChange={(event) => setExpYear(event.target.value)}
        name="expYear"
        onBlur={handleErrorCheckExpYear}
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
        {errorExpYear ? errorExpYear : " "}
      </FormHelperText>
    </FormControl>
  );
};
