import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/mongoDB.js";

import memberRoutes from "./src/routes/memberRoutes.js";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
    console.log("GET");
    
    res.send("API running");
});

app.use(express.json());
app.use(cors());

app.use("/api/members", memberRoutes);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
