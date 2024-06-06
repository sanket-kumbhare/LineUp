import { Button, Snackbar, Stack, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { useState } from "react";
import { Error as ErrorIcon } from "@mui/icons-material";
import Toast from "./Toast";

const LoginForm = ({ setOpen }) => {
  const { register, handleSubmit } = useForm();
  const [toast, setToast] = useState(false);
  const login = async (data) => {
    setToast(true);
    console.log(data);
  };
  return (
    <>
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
      <Toast
        msg={"Invalid Login Credentials"}
        toast={toast}
        setToast={setToast}
        color={"danger"}
        icon={<ErrorIcon />}
      />
    </>
  );
};

export default LoginForm;
