import {
  Router
} from 'express';
import Util from 'util';

import Joi from 'joi';

import DbService from '../services/db'
import { Log } from '../services';

let jwt = require('jsonwebtoken');

const router = new Router();
const dbservice = new DbService()


//Declaring JOI - Object Schema Validation 
const user_register_joi = Joi.object().keys({
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
});

const user_login_joi = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});


// Method: POST Route : /user/register :: endpoint to register user
router.post('/register', async (req, res) => {

  const payload = req.body;

  //logging
  // pino express logger for elastic search
  Log.info('Register User Payload',payload); 

  req.log.info("Register User Payload: ", payload);

  const validation = Joi.validate(payload, user_register_joi);

  if (validation.error) {
    //if payload is invalid, return 422 error to user
    Log.info('Invalid Payload Received', payload); 
    req.log.info(`Error encountered ${Util.inspect(validation, { depth: null })}`);
    return res.boom.badData(validation.error);
  }

  try {
    //go to services/db.js -> separated business logic from route
    let result = await dbservice.RegisterUser(payload)
    req.log.info("New user created: ", result);

  } catch (err) {
    return res.boom.clientTimeout('timed out')
  }

  res.json({ 'message': 'A verification email has been sent to registered mail.' })
});



// Method: POST Route : /user/login :: endpoint to login user
router.post('/login', async (req, res) => {

  const payload = req.body;
  let result;

  //logging
  Log.info('Register User Payload',payload); 

  const validation = Joi.validate(payload, user_login_joi);

  if (validation.error) {
    Log.info('Invalid Payload Received', payload); 
    req.log.info(`Error encountered ${Util.inspect(validation, { depth: null })}`);
    return res.boom.badData(validation.error);
  }

  try {
    //here we will validate the user details with name
    result = await dbservice.LoginUser(payload.username)
  }
  catch (err) {
    return res.boom.forbidden('Incorrect username or password');
  }

  //check for valid password
  if (payload.password === result.password) {
    // valid user -> Generate JWT Token for subsequent requests
    let token = jwt.sign({ userId: payload._id },
      'thisissecret',
      {
        expiresIn: '24h' // expires in 24 hours
      }
    );

    result.token = token;
    // return the JWT token and userdetais for the future API calls

    res.json({ result })
  } else {
    return res.boom.unauthorized('Incorrect username or password');
  }

});




module.exports = router;