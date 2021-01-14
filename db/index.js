const { Pool } = require('pg')
const dotenv = require('dotenv')
const logger = require('../services/logger')

dotenv.config();

let connectionString;
if (process.env.NODE_ENV === "development") {
  connectionString = process.env.DATABASE_DEV_URL;
} else {
  connectionString = process.env.DATABASE_PRODUCTION_URL;
}

const db = new Pool({
  connectionString,
});

db.on("connect", () => {
  logger.info("CONNECTED TO DATABASE");
});

module.exports = {
   query: (text, values) => {
    return new Promise((resolve, reject) => {
      db.query(text, values)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
}

}


 
