import  mongoose  from "mongoose";
import  env from "dotenv"


mongoose.connection.on("error",        er => console.log("ERROR", er))
mongoose.connection.on("connected",    () => console.log("connected"))
mongoose.connection.on("disconnected", () => console.log("disconnected"))

env.config()
const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

export async function dbConnect (){
    const connString= `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${PORT}/${DB_NAME}`
    await mongoose.connect(connString)
}

export async function dbDisconnect (){
    await mongoose.disconnect()
}