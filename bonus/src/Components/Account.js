import React, { useEffect, useState } from "react";
import validate from "validator";
import axios from "axios";
import './App.css';


const UserAccount = (props) => {
  

  const [userData, setUserData] = useState({
    login: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    id: "",
  });

  useEffect(() => {
    // const localtoken = localStorage.getItem("myJWT");
    const id_client = sessionStorage.getItem('id_client');

    axios
      .get("http://127.0.0.1:8000/api/user?id="+id_client)
    //   + decoded.id
      .then((response) => {
        console.log(response);
        if (response.data) {
          setUserData(response.data);
        }
      });
  }, [props]);
  console.log("response");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const UpdateInfosUser = () => {
    if (userData.password !== userData.confirm_password) {
      alert("password must be identic");
    } else if (!validate.isEmail(userData.email)) {
      alert("warning email invalid");
    } else {
      const id_client = sessionStorage.getItem('id_client');
      var axios = require('axios');
      var qs = require('qs');
      var data = qs.stringify({
        login: userData.login,
         password:  userData.password,
         email:  userData.email,
         firstname:  userData.firstname,
        lastname:  userData.lastname,
       id: id_client,
      });
      var config = {
        method: 'patch',
        url: 'http://127.0.0.1:8000/api/user',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });









    // //   const localtoken = localStorage.getItem("myJWT");
    // //   const decoded = jwt.verify(localtoken, "secret");
    // const id_client = sessionStorage.getItem('id_client');
    //   axios
    //     .patch("http://localhost:8000/api/user", {
    //         // + decoded.id
    //         login: userData.login,
    //         password:  userData.password,
    //         email:  userData.email,
    //         firstname:  userData.firstname,
    //         lastname:  userData.lastname,
    //         id: id_client,
    //     })
    //     .then((response) => {
    //       console.log(response);
    //     });
    }
  };

  return (
    <div>
      <div id="content_user_account">
        {userData && (
          <div id="info_user">
            <h3>Informations User</h3>
            <div>
              {/* if exist else defautl*/}
              {/* <img className="saut" src={logo} alt="logo" />
              <button>Change pitcure</button><br /> */}
              {/* NAME */}
              <label>
                <b>Login : {userData.login}</b>
              </label>
              <input
                type="text"
                name="login"
                value={userData.login}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {/* FISRT NAME */}
              <label>
                <b>First Name : {userData.firstname}</b>
              </label>
              <input
                type="text"
                name="firstname"
                value={userData.firstname}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
             
              {/* LAST NAME*/}
              <label>
                <b>Last Name : {userData.lastname}</b>
              </label>
              <input
                type="tel"
                name="lastname"
                value={userData.lastname}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
               {/* EMAIL */}
               <label>
                <b>Email : {userData.email}</b>
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={(e) => {
                  handleChange(e);
                }}
                />
                 {/* id */}
               {/* <label>
                <b>id : {userData.id}</b>
              </label>
              <input
                type="text"
                name="id"
                value={userData.id}
                onChange={(e) => {
                  handleChange(e);
                }}
                /> */}
              {/* PASSEWORD*/}
              <label>
                <b>Change password :</b>
              </label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <label>
                {" "}
                <b>Confirm your new password</b>
              </label>
              <input
                type="password"
                name="confirm_password"
                value={userData.confirm_password}
                onChange={(e) => {
                  handleChange(e);
                }}
              />

              {/* BOUTON*/}
              <button
                className="button_form"
                onClick={(e) => UpdateInfosUser()}
                id="submit_change"
                value="change"
              >
                Change info
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default UserAccount;