import { Button, Stack } from "@mui/joy";
import { useForm } from "react-hook-form";
import { Toast, InputField } from "../components";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import { useState } from "react";
import auth from "../api/auth";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const [toast, setToast] = useState(false);
  const signup = async (data) => {
    try {
      const userAccount = await auth.registerAccount(data);
      if (userAccount) {
        // TODO: show toast or login user
        console.log(userAccount);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(signup)}>
        <Stack spacing={2}>
          <InputField
            label={"Full Name"}
            placeholder={"John Doe"}
            autoFocus={true}
            {...register("fullName", {
              required: true,
              // validate: {
              //   matchPatern: (value) =>
              //     /^[A-Za-z]$/.test(value) || "Full Name not valid",
              // },
            })}
          />
          <InputField
            label={"Username"}
            placeholder={"john.doe"}
            {...register("userName", {
              required: true,
              //   validate: {
              //     matchPatern: (value) =>
              //       /^[a-z0-9._]\\w{5, 20}$/.test(value) || "Username not valid",
              //   },
            })}
          />
          <InputField
            label={"Email"}
            placeholder={"john.doe@email.com"}
            {...register("email", {
              required: true,
              // validate: {
              //   matchPatern: (value) =>
              //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
              //       value
              //     ) || "Email not valid",
              // },
            })}
          />
          <InputField
            label={"Password"}
            type={"passowrd"}
            placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
            {...register("password", {
              required: true,
              // validate: {
              //   matchPatern: (value) =>
              //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
              //       value
              //     ) || "Password not valid",
              // },
            })}
          />
          <Button type="submit">Sign Up</Button>
        </Stack>
      </form>
      <Toast
        msg={"Registered Sucessfully"}
        toast={toast}
        setToast={setToast}
        color={"success"}
        icon={<CheckCircleIcon />}
      />
    </>
  );
};

export default RegisterForm;
