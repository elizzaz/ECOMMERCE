import './App.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ContentPanier() {

  const [value, setValue] = useState();

  useEffect(() => {
    if (!value){
     // const localtoken = localStorage.getItem("myJWT");
    // const decoded = jwt.verify(localtoken, "secret");
    const id_client = sessionStorage.getItem('id_client');
    const promise = axios.get("http://127.0.0.1:8000/api/cart?id="+id_client,{ 
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

const Delete = (productId) => {
var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
   
});
const id_client = sessionStorage.getItem('id_client');
var config = {
  method: 'delete',
  url: 'http://127.0.0.1:8000/api/cart?clientId='+id_client+'&productId='+productId,
//   http://127.0.0.1:8000/api/cart?clientId=11&productId=5',
//   http://127.0.0.1:8000/api/cart?clientId='+id_client+'productId='+productId,
    // clientId=11&productId=6',
  headers: { },
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

     return(value && value.listProduct.map((panier) =>
          <div className="ContentPanier">      
             
              <section class="section-content padding-y">
              <div class="container">
              
              <div class="row">
                  <main class="col-md-12">
              <div class="card">
              
              <table class="table table-borderless table-shopping-cart">
              <thead class="text-muted">
              <tr class="small text-uppercase">
              <th scope="col">Product</th>
              <th scope="col" width="120">Price</th>
              <th scope="col" class="text-right" width="200"> </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>
                      <figure class="itemside">
                          <div class="aside"><img src={panier.picture} class="img-sm"></img></div>
                          <figcaption class="info">
                              <p class="text-muted small">{panier.name}</p>
                          </figcaption>
                      </figure>
                  </td>
                  <td> 
                      <div class="price-wrap"> 
                          <var class="price">{panier.price}</var> 
                       
                      </div> 
                  </td>
                  <td class="text-right"> 
                  <a data-original-title="Save to Wishlist" title="" href="" class="btn btn-light mr-2" data-toggle="tooltip"> <i class="fa fa-heart"></i></a> 
                  <buton class="btn btn-light"
                   onClick={(e) => Delete(panier.id)}
                   id="submit_panier"
                   value="change">
                 Remove
                  </buton>
                  </td>
              </tr>
             
              </tbody>
              </table>
              
             
              </div> 
              
             
                  </main>
              </div>
              
              </div> 
              </section>
           
          </div>
          
     ));
  }
  export default ContentPanier;