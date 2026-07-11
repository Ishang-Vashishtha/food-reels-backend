// create server
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodPartnerRoutes = require("./routes/food-partner.routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const allowedOrigins = [process.env.FRONTEND_URL, process.env.VITE_API_URL, "http://localhost:5173"].filter(Boolean);

console.log("FRONTEND_URL =", process.env.FRONTEND_URL);
console.log("VITE_API_URL =", process.env.VITE_API_URL);
console.log("Allowed Origins =", allowedOrigins);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);

module.exports = app;
