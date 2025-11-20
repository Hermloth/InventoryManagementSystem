// EXPRESS VALIDATOR AND EXPRESS SERVER SETUP
import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from "bcryptjs";
import session from "express-session";
import pool from "./db/pool.js";


import productRouter from "./routes/productRouter.js";
import settingsRouter from "./routes/settingsRouter.js";
import salesRouter from "./routes/salesRouter.js";
import purchasesRouter from "./routes/purchasesRouter.js"
import  usersRouter from "./routes/usersRouter.js";
dotenv.config();


// 1. Body parsing (before session)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ===== SESSION CONFIGURATION =====
app.use(session({ 
    secret: process.env.SESSION_SECRET || "your-secret-key", 
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));

// ===== PASSPORT CONFIGURATION =====
app.use(passport.initialize());
app.use(passport.session());


// Passport Local Strategy
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            
            const { rows } = await pool.query(
                "SELECT * FROM users WHERE username = $1", 
                [username]
            );
            const user = rows[0];

            if (!user) {
                return done(null, false, { message: "Invalid username or password" });
            }
            
            const match = await bcrypt.compare(password, user.passwordhash);

            
            if (!match) {

                return done(null, false, { message: "Invalid username or password" });
            }


            return done(null, user);
        } catch (err) {
            console.error("Passport: Error during authentication:", err);
            return done(err);
        }
    })
);


// Serialize user (store user ID in session)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user (retrieve user from database using ID)
passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];
        
        if (!user) {
            return done(new Error("User not found"));
        }       
        done(null, user);
    } catch (err) {
        console.error("Deserialize error:", err);
        done(err);
    }
});

//form and json parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ===== AUTH ROUTES =====
// Login endpoint
app.post("/api/auth/login", 
    (req, res, next) => {
        next();
    },
    passport.authenticate("local", {
        failureMessage: true
    }),
    (req, res) => {
        res.json({ 
            success: true, 
            user: { 
                id: req.user.id, 
                username: req.user.username 
            } 
        });
    }
);

// Logout endpoint
app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: "Logout failed" });
        }
        res.json({ success: true });
    });
});

// Check auth status
app.get("/api/auth/status", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ 
            authenticated: true, 
            user: { 
                id: req.user.id, 
                username: req.user.username 
            } 
        });
    } else {
        res.json({ authenticated: false });
    }
});

// ===== PROTECTED ROUTE MIDDLEWARE =====
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: "Unauthorized" });
}

//APPLICATION MAIN
app.use(express.static(path.join(__dirname, "../client/dist")));

// API routes
app.use('/api/products', isAuthenticated, productRouter);
app.use('/api/settings', isAuthenticated, settingsRouter);
app.use(`/api/sales`, isAuthenticated, salesRouter);
app.use('/api/purchases', isAuthenticated, purchasesRouter);
app.use('/api/users', isAuthenticated, usersRouter);



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