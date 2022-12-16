import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Styles from './styles/RegisterPage.module.css';
import axiosWrapper from '../../apis/axiosCreate';

const countries = [
  {
    name: 'United States',
    code: 'US',
  },
  {
    name: 'Canada',
    code: 'CA',
  },
];

const noSpecialCharsRegExp = /^[^;:!@#$%^*+?\\/<>1234567890]+$/;
const phoneNoRegExp = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const postalCodeRegExp = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
const zipCodeRegExp = /^\d{5}(?:[-\s]\d{4})?$/;

const validationRules = {
  firstName: {
    regExp: noSpecialCharsRegExp,
    errMsg: 'Field should not contain special chars or number',
  },
  lastName: {
    regExp: noSpecialCharsRegExp,
    errMsg: 'Field should not contain special chars or number',
  },
  phoneNo: {
    regExp: phoneNoRegExp,
    errMsg: 'Not a valid Phone number',
  },
  doorStreet: '',
  provinceState: {
    regExp: noSpecialCharsRegExp,
    errMsg: 'Field should not contain special chars or number',
  },
  city: {
    regExp: noSpecialCharsRegExp,
    errMsg: 'Field should not contain special chars or number',
  },
  email: {
    regExp: emailRegExp,
    errMsg: 'Please enter valid Email address',
  },
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [formVals, setFormVals] = useState({
    firstName: { val: '', error: '' },
    lastName: { val: '', error: '' },
    phoneNo: { val: '', error: '' },
    doorStreet: { val: '', error: '' },
    provinceState: { val: '', error: '' },
    city: { val: '', error: '' },
    country: { val: 'CA', error: '' },
    zipPostal: { val: '', error: '' },
    email: { val: '', error: '' },
    pass: { val: '', error: '' },
    confirmPass: { val: '', error: '' },
  });

  const formInvalid = Object.values(formVals).some((val) => val.error || !val.val);

  const [addressVerified, setAddressVerified] = useState(false);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const body = {
      firstName: firstName.val,
      lastName: lastName.val,
      phoneNumber: phoneNo.val,
      doorStreet: doorStreet.val,
      state: provinceState.val,
      city: city.val,
      country: country.val,
      postalCode: zipPostal.val,
      email: email.val,
      password: pass.val,
    };
    await axiosWrapper
      .post(`/Customer/signup`, body)
      .then((res) => navigate('/login'))
      .catch((err) => console.error('Error in signup'));
  };

  const {
    firstName,
    lastName,
    phoneNo,
    doorStreet,
    provinceState,
    city,
    country,
    zipPostal,
    email,
    pass,
    confirmPass,
  } = formVals;

  const updateForm = (formProp, val) => {
    let error = '';
    if (formProp === 'zipPostal') {
      if (country.val === 'US' && val !== '' && !val.match(zipCodeRegExp)) {
        error = 'Please enter correct zip code';
      } else if (country.val === 'CA' && val !== '' && !val.match(postalCodeRegExp)) {
        error = 'Please enter correct postal code';
      }
    } else {
      if (val !== '' && validationRules[formProp] && !val.match(validationRules[formProp].regExp)) {
        error = validationRules[formProp].errMsg;
      }
    }
    setFormVals((prev) => ({ ...prev, [formProp]: { val, error } }));
  };

  const validateAddress = async () => {
    if (
      doorStreet.val &&
      !doorStreet.error &&
      provinceState.val &&
      !provinceState.error &&
      city.val &&
      !city.error &&
      country.val &&
      !country.error &&
      zipPostal.val &&
      !zipPostal.error
    ) {
      //   await fetch(

      //     {
      //       method: 'POST',
      //       body: JSON.stringify({
      //         address: {
      //           regionCode: country.val,
      //           locality: city.val,
      //           administrativeArea: provinceState.val,
      //           postalCode: zipPostal.val,
      //           addressLines: [doorStreet.val],
      //         },
      //       }),
      //     },
      //   )
      //     .then((resp) => resp.json())
      //     .then((resp) => {
      //       setAddressVerified(!resp.result.verdict.hasUnconfirmedComponents);
      //     });
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      <form onSubmit={onSubmit}>
        <div className={Styles.registrationForm}>
          <TextField
            className={Styles.regFormTextFields}
            required
            id="outlined-required"
            label="First Name"
            value={firstName.val}
            onChange={(ev) => updateForm('firstName', ev.target.value)}
            error={!!firstName.error}
            helperText={firstName.error}
          />
          <TextField
            className={Styles.regFormTextFields}
            required
            id="outlined-required"
            label="Last Name"
            value={lastName.val}
            onChange={(ev) => updateForm('lastName', ev.target.value)}
            error={!!lastName.error}
            helperText={lastName.error}
          />
          <TextField
            className={Styles.regFormTextFields}
            required
            id="outlined-required"
            label="Phone Number"
            value={phoneNo.val}
            onChange={(ev) => updateForm('phoneNo', ev.target.value)}
            error={!!phoneNo.error}
            helperText={phoneNo.error}
          />
          <TextField
            className={Styles.regFormTextFields}
            required
            id="outlined-required"
            label="Door No.& Street Name"
            value={doorStreet.val}
            onChange={(ev) => updateForm('doorStreet', ev.target.value)}
            onBlur={() => validateAddress()}
          />
          <TextField
            className={Styles.regFormTextFields}
            required
            id="outlined-required"
            label="Province"
            value={provinceState.val}
            onChange={(ev) => updateForm('provinceState', ev.target.value)}
            onBlur={() => validateAddress()}
            error={!!provinceState.error}
            helperText={provinceState.error}
          />
          <TextField
            className={Styles.regFormTextFields}
            required
            id="outlined-required"
            label="City"
            value={city.val}
            onChange={(ev) => updateForm('city', ev.target.value)}
            onBlur={() => validateAddress()}
            error={!!city.error}
            helperText={city.error}
          />
          <FormControl className={Styles.regFormTextFields}>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Country"
              value={country.val}
              onChange={(ev) => updateForm('country', ev.target.value)}
              onBlur={() => validateAddress()}
              error={!!country.error}
              helperText={country.error}
            >
              {countries.map((country) => (
                <MenuItem value={country.code}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className={Styles.regFormTextFields}
            required
            id="outlined-required"
            label="Zip / Postal Code"
            value={zipPostal.val}
            onChange={(ev) => updateForm('zipPostal', ev.target.value)}
            onBlur={() => validateAddress()}
            error={!!zipPostal.error}
            helperText={zipPostal.error}
          />
          <TextField
            className={Styles.regFormTextFields}
            required
            id="outlined-required"
            label="Email Address"
            value={email.val}
            onChange={(ev) => updateForm('email', ev.target.value)}
            error={!!email.error}
            helperText={email.error}
          />
          <TextField
            className={Styles.regFormTextFields}
            required
            id="outlined-required"
            label="Password"
            type="password"
            value={pass.val}
            onChange={(ev) => updateForm('pass', ev.target.value)}
          />
          <TextField
            className={Styles.regFormTextFields}
            required
            id="outlined-required"
            label="Confirm Password"
            type="password"
            value={confirmPass.val}
            onChange={(ev) => updateForm('confirmPass', ev.target.value)}
          />
          {addressVerified ? (
            <div
              className={Styles.regFormTextFields}
              style={{ background: addressVerified ? 'green' : '' }}
            >
              Verified
            </div>
          ) : (
            <></>
          )}
        </div>
        <button id="sub_btn" type="submit" disabled={formInvalid}>
          Register
        </button>
      </form>
      <footer>
        <p>
          Already a user? <Link to="/login">Login using your account.</Link>.
        </p>
      </footer>
    </div>
  );
};
