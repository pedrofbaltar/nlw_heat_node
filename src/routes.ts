import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLastMessagesController } from "./controllers/GetLastMessagesServiceController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router
  .post("/authenticate", new AuthenticateUserController().handle)
  .post("/messages", ensureAuthenticated, new CreateMessageController().handle)
  .get("/messages/last", new GetLastMessagesController().handle)
  .get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router };
