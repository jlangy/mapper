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
const updateMap = require('../db/queries/update_maps');
const updatePins = require('../db/queries/update_pins');
const updateCollaborators = require('../db/queries/update_collaborators');
const insertCollaborators = require('../db/queries/insert_collaborators');
const updateFavourites = require('../db/queries/update_favourites');
const api = process.env.API;

module.exports = db => {
  // public maps browse route
  router.get("/", (req, res) => {
    const userId = req.session.userId;
    db.query(`SELECT * FROM maps WHERE public = true`)
      .then(data => {
        const map_data = data.rows;
       const dataJSON = JSON.stringify(map_data);
       res.render('browse_maps', {dbData: dataJSON, user: userId, mapType: 'public'});
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      })
  });

  //display my maps for logged in user
  router.get("/mymaps", (req, res) => {
    const userId = req.session.userId;
    db.query(`SELECT * FROM maps WHERE owner_id = $1`, [userId])
      .then(data => {
        const map_data = data.rows;
        const dataJSON = JSON.stringify(map_data);
       res.render('browse_maps', {dbData: dataJSON, user: userId, mapType: 'myMaps'});
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      })
  });

  // display my favourite maps for logged in user
  router.get("/favourites", (req, res) => {
    const userId = req.session.userId;
    db.query(`SELECT * FROM maps WHERE id IN (SELECT map_id FROM favourites WHERE user_id = $1 AND active = true)`, [userId])
      .then(data => {
        const map_data = data.rows;
        const dataJSON = JSON.stringify(map_data);
        res.render('browse_maps', {dbData: dataJSON, user: userId, mapType: 'favourites'});
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      })
  });
  // update favourites list for logged in user
  router.post('/favourites', (req, res) => {
    const user_id = req.session.userId;
    const map_id = req.body.mapId;
    const favourite = (req.body.fav === 'true' ? true : false );
    updateFavourites(db, [user_id, map_id, favourite])
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message });
      })
  });

  router.get("/new", (req, res) => {
    res.render("new_map", {user: req.session.userId});
  });

  router.get("/:id/edit", (req, res) => {
    //edit map similar to new
    const map_id = req.params.id;
    db.query(`SELECT * FROM maps WHERE id = $1`, [map_id])
      .then(data => {
        const map_data = data.rows[0];
        //Dont want to display current visitor in collaborators list
        // Promise.all([db.query('SELECT * from collaborators WHERE map_id = $1 AND NOT user_id = $2', [map_id, req.session.userId]),
        Promise.all([db.query('SELECT email FROM users WHERE id IN (select user_id from collaborators WHERE map_id = $1 and active=true AND NOT user_id = $2)', [map_id, req.session.userId]),
        db.query(`SELECT * FROM pins WHERE map_id = $1`, [map_id])]).then(values => {
            const pin_data = values[1].rows;
            const collaborator_data = values[0].rows;
            const dataJSON = JSON.stringify({ map_data, pin_data, collaborator_data });
            console.log(map_data);
            res.render('edit_map', {
              dbResults: dataJSON,
              mapId: map_data.id,
              mapTitle: map_data.title,
              mapPublic: map_data.public,
              mapDescription: map_data.description,
              user: req.session.user
            });
          }
        )     .catch(err => {
          res.status(500).json({ error: err.message });
        });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:id", (req,res) => {
    const userId = req.session.userId;
    const mapId = req.params.id;
    if (!userId) {
      return;
    }
    const lat = req.body.mapLat ? req.body.mapLat : null;
    const lng = req.body.mapLng ? req.body.mapLng : null;
    //Add the map first (pins refers to map), then add all pins
    updateMap(db, [req.body.title, req.body.description, req.body.collaborative, req.body.public, lat, lng, mapId])
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
    updatePins(db, {pinTitle: req.body.pinTitle ? req.body.pinTitle : '',
                    mapId,
                    owner_id: userId,
                    lat: req.body.lat,
                    long: req.body.lng,
                    pinDescription: req.body.pinDescription ? req.body.pinDescription : '',
                    imageUrl: req.body.imageUrl ? req.body.imageUrl : '',
                    active:req.body.pinActive})
    updateCollaborators(db, mapId, req.body.email, req.body.active)
    res.send(String(mapId));
      // .catch(err => {
      //   console.log(err);
      //   res.status(500).json({ error: err.message });
      // });
  });

  router.get("/:id", (req, res) => {
    const map_id = req.params.id;
    const user_id = req.session.userId;
    db.query(`SELECT * FROM maps WHERE id = $1`, [map_id])
      .then(data => {
        const map_data = data.rows[0];
        db.query(`SELECT * FROM pins WHERE map_id = $1`, [map_id])
        .then(pins => {
          const pin_data = pins.rows;
            db.query(`SELECT active FROM favourites WHERE map_id = $1 AND user_id = $2`, [map_id, user_id])
            .then(info => {
              let favourite = false;
              if (info.rows[0]) {
                favourite = info.rows[0].active;
              }
              const dataJSON = JSON.stringify({ map_data, pin_data });
              res.render('map_id', {
                dbResults: dataJSON,
                mapTitle: map_data.title,
                mapDescription: map_data.description,
                mapId: map_data.id, user: user_id,
                mapOwner: map_data.owner_id,
                favourite,
                api_key: api
              });
            });
        });
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
    const lat = req.body.mapLat ? req.body.mapLat : null;
    const lng = req.body.mapLng ? req.body.mapLng : null;
    insertMap(db, [userId, req.body.title, req.body.description, lat, lng, req.body.collaborative, req.body.public])
      .then((data) => {
        const mapId = data.rows[0].id;
        insertPins(db, {userId, mapId, imageUrl: req.body.imageUrl, pinTitle: req.body.pinTitle, pinDescription: req.body.pinDescription, lat:req.body.lat, lng: req.body.lng, active:req.body.pinActive});
        insertCollaborators(db, mapId, req.body.collaborator);
        res.send(String(mapId));
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
