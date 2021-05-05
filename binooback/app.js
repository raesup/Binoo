import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import expressValidator from "express-validator";
import colors from "colors";
import path from "path";

// import routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// app
const app = express();

// this function connects us to the DB!!!
connectDB();

//   middlewares
app.use(morgan("dev")); //log requests to console
app.use(bodyParser.json()); //Get json data from req.body
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", stripeRoutes);
app.use("/api", orderRoutes);

const port = process.env.PORT || 8000;

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/binoofront/build')));

  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, 'binoofront', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgYellow.black.bold);
});
