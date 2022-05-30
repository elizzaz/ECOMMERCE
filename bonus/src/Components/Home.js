import './App.css';
import React, { useEffect, useState } from "react";
import Panier from './ContentPanier';
import Login from './Login';
import Account from './Account';
import Registration from './Registration';
import { Link } from "react-router-dom";
import axios from "axios";


function Home() {
    console.log('home page')

    const [value, setValue] = useState();

    useEffect(() => {
        if (!value){
        const promise = axios.get("http://localhost:8000/api/products",{ 
        headers: { 'Access-Control-Allow-Origin': '*'},
            });
            promise.then((response) => {
                console.log(response.data)
                setValue(
                       response.data                        
                )
    })
    }
    })

const Delete = (productId) =>{
  var axios = require('axios');
var config = {
  method: 'delete',
  url: 'http://127.0.0.1:8000/api/products?id='+productId,
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
    }

    const AddCart = (productId) => {
        const id_client = sessionStorage.getItem('id_client');
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
          'clientId': id_client,
          'productId': productId 
        });
        var config = {
          method: 'post',
          url: 'http://127.0.0.1:8000/api/cart',
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
        
      }

   return( value && value.map((el) =>
   <section id="sectionhome">
     <div class="Home">
          <section class="">
              <div class="">
                  <h2>
                  {el.name}
                    </h2>
              </div> 
              </section>
<section>
           <div id="Annoucem">
          <div>
            <p>{el.description}</p>
          </div>
          <div>
            <p>{el.price}€</p>
          </div>
          <img src={el.picture}></img>
          <button className="button_form"
          onClick={(e) => AddCart(el.id)}
          id="submit_panier"
          value="change"
          >Ajouter au panier</button>

           <button className="button_del"
          onClick={(e) => Delete(el.id)}
          id="submit_panier"
          value="change"
          >Delete annouce</button>
        </div>
       
         </section>
         
      </div>
      </section>  
      ));
      
    
  }
  export default Home;