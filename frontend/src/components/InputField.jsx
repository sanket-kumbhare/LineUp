import { FormControl, FormLabel, Input } from "@mui/joy";

const InputField = ({ label, type = "text", ...props }) => {
  return (
    <>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input type={type} {...props} />
      </FormControl>
    </>
  );
};

export default InputField;
