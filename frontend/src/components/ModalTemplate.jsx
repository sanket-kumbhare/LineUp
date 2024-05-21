import React from "react";

const ModalTemplate = ({
  heading,
  formDescription,
  open,
  setOpen,
  children,
}) => {
  return (
    <>
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
                <b>{heading}</b>
              </Typography>
              <Typography level="body-sm" sx={{ fontWeight: "normal" }}>
                {formDescription}
              </Typography>
            </div>
          </DialogTitle>
          {children}
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ModalTemplate;
