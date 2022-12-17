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
import { Image } from 'react-bootstrap';

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
    <div
      className="text-center m-5-auto"
      style={{
        height: '100%',
        background: '#212529',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div class="typewriter">
        <h1>Quick as light.</h1>
      </div>
      {errDialog && (
        <SweetAlert danger title="Oopss!" onConfirm={() => setErrDialog(false)}>
          You might have mispelt. Try again
        </SweetAlert>
      )}
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          borderRadius: '20px',
          alignItems: 'center',
        }}
        onSubmit={(ev) => {
          ev.preventDefault();
          login();
        }}
      >
        <Image
          height={50}
          w={50}
          src="https://firebasestorage.googleapis.com/v0/b/water-track-337ea.appspot.com/o/speedkart%2Fspeedkart-logo.png?alt=media&token=81c4ca4e-3dff-46cb-8edd-d7a179ed0835"
        />
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
        <button id="sub_btn" type="submit" style={{ width: '100%' }}>
          Login
        </button>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
      </form>
      <footer></footer>
    </div>
  );
};
