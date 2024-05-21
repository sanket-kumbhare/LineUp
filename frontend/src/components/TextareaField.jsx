import { FormControl, FormLabel, Textarea } from "@mui/joy";
import React from "react";

const TextareaField = ({ label, rows, ...props }) => {
  return (
    <>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Textarea minRows={rows} {...props} />
      </FormControl>
    </>
  );
};

export default TextareaField;
