import Payment from "payment";

function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

export function validateExpirationDate(value) {
  var legalExpirationDateRegEx = /^(0[1-9]|1[0-2])\/?(20([1][6-9]|[2][0-9]|[3][0-1]))$/;
  if(legalExpirationDateRegEx.test(value) && value) {
    return true;
  }
  return false;
}

export function validateNameOnCard(value) {
  var legalNamePattern = /^[^;:!@#$%^*+?\/<>0-9]*$/;
  if(legalNamePattern.test(value) && value) {
    return true;
  }
  return false;
}

export function validateCardType(value) {
  var visaRegEx = /^(?:4[0-9]{15})$/;
  var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  var amexpRegEx = /^(?:3[47][0-9]{13})$/;
  const clearValue = value.replace(/\D+/g, "");

  var isVisa = visaRegEx.test( clearValue ) === true;
  var isMast = mastercardRegEx.test( clearValue ) === true;
  var isAmex = amexpRegEx.test( clearValue ) === true;
  if( isVisa || isMast || isAmex ) {
    return true;
  }
  return false;
}

export function getIssuer(cardNumber) {
  return Payment.fns.cardType(cardNumber);
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }

  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
    case "amex":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 15)}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        8
      )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
      break; 
  }

  return nextValue.trim();
}

export function formatCVC(value, prevValue, allValues = {}) {
  const clearValue = clearNumber(value);
  let maxLength = 4;

  if (allValues.number) {
    const issuer = Payment.fns.cardType(allValues.number);
    maxLength = issuer === "amex" ? 4 : 3;
  }

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 2) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 6)}`;
  }

  return clearValue;
}

export function formatFormData(data) {
  return Object.keys(data).map(d => `${d}: ${data[d]}`);
}
