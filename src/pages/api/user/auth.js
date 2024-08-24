import jwt from "jsonwebtoken";

export default function auth(handler) {
    return async (req, res) => {
        if (req.method === "GET") {
            return handler(req, res);
        } else {
            const token = await req.headers.authorization.split("")[1];
            if (!token) {
                return res.status(401).json({ message: "トークンがありません" });
            } else {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    req.body.email = decoded.email;
                    return handler(req, res);
                } catch (error) {
                    return res.status(401).json({ message: "トークンがただしくないので、ログインしてください" });
                }
            }
        }
    };
}