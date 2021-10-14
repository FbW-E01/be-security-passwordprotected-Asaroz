import express from "express"
import dotenv from "dotenv"



export default function config(app) {
    dotenv.config()
    app.use(express.json())
}