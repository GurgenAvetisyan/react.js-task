import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function UseEditDialog({ user = {}, setUsers }) {
  const [open, setOpen] = useState(false);
  const [userEdit, setUserEdit] = useState(() => {
    const { first_name, last_name, name } = user;
    const fullName = name ? name : `${first_name} ${last_name}`;
    return { name: fullName, job: 'does not work' };
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = e => {
    const { name, value } = e.target;
    setUserEdit(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleEdit = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${user.id}`, userEdit);
      setUsers(prevState => {
        const newUserList = prevState.data.map(e => {
          if (e.id === user.id) {
            e.job = userEdit.job;
            e.name = userEdit.name;
          }
          return e;
        });
        return { ...prevState, data: newUserList };
      });
      handleClose();
    } catch (e) {}
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Edit ${user.first_name} ${user.last_name} info`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Name'
            fullWidth
            variant='standard'
            name='name'
            onChange={handleOnChange}
            value={userEdit.name}
          />
          <TextField
            margin='dense'
            label='Job'
            fullWidth
            variant='standard'
            name='job'
            onChange={handleOnChange}
            value={userEdit.job}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
