import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const generateAccessToken = (id) => {
    return jwt.sign({ id }, accessTokenSecret);
};

export const verifyToken = (req, res, next) => {
    const verificationHeader = req.headers.authorization;

    if (!verificationHeader) {
        return res.status(401).json({ message: "Access denied. No token provided" });
    }

    const accessToken = verificationHeader.split(" ")[1];
    if (!accessToken) {
        return res.status(401).json({ message: "Access denied. Access token not valid" });
    }

    jwt.verify(accessToken, accessTokenSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Access denied. Access token not valid" });
        }
        req.id = decoded.id;
        next();
    });
};
