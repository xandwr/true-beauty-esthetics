import express from "express";
import dotenv from "dotenv";
import { SquareClient, SquareEnvironment } from "square";

dotenv.config({ path: ".env.local" });

const app = express();
const port = process.env.PORT || 3000;

console.log("Using environment:", process.env.SQUARE_ENVIRONMENT);

const client = new SquareClient({
    environment:
        process.env.SQUARE_ENVIRONMENT === "production"
            ? SquareEnvironment.Production
            : SquareEnvironment.Sandbox,
    token:
        process.env.SQUARE_ENVIRONMENT === "production"
            ? process.env.SQUARE_ACCESS_TOKEN_PRODUCTION
            : process.env.SQUARE_ACCESS_TOKEN_SANDBOX,
});

// middleware
app.use(express.json());

// root route
app.get("/", (req, res) => {
    res.json({ message: "Square backend running" });
});

// list catalog items
app.get("/api/catalog", async (req, res) => {
    try {
        const response = await client.catalog.searchItems({
            sortOrder: "DESC",
            archivedState: "ARCHIVED_STATE_NOT_ARCHIVED",
            limit: 10,
        });

        res.json(response.result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});
