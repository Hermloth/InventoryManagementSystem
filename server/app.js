// EXPRESS VALIDATOR AND EXPRESS SERVER SETUP
import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";

import productRouter from "./routes/productRouter.js";
import settingsRouter from "./routes/settingsRouter.js";
import salesRouter from "./routes/salesRouter.js";
import purchasesRouter from "./routes/purchasesRouter.js"
dotenv.config();

//form and json parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//APPLICATION MAIN
app.use(express.static(path.join(__dirname, "../client/dist")));

// API routes
app.use('/api/products', productRouter);
app.use('/api/settings', settingsRouter);
app.use(`/api/sales`, salesRouter);
app.use('/api/purchases', purchasesRouter)


// Catch-all route to serve index.html for React Router (client-side)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Error catching
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});

//Server Details
const PORT = (process.env.SERVER_HOST_PORT || 4001);
app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});