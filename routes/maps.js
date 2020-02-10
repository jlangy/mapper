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
  // maps browse route
  router.get("/", (req, res) => {
    //route for browse all, browse created, browse favourites
    //for favourites and created, use user_id in cookie
    //to collect map_ids from favourites table, or
    //collaborators table.
  });

  router.get('/:id/edit', (req,res) => {
    //edit map similar to new
  });

  router.get('/:id', (req,res) => {
    //display single map using json api info
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
