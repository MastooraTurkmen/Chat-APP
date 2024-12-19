import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

// Routes
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

// DB
import connectToMongoDB from "./db/connectToMongoDB.js"

const app = express()
dotenv.config()

app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT || 5000

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server is listening on port: ${PORT}`);
})