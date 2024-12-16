import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
export const getDataFromToken = (token) => {
    return jwt.decode(token);
}