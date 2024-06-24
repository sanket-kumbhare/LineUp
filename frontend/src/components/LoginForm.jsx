import { Button, Stack, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";
import { InputField } from "../components";
import { useState } from "react";
import { Error as ErrorIcon } from "@mui/icons-material";
import { Toast } from "../components";
import auth from "../api/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../features/auth/authSlice";

const LoginForm = ({ setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [toast, setToast] = useState(false);
  const login = async (data) => {
    try {
      const userData = await auth.loginAccount(data);
      if (userData) {
        dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(login)}>
        <Stack spacing={2}>
          <InputField
            label={"Username"}
            placeholder={"john.deo"}
            autoFocus={true}
            {...register("userName", {
              required: true,
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
