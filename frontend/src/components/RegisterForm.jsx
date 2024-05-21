import { Button, Stack } from "@mui/joy";
import InputField from "./InputField";

const RegisterForm = () => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setOpen(false);
      }}
    >
      <Stack spacing={2}>
        <InputField
          label={"Full Name"}
          placeholder={"John Doe"}
          autoFocus={true}
        />
        <InputField label={"Username"} placeholder={"johndoe15"} />
        <InputField label={"Email"} placeholder={"john.doe@email.com"} />
        <InputField
          label={"Password"}
          placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
