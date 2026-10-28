import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import certificateRoutes from "./routes/certificateRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/certificates", certificateRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        message: "Certificate backend is running"
    });
});

const startServer = async (): Promise<void> => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();