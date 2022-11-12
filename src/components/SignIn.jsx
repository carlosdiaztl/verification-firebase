import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebaseConfig";

const SignIn = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const validatePhoneNumber = (numberPhone, lengthString) => {
    if (!numberPhone) {
      return false;
    }

    const value = numberPhone.replace(/\D/g, "");
    const valueLength = value.length;
    return { isValid: valueLength === lengthString, value };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, value: validNumber } = validatePhoneNumber(
      phoneNumber,
      10
    );
    console.log(isValid, validNumber);
    if (!isValid) {
      alert("el numero debe tener 10 caracteres");
    }
    generateReCaptcha();
    const recapcthaValue = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+57${validNumber}`, recapcthaValue)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        navigate("/verification");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const generateReCaptcha = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptch-container",
        {
          size: "invisible",

          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // onSignInSubmit();
            // console.log(response);
          },
        },
        auth
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      SignIn
      <form onSubmit={handleSubmit}>
        <label>
          Phone number
          <input
            type="number"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            value={phoneNumber}
            placeholder="Ingrese numero de telefono"
          />
        </label>
        <button type="submit"> Sign in</button>
        <div id="recaptch-container"> </div>
      </form>
    </div>
  );
};

export default SignIn;
