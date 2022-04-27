import verify from "jsonwebtoken";
import jwt from 'jsonwebtoken'

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["auth-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    
    var decoded = jwt.decode(token, {complete: true});
console.log(decoded);
    req.user = decoded.payload;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;