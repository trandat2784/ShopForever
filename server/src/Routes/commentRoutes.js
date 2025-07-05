import { listComment ,createComment,replyComment,deleteComment} from "../Controllers/commentControllers.js";
import express from "express"

const commentRouter = express.Router();
commentRouter.post("/list", listComment);
commentRouter.post("/create",createComment)
commentRouter.post("/reply", replyComment);
commentRouter.delete("/delete", deleteComment);

export default commentRouter;