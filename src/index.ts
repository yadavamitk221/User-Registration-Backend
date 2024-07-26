import express from "express";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRouter";

var cors = require('cors');
const prisma = new PrismaClient();
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});  
