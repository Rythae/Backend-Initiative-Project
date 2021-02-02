require("dotenv").config();

module.exports = {
  development: {
    database: 'movieapi',
    use_env_variable: 'DATABASE_DEV_URL',
    dialect: "postgres",
  },
  test: {
    use_env_variable: process.env.DATABASE_TEST_URL,
    dialect: "postgres",
  },
  production: {
    use_env_variable: process.env.DATABASE_Prod_URL,
    dialect: "postgres",
  },
};
