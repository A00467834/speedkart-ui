import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import SweetAlert from 'react-bootstrap-sweetalert';
import axiosWrapper from '../../apis/axiosCreate';
import { setUser } from '../../store/reducers/authSlice';
import '../../App.css';
import { emailRegExp } from './RegisterPage';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formVals, setFormVals] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [errDialog, setErrDialog] = useState(false);

  const login = async () => {
    await axiosWrapper
      .post('/Customer/login', formVals)
      .then((resp) => {
        dispatch(setUser(resp.data));
        window.localStorage.setItem('sessionId', resp.data.sessionId);
        navigate('/');
      })
      .catch((err) => setErrDialog(true));
  };

  return (
    <div className="text-center m-5-auto">
      {errDialog && (
        <SweetAlert danger title="Oopss!" onConfirm={() => setErrDialog(false)}>
          You might have mispelt. Try again
        </SweetAlert>
      )}
      <h2>Sign in to us</h2>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        onSubmit={(ev) => {
          ev.preventDefault();
          login();
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Email"
          value={formVals.email}
          onBlur={(ev) => {
            if (ev.target.value && !ev.target.value.match(emailRegExp)) {
              setEmailError('Enter valid email');
            } else {
              setEmailError(null);
            }
          }}
          onChange={(ev) => setFormVals((val) => ({ ...val, email: ev.target.value }))}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          type="password"
          value={formVals.pass}
          onChange={(ev) => setFormVals((val) => ({ ...val, password: ev.target.value }))}
        />
        <p>
          <button id="sub_btn" type="submit">
            Login
          </button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
      </footer>
    </div>
  );
};
