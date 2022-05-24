import express, { Express } from "express"
import { config } from "dotenv"
import cors from "cors"
import router from "./router"
import {connect, ConnectOptions} from "mongoose"

// Configs
config()
const PORT = process.env.PORT || 8000
const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost/ktf"

// Middleware
const createAppWithMiddleware = (): Express => {
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use("/", router)
    return app
}

// Database
const connectToDB = async () => {
    try {
        await connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
    } catch (error) {
        console.log(error)
    }
}

// App
const main = () => {
    try{
        const app = createAppWithMiddleware()
        connectToDB().then(()=>{
            console.log("Connected to DB")
        })
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

main()
