import * as React from "react";
import TextField from "@material-ui/core/TextField";

export const MyTextField = ({ type, field, form }) => {
  const { errors, touched } = form;
  return (
    <TextField
      style={{ width: 356 }}
      label={field.name ? field.name.toUpperCase() : ""}
      placeholder={field.name ? field.name.toUpperCase() : ""}
      type={type}
      {...field}
      error={touched[field.name] && !!errors[field.name]}
      helperText={
        !!errors[field.name] && touched[field.name] && errors[field.name]
      }
    />
  );
};
