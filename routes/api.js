const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    const map_id = 1;
    db.query(`SELECT * FROM maps WHERE id = $1`, [map_id])
      .then(data => {
        const map_data = data.rows;
        db.query(`SELECT * FROM pins WHERE map_id = $1`, [map_id]).then(
          pins => {
            const pin_data = pins.rows;
            res.json({ map_data, pin_data });
          }
        );
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/users", (req, res) => {
    db.query(`SELECT * FROM users`)
      .then(data => {
        const users = data.rows;
        res.json({users});
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

