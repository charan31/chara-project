
import { Log } from '../services';

//Using NEDB as Database as it is inmemory and faster
var Datastore = require('nedb');
var db = new Datastore();

export default class DbService {
    constructor() {
    }

    //method to register user
    RegisterUser(userDetails) {
         return new Promise((resolve, reject) => {
            try {
                db.insert(userDetails, function (err, user) {
                    if (err) {
                        reject(err);
                    }
                    Log.info('Inserted', user.username, 'with ID', user._id);
                    return resolve(user)
                });
            } catch (err) {
                Log.info('Error occured while sending stream response - ', err);
                reject(err);
            }
        })
    }

    // get user details by username
    LoginUser(username) {
        return new Promise((resolve, reject) => {
            try {
                db.findOne({ username: username }, function (err, user) {
                    if (err) {
                        reject(err);
                    }

                    if(user == null || user == undefined)  {
                        return reject(new Error('Invalid User'))
                    }
                    Log.info('Get User by name', user.username, 'with ', user._id);
                    return resolve(user)
                });
            } catch (err) {
                Log.info('Error occured while sending stream response - ', err);
                reject(err);
            }
        })
    }
}