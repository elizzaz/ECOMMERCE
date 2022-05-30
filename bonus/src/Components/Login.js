import React, { useState } from "react";
import axios from "axios";
import './App.css';

const Login = () => {

  const [loginLog, setLoginLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const req = () => {

        var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
  email: loginLog,
  password: passwordLog,
});
var config = {
  method: 'post',
  url: 'http://127.0.0.1:8000/api/login',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  console.log("t loggé frere");
  var id_client = JSON.stringify(response.data.id_client);
  sessionStorage.setItem('id_client', id_client);
  console.log('dans ta session : '+sessionStorage.getItem('id_client'))
  window.location.href = '../Account?id='+id_client;
})
.catch(function (error) {
  console.log(error);
});


  };
  return (
    <div id="login">
      <div id="form_login">
        <label>
          <b>Email</b>
        </label>
        <input
          onChange={(e) => setLoginLog(e.target.value)}
          type="text"
          placeholder="Enter your email"
          name="text"
          required
        />
        <label>
          <b>Password</b>
        </label>
        <input
          onChange={(e) => setPasswordLog(e.target.value)}
          type="password"
          placeholder="Enter your password"
          name="password_user"
          required
        />
        <button
          className="button_form"
          onClick={(e) => req()}
          id="submit_login"
          value="login"
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default Login