import React from "react";
import Card from "react-credit-cards";
import Payment from "payment";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
  validateCardType,
  validateNameOnCard,
  validateExpirationDate
} from "./utils";

import "react-credit-cards/es/styles-compiled.css";

export default class App extends React.Component {
    state = {
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: "",
        formData: null,
        numberTouched: false,
        nameTouched: false,
        expiryTouched: false,
        cvcTouched: false,
    };

    handleCallback = ({ issuer }, isValid) => {
        if(issuer == "amex" || issuer == "visa" || issuer == "master") {
            if (isValid) {
                this.setState({ issuer });
            }
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name == "name") {
            var isNameValid = validateNameOnCard(target.value);
            if (!isNameValid) {
            }
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
    };

    handleInputValidate = ({ target }) => {
        if (target.name === "number") {
            var isCardValid = validateCardType(target.value);
            if (!isCardValid) {
                alert("Card Number is invalid. Please enter a valid card number.");
            }
        } else if (target.name == "name") {
            var isNameOnCardValid = validateNameOnCard(target.value);
            if (!isNameOnCardValid) {
                alert("Name on card cannot contain these characters: ;:!@#$%^*+?\/<>1234567890");
            }
        } else if (target.name === "expiry") {
            var isExpiryValid = validateExpirationDate(target.value);
            if (!isExpiryValid) {
                alert("Expiry date is invalid");
            }
        } else if (target.name === "cvc") {
            var isCVCValid = target.value.length === 3;
            if (!isCVCValid) {
                alert("CVC is invalid");
            }            
        }

        this.setState({ [target.name]: target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { issuer } = this.state;
        const formData = [...e.target.elements]
        .filter(d => d.name)
        .reduce((acc, d) => {
            acc[d.name] = d.value;
            return acc;
        }, {});

        this.setState({ formData });
        this.form.reset();
    };


    render() {
        const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
        // const visaPattern = /^(?:4[0-9]{12}(?:[0-9]{6})?)$/;
        // // const mastPattern = /^(?:5[1-5][0-9]{2}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4})$/;
        // const mastPattern = /^(?:5[1-5][0-9]{2}\s\d{4}\s\d{4}\s\d{4})$/;
        // const amexPattern = /^(?:3[47][0-9]{13})$/;
        // \d{4}\s\d{4}\s\d{4}\s\d{4}

        return (
        <div key="Payment">
            <div className="App-payment">
                <h1>React Credit Cards</h1>
                <h4>Beautiful credit cards for your payment forms</h4>
                <Card
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focused}
                    callback={this.handleCallback}
                />
                <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <input
                        type="tel"
                        name="number"
                        className="form-control"
                        placeholder="Card Number"
                        // pattern={visaPattern +"|" + mastPattern + "|" + amexPattern}
                        required
                        maxLength={issuer == "amex"? 18: 19}
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputValidate}
                        />
                    <small>E.g.: 49..., 51..., 36..., 37...</small>
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputValidate}
                        />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input
                            type="tel"
                            name="expiry"
                            className="form-control"
                            placeholder="Valid Thru MM/YYYY"
                            pattern="\d\d/\d\d\d\d"
                            required
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                            onBlur={this.handleInputValidate}
                            />
                        </div>
                        <div className="col-6">
                            <input
                            type="tel"
                            name="cvc"
                            className="form-control"
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
                        <button className="btn btn-primary btn-block">PAY</button>
                    </div>
                </form>
                {formData && (
                    <div className="App-highlight">
                        {formatFormData(formData).map((d, i) => (
                            <div key={i}>{d}</div>
                        ))}
                    </div>
                )}
                <hr style={{ margin: "60px 0 30px" }} />
            </div>
        </div>
        );
    }
}
