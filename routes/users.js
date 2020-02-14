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
  // router.get('/login/:id', (req,res) => {
  //   req.session.userId = req.params.id;
  //   res.send(req.params.id);
  // });

  router.get('/login', (req,res) => {
    res.render('login', {user:null});
  });

  router.post('/login', (req,res) => {
    const id = db.query('select id from users where email = $1', [req.body.email])
      .then(data => {
        if(data.rows[0]){
          const userId = data.rows[0].id;
          req.session.userId = userId;
          res.redirect(`${userId}/profile`);
        } else {
          res.redirect('login');
        }
        });
  });

  //profile page that shows my maps and favourite maps
  router.get("/:id/profile", (req, res) => {
    const userId = req.session.userId;
    db.query(`SELECT name, avatar FROM users WHERE id = $1`, [userId])
      .then(user => {
        const username = user.rows[0].name;
        const avatar = user.rows[0].avatar;
        db.query(`SELECT * FROM maps WHERE owner_id = $1 OR id IN (SELECT map_id FROM collaborators WHERE user_id = $1 AND active = true)`, [userId])
          .then(data => {
            const myMaps = JSON.stringify(data.rows);
            db.query(`SELECT * FROM maps WHERE id IN (SELECT map_id FROM favourites WHERE user_id = $1 AND active = true)`, [userId])
              .then(data => {
                const favouriteMaps = JSON.stringify(data.rows);

                res.render('profile', { username, avatar, myMaps, favouriteMaps, user: userId});
              })
          })
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });


  return router;
};
