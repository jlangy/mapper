INSERT INTO maps (owner_id, title, description, created_at, default_lat, default_long, collaborative, public, active)
  VALUES (1, 'Victoria Coffee Shops', 'The best coffee shops in Victoria, BC.', now(), 48.4261, - 123.3642, TRUE, TRUE, TRUE),
        (1, 'Victoria Breweries', 'Visit all of the breweries in Victoria, BC.', now(), 48.4261, - 123.3642, TRUE, TRUE, TRUE),
        (1, 'Lighthouse Labs Employers', 'See where LHL alumni are currently working and where you might be able to get a job!', now(), 48.4261, - 123.3642, TRUE, TRUE, TRUE),
        (2, 'This is a private map', 'Only user with id 2 should access this map.', now(), 48.4261, - 123.3642, TRUE, FALSE, TRUE)
  ;

