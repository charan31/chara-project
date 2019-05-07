# charan-project
this is sample project with user registration and login


## How Run the application
 
    1. `git clone https://github.com/charan31/charan-project.git ` into your working repo

    2.after cloning into your repo, on node js command prompt run below

         npm install

    3. npm start 
            npm start to run the application and check routes
    
    4.npm test
            npm test command used to run mocha unittests



#Endpoints and Methods (API Reference)
This projects consists of two endpoints that can be used to register user and login the user.

###### /user/register/
Method : POST
Request: 
    - username string
    - firstname string
    - lastname string
    - email string
    - password string

Response:
    `{ 'message': 'A verification email has been sent to registered mail.'} `

Success Status Code: 
    200

Failure Status Codes:
    422 - Invalid Payload
    403 - Forbidden
    408 - Timedout


###### /user/login/
Method : POST
Request: 
    - username string
    - password string

Response:
    `{ username : XXX, firstname: AAA, lastname: bbb, email: a@b.c, password:p} `

Success Status Code: 
    200
    
Failure Status Codes:
    422 - Invalid Payload
    403 - Forbidden
    408 - Timedout



## Project Folder Structure

1. src/index.js: main program file. initialized express router
2. src/routes: routes/endpoints
3. src/services: all business logic has been separated from routes and added here in services folder
4. test/ : unit testing