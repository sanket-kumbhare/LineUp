import { FormControl, FormLabel, Textarea } from "@mui/joy";
import { forwardRef } from "react";

const TextareaField = ({ label, rows, ...props }, ref) => {
  return (
    <>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Textarea minRows={rows} ref={ref} {...props} />
      </FormControl>
    </>
  );
};

export default forwardRef(TextareaField);
