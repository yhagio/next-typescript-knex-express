exports.up = async knex => {
    await knex.raw(`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
        id uuid DEFAULT gen_random_uuid (),
        username VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        PRIMARY KEY (id)
    );
    `);
};

exports.down = async knex => {
    await knex.raw(`
    DROP EXTENSION pgcrypto;
    DROP TABLE IF EXISTS users;
   `);
};