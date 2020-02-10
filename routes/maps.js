/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const insertMap = require('../db/queries/insert_map');
const insertPins = require('../db/queries/insert_pins');

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
    if(!userId) {
      return;
    }
    //Add the map first (pins refers to map), then add all pins
    insertMap(db, [userId, req.body.title, req.body.description, req.body.collaborative, req.body.public])
      .then((data) => {
        const mapId = data.rows[0].id;
        insertPins(db, {userId, mapId, pinTitle: req.body.pinTitle, pinDescription: req.body.pinDescription, lat:req.body.lat, lng: req.body.lng, active:true});
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
