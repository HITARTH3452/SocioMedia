import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    
    // two ways to to this verify token method this is 1st

    // let token = req.header("Authorization");

    // if(token.startsWith("Bearer ")) {
    //     token = token.slice(7, token.length).trimLeft();
    // }

    // const verified = jwt.verify(token , process.env.JWT_SECRET);
    // req.user = verified;


    //this is 2nd
    
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) res.status(403).send({ err: "forbidden" });

      req.user = user;
      next();
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
