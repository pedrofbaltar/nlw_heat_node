import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;
  const jwtSecret = String(process.env.JWT_SECRET);

  if (!authToken) {
    return res.status(401).json({
      errorCode: "token.invalid",
    });
  }

  // Bearer 1234token
  // [0] Bearer
  // [1] 1234token

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, jwtSecret) as IPayload;

    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).json({ errorCode: "token.expired" });
  }
}
