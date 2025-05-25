// EXPRESS VALIDATOR AND EXPRESS SERVER SETUP
import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
import { body, validationResult } from "express-validator";

//.ENV SETUP
import dotenv from "dotenv";
dotenv.config();

//ROUTER IMPORTS
import productRouter from "./routes/productRouter.js";

//EJS SETUP
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//APPLICATION MAIN
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/products", productRouter);

// Catch-all route to serve index.html for React Router (client-side)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});



// Error catching
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});

//Server Details
const PORT = (process.env.SERVER_HOST_PORT || 4000);
app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});