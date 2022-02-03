var jwt = require("jsonwebtoken");
const JWT_SECRET = "Ytrewq@1234";

const fetchUser = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send({ error: "User is not authorized" });
    }
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
