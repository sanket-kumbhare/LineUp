import { Button, Stack, Typography } from "@mui/joy";
import InputField from "./InputField";

const LoginForm = ({ setOpen }) => {
  return (
    <form>
      <Stack spacing={2}>
        <InputField
          type={"text"}
          label={"Email"}
          placeholder={"john.deo@email.com"}
          autoFocus={true}
        />
        <InputField
          type={"password"}
          label={"Password"}
          placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
        />
        <Button color="primary">Log in</Button>
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
