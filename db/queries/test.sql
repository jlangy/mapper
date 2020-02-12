INSERT into pins (owner_id, map_id, title, description, lat, long, image_url, created_at, edited_at, active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), true)
    ON CONFLICT (map_id, lat, long) DO

    UPDATE SET
      title = $1,
      description = $2,
      image_url = $3,
      edited_at = NOW(),
      active = $4
    WHERE
      id = $5
