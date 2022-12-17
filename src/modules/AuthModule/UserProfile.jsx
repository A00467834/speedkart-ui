import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Styles from '../AuthModule/styles/RegisterPage.module.css';
import axiosWrapper from '../../apis/axiosCreate';
import { useSelector,useDispatch } from 'react-redux';
import { getUserId, getUser, setUser } from '../../store/reducers/authSlice';

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

export const UserProfile = () => {
  const navigate = useNavigate();
  const customerId = useSelector(getUserId);
  
  const dispatch = useDispatch();

  const userProfileData = useSelector(getUser);
  const [formVals, setFormVals] = useState({
    firstName: { val: userProfileData.firstName, error: '' },
    lastName: { val: userProfileData.lastName, error: '' },
    phoneNo: { val: userProfileData.phoneNo, error: '' },
    doorStreet: { val: userProfileData.doorStreet, error: '' },
    provinceState: { val: userProfileData.provinceState, error: '' },
    city: { val: userProfileData.city, error: '' },
    country: { val: userProfileData.country, error: '' },
    zipPostal: { val: userProfileData.zipPostal, error: '' },
    email: { val: userProfileData.email, error: '' }
  });

  const formInvalid = Object.values(formVals).some((val) => val.error || !val.val);

  const [addressVerified, setAddressVerified] = useState(null);

  useEffect(() => {
    setFormVals({
      firstName: { val: userProfileData.firstName, error: '' },
      lastName: { val: userProfileData.lastName, error: '' },
      phoneNo: { val: userProfileData.phoneNumber, error: '' },
      doorStreet: { val: userProfileData.doorStreet, error: '' },
      provinceState: { val: userProfileData.state, error: '' },
      city: { val: userProfileData.city, error: '' },
      country: { val: userProfileData.country, error: '' },
      zipPostal: { val: userProfileData.postalCode, error: '' },
      email: { val: userProfileData.email, error: '' }
    })
    console.log(userProfileData)
  }, [userProfileData])

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const body = {
      customerId: customerId,
      firstName: firstName.val,
      lastName: lastName.val,
      phoneNumber: phoneNo.val,
      doorStreet: doorStreet.val,
      state: provinceState.val,
      city: city.val,
      country: country.val,
      postalCode: zipPostal.val,
      email: email.val,
    };
    await axiosWrapper
      .put(`/Customer/customerDetails/update`, body)
      .then((res) => {
        dispatch(setUser(res.data))
        navigate('/')})
      .catch((err) => console.error('Error could not update profile'));
    navigate("/")
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
    email
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
        await fetch(
          'https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyDeOekGPW4_3v_W8H9IwjDAtnravRBEPRs',
          {
            method: 'POST',
            body: JSON.stringify({
              address: {
                regionCode: country.val,
                locality: city.val,
                administrativeArea: provinceState.val,
                postalCode: zipPostal.val,
                addressLines: [doorStreet.val],
              },
            }),
          },
        )
          .then((resp) => resp.json())
          .then((resp) => {
            setAddressVerified(!resp.result.verdict.hasUnconfirmedComponents);
          });
    }
  };

  return (
    
    <div className="text-center m-5-auto">
      <h2>Hi {userProfileData.firstName}</h2>
      <h5>You can make changes to your account below :)</h5>
      <form onSubmit={onSubmit}>
        <div className={Styles.registrationForm}>
          <TextField
            className={Styles.regFormTextFields}
            required
            id="first-name-profile"
            label="First Name"
            value={firstName.val}
            onChange={(ev) => updateForm('firstName', ev.target.value)}
            error={!!firstName.error}
            helperText={firstName.error}
          />
          <TextField
            className={Styles.regFormTextFields}
            required
            id="last-name-profile"
            label="Last Name"
            value={lastName.val}
            onChange={(ev) => updateForm('lastName', ev.target.value)}
            error={!!lastName.error}
            helperText={lastName.error}
          />
          <TextField
            className={Styles.regFormTextFields}
            required
            id="phone-number-profile"
            label="Phone Number"
            value={phoneNo.val}
            onChange={(ev) => updateForm('phoneNo', ev.target.value)}
            error={!!phoneNo.error}
            helperText={phoneNo.error}
          />
          <TextField
            className={Styles.regFormTextFields}
            required
            id="door-street-profile"
            label="Door No.& Street Name"
            value={doorStreet.val}
            onChange={(ev) => updateForm('doorStreet', ev.target.value)}
            onBlur={() => validateAddress()}
          />
          <TextField
            className={Styles.regFormTextFields}
            required
            id="province-profile"
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
            id="city-profile"
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
              defaultValue={country.val}
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
            id="postal-code-profile"
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
            id="email-profile"
            label="Email Address"
            value={email.val}
            disabled
            onChange={(ev) => updateForm('email', ev.target.value)}
            error={!!email.error}
            helperText={email.error}
          />
          {addressVerified ? (
            <div
              className={Styles.regFormTextFields}
              style={{ background: 'green' }}
            >
              Verified
            </div>
          ) : (
            <></>
          )}
        </div>
        <button id="sub_btn" type="submit" disabled={formInvalid || !addressVerified }>
          Update
        </button>
      </form>
    </div>
  );
};