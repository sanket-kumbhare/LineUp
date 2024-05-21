import * as React from "react";
import { useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Button variant="soft">Change mode</Button>;
  }

  return (
    <Button
      variant="soft"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

export default function LoginFinal() {
  return (
    <main>
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          xs={12}
          md={6}
          sx={{
            background: "#814dde",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            sx={{
              m: "auto",
              py: 3,
              px: 2,
              gap: "3rem",
              background: "transparent",
              display: "flex",
              flexDirection: "column",
              border: "none",
            }}
            variant="outlined"
          >
            <div>
              <Typography
                level="h1"
                sx={{
                  fontStyle: "italic",
                  fontSize: "4rem",
                  mb: "1rem",
                  textAlign: "center",
                }}
              >
                <span style={{ color: "black" }}>Line</span>
                <span style={{ color: "white" }}>Up</span>
              </Typography>
              <Typography level="h4" sx={{ color: "white" }}>
                Schedule tweets | AI Powered | Maximum impact
              </Typography>
            </div>
            <Typography
              level="body-md"
              sx={{ color: "black", textAlign: "center", fontSize: "sm" }}
            >
              Made with &#10084; by Sanket Kumbhare
            </Typography>
          </Sheet>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Sheet
            sx={{
              width: 350,
              m: "auto",
              py: 3,
              px: 2,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              borderRadius: "sm",
              boxShadow: "md",
            }}
            variant="outlined"
          >
            <div>
              <Typography level="h4" component="h1">
                <b>Welcome!</b>
              </Typography>
              <Typography level="body-sm">Sign in to continue.</Typography>
            </div>
            <form>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input autoFocus placeholder="john.deo@email.com" />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
                    type="password"
                  />
                </FormControl>
                <Button color="primary">Log in</Button>
                <Typography
                  endDecorator={
                    <Typography
                      sx={{
                        color: "purple",
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
          </Sheet>
        </Grid>
      </Grid>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: 400,
          }}
        >
          <ModalClose />
          <DialogTitle>
            <div>
              <Typography level="h4" component="h1">
                <b>Sign Up!</b>
              </Typography>
              <Typography level="body-sm" sx={{ fontWeight: "normal" }}>
                Fill in the information to create account.
              </Typography>
            </div>
          </DialogTitle>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input autoFocus placeholder="John Doe" />
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder="johndeo15" />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input placeholder="john.deo@email.com" />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;" />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </main>
  );
}
