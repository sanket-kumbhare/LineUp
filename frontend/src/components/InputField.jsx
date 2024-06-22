import { FormControl, FormLabel, Input } from "@mui/joy";
import { forwardRef } from "react";

const InputField = ({ label, type = "text", ...props }, ref) => {
  return (
    <>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input ref={ref} type={type} {...props} autoComplete="off" />
      </FormControl>
    </>
  );
};
export default forwardRef(InputField);
