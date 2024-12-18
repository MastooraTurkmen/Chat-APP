import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js"

const app = express()
dotenv.config()

app.use(express.json());

const PORT = process.env.PORT || 5000

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server is listening on port: ${PORT}`);
})