import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  DialogTitle,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Table,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { TweetForm } from "../../components";
import tweets from "../../api/post";
import { capitalize } from "lodash";

const Scheduler = () => {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [modalContent, setModalContent] = useState("");

  const handleOpen = (content) => {
    setModalContent(content);
    setOpen(true);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await tweets.getPosts();
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [setPosts]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Scheduler
        </Typography>
        <Button
          onClick={() => handleOpen({ heading: "New Tweet", btnText: "Tweet" })}
        >
          New Tweet
        </Button>
      </Box>
      <Table stickyHeader>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }} width={"5%"}>
              #
            </th>
            <th width={"50%"}>Tweets</th>
            <th style={{ textAlign: "center" }} width={"15%"}>
              DateTime
            </th>
            <th style={{ textAlign: "center" }} width={"15%"}>
              Status
            </th>
            <th width={"15%"}></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={index || post._id}>
              <td style={{ textAlign: "center" }}>1</td>
              <td>{post.content}</td>
              <td style={{ textAlign: "center" }}>{post.dateTime}</td>
              <td style={{ textAlign: "center" }}>
                <Chip
                  variant="solid"
                  color={post.status == "pending" ? "warning" : "success"}
                >
                  {capitalize(post.status)}
                </Chip>
              </td>
              <td>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <IconButton
                    color="warning"
                    onClick={() =>
                      handleOpen({ heading: "Edit Tweet", btnText: "Edit" })
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="danger">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
                <b>{modalContent.heading}</b>
              </Typography>
              <Typography level="body-sm" sx={{ fontWeight: "normal" }}>
                {/* Fill in the information to create account. */}
              </Typography>
            </div>
          </DialogTitle>
          <TweetForm
            btnText={modalContent.btnText}
            setOpen={setOpen}
            setPosts={setPosts}
          />
        </ModalDialog>
      </Modal>
    </>
  );
};

export default Scheduler;
