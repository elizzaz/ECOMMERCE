import './App.css';
import React, { useEffect, useState } from "react";
import ContentPanier from './ContentPanier';
import axios from "axios";

function Panier() {


     return(
          <div className="Panier">      
              <section class="section-pagetop bg">
              <div class="container">
                  <h2 class="title-page">
                      
                      Shopping cart</h2>
              </div> 
              </section>
              
              <section class="section-content padding-y">
              <div class="container">
              
              <div class="row">
                  <main class="col-md-12">
              <div class="card">
          <ContentPanier />   
              
              <div class="card-body border-top">
                  <a href="#" class="btn btn-primary float-md-right"> Make Purchase <i class="fa fa-chevron-right"></i> </a>
                  <a href="http://localhost:3000" class="btn btn-light"> <i class="fa fa-chevron-left"></i> Continue shopping </a>
              </div>  
              </div> 
              
              <div class="alert alert-success mt-3">
                  <p class="icontext"><i class="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks</p>
              </div> 
                  </main>
              </div>
              
              </div> 
              </section>
           
          </div>
     );
  }
  export default Panier;