import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function UserDeleteDialog({ user = {}, setUsers }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://reqres.in/api/users/${user.id}`);
      handleClose();
      setUsers(prevState => {
        const newUserList = prevState.data.filter(e => e.id !== user.id);
        return { ...prevState, data: newUserList };
      });
    } catch (e) {}
  };

  const fullName = user.name
    ? user.name
    : `${user.first_name} ${user.last_name}`;

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>You want to remove the user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`to remove ${fullName} click the delete button`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
