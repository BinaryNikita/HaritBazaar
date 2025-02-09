import jwt from 'jsonwebtoken';

export const authenticateToken = async (request, response, next) => {
    const token = request.header("Authorization");

    // const token = authHeader && authHeader.split(" ")[1]; // not working for me
    // console.log("Token:        "+authHeader);
    // console.log(token)
    if (!token) {
        return response.send("Access denied | No token provided");
    }
    try {
        const secretKey = "gdbjsbhgdyebfh";
        const decode = jwt.verify(token, secretKey);
        request.user = decode;
        next();
    } catch (err) {
        console.log(err);
    }
}