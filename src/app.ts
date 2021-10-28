import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";

import { Server } from "socket.io";
import { router } from "./routes";

const app = express();

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User conected on socket ${socket.id}`);
});

app
  .use(cors())
  .use(express.json())
  .use(router)
  .get("/github", (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
  })
  .get("/singin/callback", (req, res) => {
    const { code } = req.query;

    return res.json(code);
  });

export { serverHttp, io };
