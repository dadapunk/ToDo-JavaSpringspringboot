import React from "react";

import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">ToDo's application management</h1>

    <p className="lead">
    This project is a web application for managing user's to-do lists. 
    It allows users to create, read, update, and delete to-do items. 
    The frontend of the application was developed using React.js, a popular JavaScript library. 
    For authorization, Auth0 was used. The application's backend was built using Spring Boot
     and Spring Data JPA, and a relational database was used to store the data. 
     It includes features such as pagination, filtering, sorting, and security 
     to ensure that user data is protected.
     </p>
     <p>
    Optional user credentials:<br />
    email: email@example.com:<br />
    password: CMuyZ@GU3eFg
    </p>
    
  </div>
);

export default Hero;
