import React, { useState } from "react";
import axios from "axios";
import validate from 'validator';
import './App.css';

const Registration = () => {

  const [nameLogin, setLoginReg] = useState("");
  const [nameReg, setNameReg] = useState("");
  const [firstNameReg, setfirstNameReg] = useState("");
  const [emailReg, setemailReg] = useState("");
  const [passwordReg, setpasswordReg] = useState("");
  const [confPassewordReg, setconfPassewordReg] = useState("");

  const register = () => {
    if(passwordReg !== confPassewordReg){
      alert('password must be identic');
    }
    else if(!validate.isEmail(emailReg)) {
      alert('warning email invalid');
    }
    else

var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
       login: nameLogin,
          password: passwordReg,
          email: emailReg,
          firstname: firstNameReg,
          lastname: nameReg,
});
var config = {
  method: 'post',
  url: 'http://127.0.0.1:8000/api/register',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  window.location.href = '../Login';
})
.catch(function (error) {
  console.log(error);
});
  };

  return (
    <div id="registration">
      <div id="form_registration">
      <label>
          <b>Login</b>
        </label>
        <input
          type="text" onChange={(e) => {setLoginReg(e.target.value); }}
          placeholder="Enter your Login" name="login" required
        />
        <label>
          <b>Name</b>
        </label>
        <input
          type="text" onChange={(e) => {setNameReg(e.target.value); }}
          placeholder="Enter your Name" name="name" required
        />
        <label>
          <b>FirstName</b>
        </label>
        <input
          type="text" onChange={(e) => {setfirstNameReg(e.target.value);}}
          placeholder="Enter your FirstName" name="firstname" required
        />
        <label>
          <b>Email</b>
        </label>
        <input
          type="email" onChange={(e) => {setemailReg(e.target.value);}}
          placeholder="Enter your email" name="email" required
        />
        <label>
          <b>Password</b>
        </label>
        <input
          type="password" onChange={(e) => {setpasswordReg(e.target.value);}}
          name="password" required
        />
        <label>
          {" "}
          <b>Confirm your password</b>
        </label>
        <input type="password" onChange={(e) => {setconfPassewordReg(e.target.value); }} 
        name="confirm_password" required
        />
        <button className="button_form" onClick={e =>register()} id="submit_register" value="register"
        >Register</button>
      </div>
    </div>
  );
};

export default Registration;