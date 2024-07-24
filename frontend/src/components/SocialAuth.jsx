import { Button, Sheet, Typography, Grid } from "@mui/joy";
import { X as XIcon } from "@mui/icons-material";

const SocialAuth = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Sheet
        sx={{
          borderRadius: "sm",
          py: 3,
          px: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        variant="outlined"
      >
        <Typography level="h3" component="h2" color="primary">
          <b>Supercharge Your Tweets with LineUp!</b>
        </Typography>
        <Typography level="body-sm" component={"p"}>
          Get started with LineReady to take your tweeting game to the next
          level? With LineUp, scheduling your tweets has never been easier. But
          first, let's get you connected.Up by connecting with your social
          accounts.
        </Typography>
        <div>
          <Typography level="h5" component={"h3"}>
            Let's Get Started:
          </Typography>
          <Typography level="body-sm" component={"ol"}>
            <p>1. Hit that Connect X button below.</p>
            <p>
              2. Follow the simple steps to authorize LineUp with your social
              media account.
            </p>
            <p>
              3. Once connected, queue tweets and engage your audience
              effortlessly.
            </p>
          </Typography>
        </div>
        <Typography level="body-sm" component={"p"}>
          <b>Note:</b> Your privacy and security are our top priorities. Your
          account tokens are securely stored and encrypted.
        </Typography>
        <div
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Button color="primary" endDecorator={<XIcon />}>
            Connect
          </Button>
        </div>
      </Sheet>
    </Grid>
  );
};

export default SocialAuth;
