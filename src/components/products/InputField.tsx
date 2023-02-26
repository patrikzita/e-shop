import React from "react";
import { FieldProps } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

const InputField: React.FC<FieldProps & TextFieldProps> = ({
  label,
  field,
  form,
}) => {
  const error = form.errors[field.name];
  const touched = form.touched[field.name];

  return (
    <TextField
      {...field}
      label={label}
      helperText={typeof error === "string" ? error : ""}
      error={touched && Boolean(error)}
    />
  );
};

export default InputField;

/* form obsahuje values, errors, touched, setFieldValue, setFieldTouched 
touched - pole zda bylo formulářové pole změněno uživatelem
errors- aktuální chyby
setFieldValue - funkce pro nastavení hodnoty formulářového pole
setFieldTouched - funkce pro označení formulářového pole jako změněného
*/
