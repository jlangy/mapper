INSERT into collaborators (map_id, user_id, active) VALUES(
  2,
  (SELECT id from users where email='alice@mail.com'),
  false
)
  ON CONFLICT (map_id, user_id) DO UPDATE
    SET active = false;
