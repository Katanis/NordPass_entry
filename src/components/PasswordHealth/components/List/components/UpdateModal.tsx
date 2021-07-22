import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { IItem } from "~/services/getUserItems";

import updateItem from "../../../../../services/updateItem";

interface IUpdateModal {
  item: IItem;
}

const schema = yup.object().shape({
  password: yup.string().required(),
});

type PasswordType = {
  password: string;
};

const UpdateModal = ({ item }: IUpdateModal) => {
  const [open, setOpen] = useState(false);

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changePassword = async (data: PasswordType) => {
    await updateItem({
      ...item,
      password: data.password,
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
        <form onSubmit={handleSubmit(changePassword)}>
          <DialogContent>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="New password"
                  type="password"
                  error={!!error}
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
              rules={{ required: "Password required" }}
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Change
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default UpdateModal;
