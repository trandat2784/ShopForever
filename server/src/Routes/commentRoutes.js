import express from "express"
import { listComment ,createComment,replyComment,deleteComment} from "../Controllers/commentControllers.js";

const commentRouter = express.Router();
commentRouter.post("/list", listComment);
commentRouter.post("/create",createComment)
commentRouter.post("/reply", replyComment);
commentRouter.delete("/delete", deleteComment);

export default commentRouter;