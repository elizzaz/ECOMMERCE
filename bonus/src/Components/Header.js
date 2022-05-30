import './App.css';
import React, { useEffect, useState } from "react";
import Login from './Login';
import Account from './Account';
import Registration from './Registration';
import { Link } from "react-router-dom";
import axios from "axios";
import Panier from './ContentPanier';
import AddAnnouc from './AddAnnouc';
import logo from "../enz_motors_logo.png";

function Header() {
    return (
<header class="section-header">
<section class="header-main border-bottom">
    <div class="container">
<div class="row align-items-center">
    <div class="col-lg-4 col-4">
    <a href="http://localhost:3000/">
    <img src={logo}></img>
    </a>
    </div>
    <div class="col-lg-4 col-sm-4">
        <form action="#" class="search">
            <div class="input-group w-100">
                <input type="text" class="form-control" placeholder="Search" />
                <div class="input-group-append">
                <button class="btn btn-primary" type="submit">
                    <i class="fa fa-search"></i>
                </button>
                </div>

                <Link to={{ pathname: "/AddAnnouc",state: { fromDashboard: true },}}>
                           <li to="/AddAnnouc" Components={AddAnnouc}>
                           <button class="btn btn-primary marg">Deposer une annonce</button>
                        </li>
                      </Link>  


                
            </div>
        </form> 
    </div> 
    <div class="col-lg-4 col-sm-4 col-4">
        <div class="widgets-wrap float-md-right">
            <div class="widget-header  mr-3">
            <Link to={{ pathname: "/Panier",state: { fromDashboard: true },}}>
                  <li to="/Panier" Components={Panier}>
                      <button class="icon icon-sm rounded-circle border"><i class="fa fa-shopping-cart"></i></button>
                  </li>
            </Link>    
          </div>
            <div class="widget-header icontext">

            
            <Link to={{ pathname: "/Account",state: { fromDashboard: true },}}>
                           <li to="/Account" Components={Account}>
                           <button class="icon icon-sm rounded-circle border"><i class="fa fa-user"></i></button>
                        </li>
                      </Link>  
               

                <div class="text">
                    <div> 
                    <Link to={{ pathname: "/Login",state: { fromDashboard: true },}}>
                           <li to="/Login" Components={Login}>
                                  <a href="#">Se connecter</a>
                        </li>
                      </Link>  
                                   
                      <Link to={{ pathname: "/Register",state: { fromDashboard: true },}}>
                           <li to="/Register" Components={Registration}>
                               <a href="#"> S'enregistrer</a>
                          </li>
                      </Link>  
                    </div>
                </div>
            </div>

        </div> 
    </div>
</div>
    </div> 
</section> 
</header> 


);
}
export default Header;