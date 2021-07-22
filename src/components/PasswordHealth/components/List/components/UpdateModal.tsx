import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { IItem } from "~/services/getUserItems";

import updateItem from "../../../../../services/updateItem";

interface IUpdateModal {
  item: IItem;
}

const FormDialog = ({ item }: IUpdateModal) => {
  const [open, setOpen] = useState(false);
  const [newPass, setNewPass] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changePassword = async () => {
    await updateItem({
      ...item,
      password: newPass,
    });
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Update Password
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="New password"
            type="password"
            value={newPass}
            onChange={(event) => setNewPass(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={changePassword} color="primary">
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
