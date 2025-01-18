import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
if (process.env.NODE_ENV === 'production') {
	app.use(cors({
	  origin: '*',
	  credentials: true,
	}));
  } else {
	app.use(cors({ origin: "http://localhost:5173" }));
  }
  
app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

//===================================
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

//----------------------------------

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
