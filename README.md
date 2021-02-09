## About
### Simple Clone of Stackoverflow RESTful API
### <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank">What is a REST API?</a>
<strong>API</strong> is an abbreviation of Application Programming Interface. The concept of API is to enable exchange of data (resources) over HTTP protocol, the rules responsible for data transfer across the web.
<strong>REST</strong>, which stands for Representational State Transfer, defines a set of rules or standards that must be followed when developers create their API. One of these rules states that you should be able to get a piece of data (called a resource) when you link to a specific URL. REST determines how (design style) the API looks like.

Each URL is called a <strong>request</strong> while the data sent back to you is called a <strong>response</strong> which is sent back in JSON format. <strong>JSON</strong> stands for Javascript Object Notation, a data exchange format popular among the tech ecosystem.
## Use Cases Covered In this Simple Stackoverflow Clone
1. Authentication - enable users to signup and login with valid credentials or using social login accounts such as Google.
2. Questions (asking and replying)
3. Rating (upvoting and downvoting)
## Technologies Used
This project has been built using these recommended technologies.
1. <a href="https://nodejs.org/en/" target="_blank">Node.js</a> 
2. <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>
3. <a href="https://expressjs.com/" target="_blank">Express</a> - a minimalistic web framework for Node.js
4. <a href="https://www.mongodb.com/1" target="_blank">MongoDB</a> as choice database with <a href="https://mongoosejs.com/" target="_blank">Mongoose</a> as ODM
5. <a href="https://jestjs.io/" target="_blank">Jest</a> as testing framework
## Documentation
The API collections was documented using Postman.
## Instructions on getting started
Follow these simple steps below to get the project up and running on your computer:
1. Clone the repository using `git clone` command in your GIT Bash terminal
2. Ensure you have Node.js and NPM installed on your computer
3. Open the cloned project into Visual Studio Code editor or your preferred IDE.
4. Run `npm install` from your GIT bash terminal to install package dependencies.
5. Use the `env.sample` as a `.env` file to pass your environment variables within the application.
6. Run `npm start` command to spin up the server and you're good to go!
7. You can use the popular Postman API client to start interaction with the API endpoints.
## Run tests using JEST
Run `npm test` command from your git terminal.
## Author
<a href="https://www.linkedin.com/in/king-nicholas-96a68689/" target="_blank">Me</a>

