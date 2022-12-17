import React from 'react';
import Card from 'react-credit-cards';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
  validateCardType,
  validateNameOnCard,
  validateExpirationDate,
  getIssuer,
} from './utils';
import './index.css';

import 'react-credit-cards/es/styles-compiled.css';
// import { BillDetails } from './components/BillDetails';

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
    isCardNumberValid: null,
    isNameOnCardValid: null,
    isExpiryValid: null,
    isCVCValid: null,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (issuer === 'amex' || issuer === 'visa' || issuer === 'master') {
      if (isValid) {
        this.setState({ issuer });
      }
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'name') {
      var isNameValid = validateNameOnCard(target.value);
      if (!isNameValid) {
      }
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleInputValidate = ({ target }) => {
    if (target.name === 'number') {
      this.setState({ isCardNumberValid: validateCardType(target.value) });
      if (!this.state.isCardNumberValid) {
        // alert("Card Number is invalid. Please enter a valid card number.");
      }
    } else if (target.name === 'name') {
      this.setState({ isNameOnCardValid: validateNameOnCard(target.value) });
      if (!this.state.isNameOnCardValid) {
        // alert("Name on card cannot contain these characters: ;:!@#$%^*+?\/<>1234567890");
      }
    } else if (target.name === 'expiry') {
      this.setState({ isExpiryValid: validateExpirationDate(target.value) });
      if (!this.state.isExpiryValid) {
        // alert("Expiry date is invalid");
      }
    } else if (target.name === 'cvc') {
      this.setState({ isCVCValid: target.value.length === 3 });
      if (!this.state.isCVCValid) {
        // alert("CVC is invalid");
      }
    }
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    // console.log(this.state.issuer);
    this.props.onPayClick({paymentType: getIssuer(this.state.number)});
  };

  getCardErrorText() {
    if (this.state.number === '') {
      return 'Card Number cannot be emtpy.';
    } else if (!validateCardType(this.state.number)) {
      return 'Card Type is not supported. Please try with a different card.';
    }
    return 'valid card';
  }
  getNameErrorText() {
    if (this.state.name === '') {
      return 'Name cannot be empty.';
    } else if (!validateNameOnCard(this.state.name)) {
      return 'Name cannot have the following characters: ;:!@#$%^*+?/<>1234567890';
    }
  }
  getExpiryErrorText() {
    if (this.state.expiry === '') {
      return 'Expiry cannot be empty.';
    } else if (this.state.expiry.length !== 7) {
      return 'Invalid Expiry format.';
    } else if (!validateNameOnCard(this.state.expiry)) {
      var expirySplit = this.state.expiry.split('/');
      if (expirySplit && expirySplit.length === 2) {
        var month = parseInt(expirySplit[0]);
        var year = parseInt(expirySplit[1]);
        if (month < 1 || month > 12) {
          return 'Month value out of range, must be between 01 to 12.';
        }
        if (year < 2016 || year > 2031) {
          return 'Year value out of range, must be between 2016 to 2031.';
        }
      } else {
        return 'Invalid Expiry format.';
      }
    }
  }

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
    return (
      <div>
        <div key="Payment">
          <div className="App-payment">
            {/* <h1>You are making a payment of {} C$</h1>
                <h4>Enter your card details to make payment</h4> */}
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />
            <form ref={(c) => (this.form = c)} onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="tel"
                  name="number"
                  className={
                    this.state.isCardNumberValid !== false ? 'form-control' : 'form-control invalid'
                  }
                  placeholder="Card Number"
                  required
                  maxLength={issuer == 'amex' ? 18 : 19}
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputValidate}
                />
                {this.state.isCardNumberValid === false && <small>{this.getCardErrorText()}</small>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className={
                    this.state.isNameOnCardValid !== false ? 'form-control' : 'form-control invalid'
                  }
                  placeholder="Name"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputValidate}
                />
                {this.state.isNameOnCardValid === false && <small>{this.getNameErrorText()}</small>}
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="tel"
                    name="expiry"
                    className={
                      this.state.isExpiryValid !== false ? 'form-control' : 'form-control invalid'
                    }
                    placeholder="Expiry MM/YYYY"
                    pattern="\d\d/\d\d\d\d"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputValidate}
                  />
                  {this.state.isExpiryValid === false && <small>{this.getExpiryErrorText()}</small>}
                </div>
                <div className="col-6">
                  <input
                    type="tel"
                    name="cvc"
                    className={
                      this.state.isCVCValid !== false ? 'form-control' : 'form-control invalid'
                    }
                    placeholder="CVC"
                    pattern="\d{3}"
                    required
                    maxLength={3}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputValidate}
                  />
                </div>
              </div>
              <input type="hidden" name="issuer" value={issuer} />
              <div className="form-actions">
                <button
                  disabled={
                    !this.state.isCardNumberValid ||
                    !this.state.isNameOnCardValid ||
                    !this.state.isExpiryValid ||
                    !this.state.isCVCValid
                  }
                  className="btn btn-primary btn-block"
                //   onClick={this.props.onPayClick}
                type="submit"
                >
                  PAY
                </button>
              </div>
            </form>
            {/* {formData && (
                    <div className="App-highlight">
                        {formatFormData(formData).map((d, i) => (
                            <div key={i}>{d}</div>
                        ))}
                    </div>
                )} */}
            <hr style={{ margin: '60px 0 30px' }} />
          </div>
        </div>
      </div>
    );
  }
}
