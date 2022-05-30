import './App.css';
import React, { useEffect, useState } from "react";
import logo from "../enz_motors_logo.png";
function Footer() {
    return (
        <footer class="section-footer border-top padding-y">
        <div class="container">
            <p class="float-md-right"> 
                &copy; Copyright 2022 | ILIAMIX | FRANCKY | ELIZZAZ |
            </p>
            <p>
            <a href="http://localhost:3000/">
    <img src={logo}></img>
    </a>
            </p>
        </div>
    </footer>


);
}
export default Footer;