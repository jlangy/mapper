/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM widgets`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/new", (req, res) => {
    res.render('new_map');
  });

  router.post("/", (req, res) => {
    const userId = req.session.userId;
    console.log(userId);
    let mapQuery = `INSERT INTO maps (owner_id, title, description, created_at, edited_at, collaborative, public, active)
    VALUES ($1, $2, $3, NOW(), NOW(), $4, $5, true) RETURNING *;`;
    let pinsQuery = `INSERT INTO pins (owner_id, map_id, title, description, lat, long, image_url, created_at, edited_at, active) VALUES `;
    //Add the map first (pins reference map), then add all pins in a loop
    db.query(mapQuery, [userId, req.body.title, req.body.description, req.body.collaborative ? 'true' : 'false', req.body.public ? 'true' : 'false'])
      .then((data) => {
        //Edge cases: if 1 pin, pinTitle, desc etc. will be single values. If empty, do nothing.
        //TODO: make pintitle required so this all doesnt break on sad paths :(
        if(!Array.isArray(req.body.pinTitle)){
          if(req.body.pinTitle){
            db.query(pinsQuery + '($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), true)',
            [userId, data.rows[0].id, req.body.pinTitle, req.body.pinDescription, req.body.lat, req.body.lng, true]);
          }
        } else{
          const pinQueries = [];
          const pinParams = [];
          req.body.pinTitle.forEach((pin, i) => {
            pinQueries.push(pinsQuery + '($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), true)');
            pinParams.push([userId, data.rows[0].id, req.body.pinTitle[i], req.body.pinDescription[i], req.body.lat[i], req.body.lng[i], true]);
          });
          pinQueries.forEach((pinQuery,i) => {
            db.query(pinQuery, pinParams[i]);
          });
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
