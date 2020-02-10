/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//Don't need user routes form MVP, but will go here
module.exports = (db) => {
  router.get('/login/:id', (req,res) => {
    req.session.userId = req.params.id;
    res.send(req.params.id);
  });
  return router;
};
