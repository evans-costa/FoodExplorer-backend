import "express-async-errors";
import express from "express";
import { AppError } from "./utils/AppError.js";

const app = express();

app.use(express.json());

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
