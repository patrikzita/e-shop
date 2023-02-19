import React from "react";
import { FieldProps } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

const FieldCustom: React.FC<FieldProps & TextFieldProps> = ({
  label,
  field,
}) => {
  return <TextField {...field} label={label} />;
};

export default FieldCustom;
