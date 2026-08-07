import express from "express";
import productsRouter from "./routes/products.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
