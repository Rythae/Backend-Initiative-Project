const db = require( "./index")

let queryText = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS rentals;

CREATE TABLE IF NOT EXISTS users (
    "id" SERIAL PRIMARY KEY, 
    "name" VARCHAR(40) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "password" varchar(200) NOT NULL,
    "createdOn" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS movies (
    "id" SERIAL PRIMARY KEY, 
    "title" VARCHAR(40) NOT NULL,
    "year" VARCHAR(40) NOT NULL,
    "genre" varchar(200) NOT NULL,
    "createdOn" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS rentals (
    "id" SERIAL PRIMARY KEY, 
    "title" VARCHAR(40) NOT NULL,
    "year" VARCHAR(40) NOT NULL,
    "genre" varchar(200) NOT NULL,
    "createdOn" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (
    "name",
    "email",
    "password"
) VALUES (
    'Gregory',
    'greggsjg@gmail.com',
    'passkeyabc123'
);
INSERT INTO users (
    "name",
    "email",
    "password"
) VALUES (
    'Lamarr',
    'lamarrmessjg@gmail.com',
    'passkeya12c'
);
INSERT INTO users (
    "name",
    "email",
    "password"
) VALUES (
    'Williams',
    'willyseejg@gmail.com',
    'passkey13dc'
);
INSERT INTO movies (
    "title",
    "year",
    "genre"
) VALUES (
    'Sharktale',
    '2013',
    'animation'
);
INSERT INTO movies (
    "title",
    "year",
    "genre"
) VALUES (
    'Frozen',
    '2018',
    'animation'
);
INSERT INTO movies (
    "title",
    "year",
    "genre"
) VALUES (
    'Moana',
    '2017',
    'animation'
);
INSERT INTO rentals (
    "title",
    "year",
    "genre"
) VALUES (
    'Sharktale',
    '2013',
    'animation'
);
INSERT INTO rentals (
    "title",
    "year",
    "genre"
) VALUES (
    'Frozen',
    '2018',
    'animation'
);
INSERT INTO rentals (
    "title",
    "year",
    "genre"
) VALUES (
    'Moana',
    '2017',
    'animation'
);
`;




db.query(queryText)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
