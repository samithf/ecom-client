import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useEffect, useState } from "react";

export function RadioButtons({
  label,
  name,
  selectedValue,
  onChange,
  options,
  direction = "row",
  helperText,
  hasError,
}) {
  const [value, setValue] = useState(selectedValue);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const onChangeRadio = (event) => {
    setValue(event.target.value);
    onChange(event);
  };

  return (
    <FormControl error={hasError}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChangeRadio} row={direction === "row"}>
        {options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
        ))}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
