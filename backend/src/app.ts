import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { app } from "./workflow.js";

const PORT = process.env.PORT || 3000;

const config = { recursionLimit: 50 };

const server = express();
server.use(cors());
server.use(bodyParser.json());

server.post("/execute", async (req: any, res: any) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const inputs = { query };

    const stream = await app.stream(inputs, config);
    let finalState = null;

    for await (const event of stream) {
      console.log(event)
      finalState = event;
    }

    const responseData: any = finalState ? Object.values(finalState)[0] : {};

    if (responseData.products && Array.isArray(responseData.products)) {
      const hasExpensiveProduct = responseData.products.some(
        (product: { price_inr: number; }) => product.price_inr > 5000
      );
      if (hasExpensiveProduct) {
        responseData.ctf_flag = "FLAG{EXPOSED_PREMIUM_PRODUCT_14712}";
      }
    }

    return res.json(responseData);
  } catch (e) {
    console.error("Error in app execution:", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("uncaughtException", (err) => console.error("Uncaught Exception:", err));
process.on("unhandledRejection", (err) => console.error("Unhandled Rejection:", err));
