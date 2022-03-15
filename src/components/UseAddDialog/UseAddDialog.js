import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';

const initialValue = { name: '', job: '' };

export default function UseAddDialog({ setUsers }) {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState(initialValue);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewUser(initialValue);
  };

  const handleOnChange = e => {
    const { name, value } = e.target;
    setNewUser(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleDelete = async () => {
    try {
      await axios.post(`https://reqres.in/api/users`, newUser);
      setUsers(prevState => {
        const newUserList = [
          {
            id: Date.now(),
            email: 'Artak.Davtyan@reqres.in',
            avatar:
              'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E',
            ...newUser,
          },
          ...prevState.data,
        ];
        return { ...prevState, data: newUserList };
      });
      handleClose();
    } catch (e) {}
  };

  return (
    <div>
      <Tooltip title='Add'>
        <IconButton aria-label='add' onClick={handleClickOpen}>
          <AddIcon fontSize='large' />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new user</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Name'
            fullWidth
            variant='standard'
            name='name'
            onChange={handleOnChange}
            value={newUser.name}
          />
          <TextField
            margin='dense'
            label='Job'
            fullWidth
            variant='standard'
            name='job'
            onChange={handleOnChange}
            value={newUser.job}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
