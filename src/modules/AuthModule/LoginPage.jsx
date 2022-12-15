import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosWrapper from '../../apis/axiosCreate';
import { setUser } from '../../store/reducers/authSlice';
import '../../App.css'

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formVals, setFormVals] = useState({
    email: '',
    password: '',
  });

  const login = async () => {
    await axiosWrapper.post('/Customer/login', formVals).then((resp) => {
      dispatch(setUser(resp.data));
      window.localStorage.setItem('sessionId', resp.data.sessionId);
      navigate('/');
    });
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Sign in to us</h2>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          login();
        }}
      >
        <p>
          <label>Email Address</label>
          <br />
          <input
            type="text"
            name="email"
            value={formVals.email}
            onChange={(ev) => setFormVals((val) => ({ ...val, email: ev.target.value }))}
            required
          />
        </p>
        <p>
          <label>Password</label>
          {/* <Link to="/forget-password"><label className="right-label">Forget password?</label></Link> */}
          <br />
          <input
            type="password"
            name="password"
            value={formVals.pass}
            onChange={(ev) => setFormVals((val) => ({ ...val, password: ev.target.value }))}
            required
          />
        </p>
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