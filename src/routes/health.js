import {
    Router
  } from 'express';
  const router = new Router();
  
  router.get('/', (req, res) => {
    res.set('Content-Type', 'text/plain');
    const status = req.app.get('HEALTH_STATUS');
    return res.send("status");
  });
  
module.exports = router;