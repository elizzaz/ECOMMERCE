import React, { useState } from "react";
import axios from "axios";
import validate from 'validator';
import './App.css';

const AddAnnouc = () => {

  const [nameAnnouc, setnameAnnouc] = useState("");
  const [description, setdescription] = useState("");
  const [pictureLink, setpictureLink] = useState("");
  const [price, setprice] = useState("");

  const add = () => {

    var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
    name: nameAnnouc,
    price: price,
    picture: pictureLink,
    description: description,
});
var config = {
  method: 'post',
  url: 'http://127.0.0.1:8000/api/products',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  window.location.href = '../';
})
.catch(function (error) {
  console.log(error);
});
  }

  return (
    <div id="registration">
      <div id="form_registration">
      <label>
          <b>Nom de la voiture</b>
        </label>
        <input
          type="text" onChange={(e) => {setnameAnnouc(e.target.value); }}
          placeholder="Enter the name" name="name" required
        />
        <label>
          <b>Decription</b>
        </label>
        <input
          type="text" onChange={(e) => {setdescription(e.target.value); }}
          placeholder="Enter your description" name="description" required
        />
        <label>
          <b>Picture</b>
        </label>
        <input
          type="text" onChange={(e) => {setpictureLink(e.target.value);}}
          placeholder="Enter the link of picture" name="picture" required
        />
        <label>
          <b>Price</b>
        </label>
        <input
          type="text" onChange={(e) => {setprice(e.target.value);}}
          placeholder="Enter your price" name="price" required
        />
        <button className="button_form" onClick={e =>add()} id="submit_register" value="register"
        >Deposer mon annonce</button>
      </div>
    </div>
  );
};

export default AddAnnouc;