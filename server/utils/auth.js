// import dependencies
const jwt = require("jsonwebtoken");
require("dotenv").config();
// configuration
const secret = process.env.TOKEN_SECRET;
const expiration = process.env.TOKEN_EXPIRATION;
// define middleware
const auth = {
  authMiddleware: function ({ req }) {
    // get token value
    let token = req.body.token || req.query.token || req.headers.authorization;
    // sanitise data if `Bearer <token>`
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim(); // split, remove bearer and trim spaces
    }
    // if no token
    if (!token) {
      return req;
    }
    // if token
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration }); // decrypt data
      req.user = data;
    } catch (err) {
      return console.log("Invalid token!");
    }
    return req;
  },
  signToken: function ({ _id, username, firstName, lastName, email }) {
    const payload = { _id, username, firstName, lastName, email }; // initialise payload object
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration }); // encrypted token
  },
};
// export middlware
module.exports = auth;
