const jwt = require("jsonwebtoken");
const User = require("../model/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header(`authorization`).replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode._id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    req.token = token;

    req.user = user;

    next();
  } catch (err) {
    res.status(401).send({ error: "unAuthorized..!!" });
  }
};

module.exports = auth;
