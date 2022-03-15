import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { isEmail } from 'validator';
import axios from 'axios';

const Login = () => {
  const Navigate = useNavigate();
  const [error, setError] = useState('');
  const { handleSubmit, control } = useForm({
    mode: 'onBlur',
  });

  const hendlerLogin = async data => {
    try {
      const res = await axios.post('https://reqres.in/api/login', data);
      localStorage.setItem('Authorization', res.data.token);
      Navigate('/users');
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div
      style={{
        height: '200px',
        marginTop: '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <div>
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='Email'
              variant='filled'
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type='email'
            />
          )}
          rules={{
            required: 'Email required',
            validate: value => isEmail(value) || 'Incorrect Email',
          }}
        />
      </div>
      <div>
        <Controller
          name='password'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='Password'
              variant='filled'
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type='password'
            />
          )}
          rules={{
            required: 'Password required',
            validate: value => value.length > 6 || 'Minimum 6 characters',
          }}
        />
      </div>
      <div>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          onClick={handleSubmit(hendlerLogin)}
        >
          Login
        </Button>
      </div>
      {error ? <div>Incorrect Email or password</div> : null}
    </div>
  );
};

export default Login;
