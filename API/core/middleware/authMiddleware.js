const { auth } = require('express-oauth2-jwt-bearer');
require('dotenv').config();

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER,
});

module.exports = { checkJwt };
