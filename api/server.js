import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Products from "./models/product.model.js";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
// Middleware
if (process.env.NODE_ENV === 'production') {
    app.use(cors({
        origin: 'https://shopping-website-front-n1-p9v1.vercel.app', // No trailing slash
        methods: ["GET", "POST", "DELETE", "PATCH"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Specify custom headers, if applicable
    }));
} else {
    app.use(cors({
        origin: "http://localhost:5173", // Localhost for development
        methods: ["GET", "POST", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }));
}

  
app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);
app.get('/', (req, res) => {
    res.send('Server is running!');
  });
//===================================
app.get('/api/test-db', async (req, res) => {
    try {
        const testConnection = await Product.findOne();
        if (testConnection) {
            res.status(200).send('Database connected successfully!');
        } else {
            res.status(200).send('Database connected, but no data found.');
        }
    } catch (error) {
        res.status(500).send(`Database connection error: ${error.message}`);
    }
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

//----------------------------------

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
