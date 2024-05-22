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
import React, { useState } from "react";
import { TweetForm } from "../../components";

const Scheduler = () => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpen = (content) => {
    setModalContent(content);
    setOpen(true);
  };

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
          <tr>
            <td style={{ textAlign: "center" }}>1</td>
            <td>First Tweet with Scheduler</td>
            <td style={{ textAlign: "center" }}>29/03/2024 19:00</td>
            <td style={{ textAlign: "center" }}>
              <Chip variant="solid" color="warning">
                Pending
              </Chip>
            </td>
            <td>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <IconButton color="warning">
                  <EditIcon />
                </IconButton>
                <IconButton color="danger">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>2</td>
            <td>First Tweet with Scheduler</td>
            <td style={{ textAlign: "center" }}>29/03/2024 19:00</td>
            <td style={{ textAlign: "center" }}>
              <Chip color="success" variant="solid">
                Completed
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
          <TweetForm btnText={modalContent.btnText} />
        </ModalDialog>
      </Modal>
    </>
  );
};

export default Scheduler;
