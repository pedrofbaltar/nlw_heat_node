import "dotenv/config";
import express from "express";

import { router } from "./routes";

const app = express();

app
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
  })
  .listen(4000, () => console.log(`Server is running on PORT:4000`));
