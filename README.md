# mburr-cs313-team-week09

## Overview
This contains the project for the week 9 team assignment for BYUI CS313. This project creates a simple webpage where a user can enter two numbers, select an operation (add, multiply, subtract, or divide) and have the server execute that operation and return the results.

There are two flavors of this. The first is the basic assignment, which sends the request as a standard form submission, rerouting the user to a new page that shows the result. The second is the stretch assignment, which uses AJAX to submit the request "behind-the-scenes", receive the response, and then update the webpage accordingly.

## Files
 * **index.js**: This is the main application. This creates the various endpoints on which the NodeJS server will listen, manages the logic to perform the requested operations, and starts the server listening.
 * **views/home.ejs**: This is the home page. Express renders this page as the default page when the user enters the site.
 * **views/result.ejs**: This is the result page. Express renders this page when the user submits the form on the default webpage; this page shows the result of the operation and provides a way to return to the home page.
 * **public/script.js**: This contains the functions to perform the request and update the webpage dynamically, a la AJAX
 * **public/bootstrap.min.css**: This is a minimized Bootstrap template called "Sketchy" from here: https://bootswatch.com/
 
## Endpoints
The application (index.js) creates several endpoints. All of the endpoints support only the GET HTTP method.
 * **/**: This is the root endpoint and renders *views/home.ejs*, i.e. the home page
 * **/math**: This is the endpoint for form submission; it receives the request from the form and renders the result page in response with the result of the requested calculation. It expects a query string with the following query parameters:
   * op1: The first operand
   * op2: The second operand
   * operator: The operator/operation to perform; valid values are: add, sub, mul, div
 * **/math_service**: This is the endpoint for an AJAX request (although, it technically can be used without AJAX). It expects a URL of the following format: `/math_service/operator/op1/op2`. For example, `math_service/add/1/2` will perform addition of the numbers 1 and 2. It returns the result as a JSON object with the following properties:
   * op1: The first operand passed
   * op2: The second operand passed
   * op: The standard symbol for the operation, i.e. +, -, x, /
   * result: The result of the operation
   
## Other Notes
 * In `package.json`, note the `start` script in the scripts section; this is what starts the server running, Heroku needs this specific script in order to run the application. On your command-line, you can type either of the following to start the server:
   * `node index.js`
   * `npm run start`
 * By design, when running the application locally, it will listen on port 5000; you can adjust this in the **index.js** file
