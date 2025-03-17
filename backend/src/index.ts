import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const dbClient = new Client({
	connectionString: process.env.DATABASE_URL,
});

dbClient
	.connect()
	.then(() => console.log("Connected to the database"))
	.catch((err) => console.error("Database connection error", err));

app.get("/api/events", async (req, res) => {
	try {
		const result = await dbClient.query("SELECT * FROM events");
		res.json(result.rows);
	} catch (error) {
		res.status(500).json({ message: "Error fetching events", error });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
