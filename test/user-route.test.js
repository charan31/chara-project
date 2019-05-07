import Request from 'supertest'
import Server from '../src'

//Test Suite for routes and service layer

describe('Route /user/register', () => {
    it('#post /user/register should return 422 error for invalid payload', async () => {

        const payload = {
            'username': 'charan',
            'firstname':'kuta'

          };
          const retval = await Request(Server)
            .post('/user/register')
            .send(payload);
          expect(retval.res.statusCode).to.equal(422);

    });

    it('#post /user/register should register user', async () => {

        const payload = {
            'username': 'charan',
            'firstname':'kuta',
            'lastname':'teja',
            'email': 'test@test.com',
            'password': 'password'
          };
          const retval = await Request(Server)
            .post('/user/register')
            .send(payload);
          expect(retval.res.statusCode).to.equal(200);

    });
});

describe('Route /user/login', () => {
    it('#post /user/login should return 422 error for invalid payload', async () => {

        const payload = {
            'username': 'charan'
          };

          const retval = await Request(Server)
            .post('/user/login')
            .send(payload);
          expect(retval.res.statusCode).to.equal(422);

    });

    it('#post /user/login should return 401 for incorrect password', async () => {

      const payload = {
          'username': 'charan',
          'password': 'incorrect'
        };

        const retval = await Request(Server)
          .post('/user/login')
          .send(payload);
        expect(retval.res.statusCode).to.equal(401);

  });

  it('#post /user/login should return 403 for invalid user / not registered user', async () => {

    const payload = {
        'username': 'invaliduser',
        'password': 'incorrect'
      };

      const retval = await Request(Server)
        .post('/user/login')
        .send(payload);
      expect(retval.res.statusCode).to.equal(403);

});


    it('#post /user/login user should be able to login ', async () => {

        const payload = {
            'username': 'charan',
            'password': 'password'
          };
          const retval = await Request(Server)
            .post('/user/login')
            .send(payload);
          expect(retval.res.statusCode).to.equal(200);

    });
});