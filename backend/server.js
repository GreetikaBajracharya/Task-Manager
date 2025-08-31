import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import folderRoutes from "./routes/folderRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/tasks",taskRoutes);
app.use("/folders",folderRoutes);
app.use("/groups",groupRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost: ${PORT} `);
})