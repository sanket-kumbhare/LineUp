import { Box, Button, Stack } from "@mui/joy";
import React from "react";
import TextareaField from "./TextareaField";
import InputField from "./InputField";

const TweetForm = ({ btnText, ...props }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setOpen(false);
      }}
    >
      <Stack spacing={2}>
        <TextareaField
          label={"Tweet"}
          minRows={4}
          placeholder={"Write something ..."}
        />
        <InputField label={"Datetime"} type="datetime-local" />
        <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
          <Button type={"submit"} fullWidth>
            {btnText}
          </Button>
          <Button type="button" color="neutral" fullWidth>
            Cancel
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default TweetForm;
