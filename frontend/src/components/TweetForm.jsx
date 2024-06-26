import { Box, Button, Stack } from "@mui/joy";
import { TextareaField, InputField } from "../components";
import { useForm } from "react-hook-form";
import postTweet from "../api/post";
import { useSelector } from "react-redux";

const TweetForm = ({ btnText, ...props }) => {
  const { register, handleSubmit } = useForm();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const submit = async (data) => {
    try {
      data.socialMedia = "twitter";
      const response = await postTweet.addPost(accessToken, data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack spacing={2}>
        <TextareaField
          label={"Tweet"}
          minRows={4}
          placeholder={"Write something ..."}
          {...register("content", {
            required: true,
            maxLength: 280,
            minLength: 1,
          })}
        />
        <InputField
          label={"Datetime"}
          type="datetime-local"
          {...register("dateTime", { required: true })}
        />
        <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
          <Button type="submit" fullWidth>
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
