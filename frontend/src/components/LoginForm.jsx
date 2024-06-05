import { Button, Stack, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";
import InputField from "./InputField";

const LoginForm = ({ setOpen }) => {
  const { register, handleSubmit } = useForm();
  const login = async (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(login)}>
      <Stack spacing={2}>
        <InputField
          type={"text"}
          label={"Email"}
          placeholder={"john.deo@email.com"}
          autoFocus={true}
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Invalid Email Id",
            },
          })}
        />
        <InputField
          type={"password"}
          label={"Password"}
          placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
          {...register("password", {
            required: true,
          })}
        />
        <Button color="primary" type="submit">
          Log in
        </Button>
        <Typography
          endDecorator={
            <Typography
              sx={{
                color: "#814DDE",
                ":hover": {
                  textDecoration: "underline",
                },
                cursor: "pointer",
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              Sign up
            </Typography>
          }
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          Don&apos;t have an account?
        </Typography>
      </Stack>
    </form>
  );
};

export default LoginForm;
