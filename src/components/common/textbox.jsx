import TextField from "@mui/material/TextField";

export function Textbox({ id, name, label, value, hasError, helperText, onChange, type = "text" }) {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      error={hasError}
      helperText={helperText}
      onChange={onChange}
      name={name}
      type={type}
      InputLabelProps={{ shrink: true }}
    />
  );
}
