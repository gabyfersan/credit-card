import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { MonthSelectProps } from "../types";

interface refProp {
  focus: () => void;
}

export const MonthSelect = forwardRef<refProp, MonthSelectProps>(
  (
    {
      expMonth,
      setExpMonth,
      errorExpMonth,
      handleErrorCheckExpMonth,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle(
      ref,
      function () {
        return {
          focus() {
            inputRef.current?.focus();
          },
        };
      },
      []
    );
    return (
      <FormControl sx={{ width: "50%", paddingRight: "1rem" }}>
        <InputLabel id="card-expiration-month-label">
          Month
        </InputLabel>
        <Select
          ref={inputRef}
          labelId="card-expiration-month-label"
          id="month"
          value={expMonth}
          label="Month"
          onChange={(event) => {
            setExpMonth(event.target.value);
          }}
          name="expMonth"
          onBlur={handleErrorCheckExpMonth}
          error={!!errorExpMonth}
          type="text"
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
        <FormHelperText error={true}>
          {errorExpMonth ? errorExpMonth : " "}
        </FormHelperText>
      </FormControl>
    );
  }
);
