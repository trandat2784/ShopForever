import express from "express"
import "dotenv/config";
import connectDB from "./src/config/mongoosedb.js"
import commentRouter from "./src/Routes/commentRoutes.js";
import cors from "cors"
const app = express()
const port = 3005
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDB()
app.use("/api/comment", commentRouter);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})