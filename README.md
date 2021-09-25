# MEDZONE
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

### An E-Commerce web application for the purchase of medicines with an added fanctionality to scan thier prescriptions.

***
## Main Features

### Authentication
The User is required to provide his name, email and password for signup.

### Dashboard
All the logged in users are directed to the HOme page where they can serach for medicines by their name, category or manufacturer and will be provided with a random list of categories along with products uder that category.

### Top Navbar
Once you are logged in, the top navbar will contain the button to add a prescrition for extraction of medicines, to view thier cart and whishlist, to view thier profile and finally to logout.

### Product Screen
The users will be directed to this screen whenever they click on a product where the entire details of the Product(Medicine will be present). They can add the corresponding medicine with the quantity they need to their cart or thier whishlist if they are loggedin.

### Cart Screen
The user would be able to navigate to their cart with the help of the button present in the navbar.
This screen contains the list of products that are persent in the users cart where they would be able to change the quantity and make payments.

### Payment Screen
The user will be able be complete their payments by entering their card details(dummy).

### Prescrition processing screen
The user is directed to add thier electronic copy of thier prescrition. Upon successful upload the image will passed on to be ML model which will be deployed as a microservice with the help of docker.
After the processing is done the model return an arrey of words which will further be passed on to the backend which responses with a list of items

***

### Tech Stack and Concepts used:

<p align="left"> <a href="https://expressjs.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" alt="express" height="40"/> </a> <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank"> <img src="https://img.icons8.com/color/48/000000/html-5.png"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://img.icons8.com/color/48/000000/javascript.png"/> </a> <a href="https://www.mongodb.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" alt="mongodb" width="50" height="50"/> </a> <a href="https://nodejs.org" target="_blank"> <img src="https://img.icons8.com/color/48/000000/nodejs.png"/> </a> <a href="https://postman.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://www.netlify.com" target="_blank"> <img src="https://www.netlify.com/img/press/logos/logomark.png" alt="Netlify" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt="React" width="60" height="40"/>  <a href="https://material-ui.com" target="_blank"> <img src="https://material-ui.com/static/logo.png" alt="Material UI" width="50" height="60"/> </a></p>
<br>

* __Frontend:__ Reactjs, Javascript, MaterialUI, HTML, CSS, Styled-components
* __Backend:__  Nodejs, Expressjs
* __Databse:__ MongoDB
* __Deployment:__ Heroku, Netlify
* __Tools:__ Git

### ML Model
The model relys on PyTesseract library where the received image of the prescrition will be processed to extract the words which further undergo cleaning with the help of NLP libraries such as nltk to finally output the list of words which could possibly be medicines.
***
  
  ### Setting Up the Project 🔧


#### Clone the repo

   ```sh
   git clone https://github.com/Zeph-T/SkillKits.git
   ```
* __Frontend__
1. change the directory to Frontend
    ```
    cd Frontend
    ```
2. Install NPM packages

   ```sh
   npm install
   ```
3. Create a .env file and add values accordingly.
4. Run the server (Note : Make sure you start the Backend server before the Frontend server to avoid unnecessary errors.)
   ```
   npm start 
   ```

* __Backend__
1. change the directory to Backend
    ```
    cd Frontend
    ```
2. Install NPM packages

   ```sh
   npm install
   ```
3. Create a .env file and add values accordingly.
4. Run the server 
   ```
   npm start 
   ```


