CREATE EXTENSION IF NOT EXISTS pgcrypto;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id uuid DEFAULT gen_random_uuid (),
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (user_id)
);

-- ROLLBACK
-- DROP EXTENSION pgcrypto;
-- DROP TABLE IF EXISTS users;