import {
  DialogTitle,
  Grid,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { LoginForm, Logo, RegisterForm } from "../../components";

const LoginPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
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
              <Logo
                level={"h1"}
                styles={{ mb: "1rem", fontSize: "4rem" }}
                variant="white"
              />
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
            <LoginForm setOpen={setOpen} />
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
          <RegisterForm />
        </ModalDialog>
      </Modal>
    </>
  );
};

export default LoginPage;
