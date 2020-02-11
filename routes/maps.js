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
const insertCollaborators = require('../db/queries/insert_collaborators');

module.exports = db => {
  // maps browse route
  router.get("/", (req, res) => {
    //route for browse all, browse created, browse favourites
    //for favourites and created, use user_id in cookie
    //to collect map_ids from favourites table, or
    //collaborators table.
  });

  router.get("/new", (req, res) => {
    res.render("new_map", {user: req.session.userId});
  });

  router.get("/:id/edit", (req, res) => {
    //edit map similar to new
    res.render('edit_map', {user: req.session.userId})
  });

  router.get("/:id", (req, res) => {
    const map_id = req.params.id;
    db.query(`SELECT * FROM maps WHERE id = $1`, [map_id])
      .then(data => {
        const map_data = data.rows[0];
        db.query(`SELECT * FROM pins WHERE map_id = $1`, [map_id]).then(
          pins => {
            const pin_data = pins.rows;
            const dataJSON = JSON.stringify({ map_data, pin_data });
            res.render('map_id', {dbResults: dataJSON, mapTitle: map_data.title, mapDescription: map_data.description, user: req.session.user });
          }
        );
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return;
    }
    //Add the map first (pins refers to map), then add all pins
    insertMap(db, [userId, req.body.title, req.body.description, req.body.collaborative, req.body.public])
      .then((data) => {
        console.log(req.body);
        const mapId = data.rows[0].id;
        insertPins(db, {userId, mapId, pinTitle: req.body.pinTitle, pinDescription: req.body.pinDescription, lat:req.body.lat, lng: req.body.lng, active:true});
        insertCollaborators(db, mapId, req.body.collaborator);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
