import express from "express"
import config from "./libs/config.js"
import {dbConnect,dbDisconnect} from "./libs/connection.js"
import User from "./models/user.js"
import Message from "./models/message.js"


const server = express()
config(server)


dbConnect()

server.use((req,res,next)=>{
    console.log(req.body)
    next()
})

server.post("/register",async (req,res)=>{
   try{
        const user = await User.register(req.body)
        res.json({
            _id:user.id,
            username:user.username})
   } catch(error) {
       console.log(error)
       res.status(400)
       res.json({error:"check inputs"})
   }
})

server.post("/login",async (req,res)=>{
    try{
        const user = await User.login(req.body)
        res.json({succes:true})
   } catch(error) {
       console.log(error)
       res.status(400)
       res.json({error:"check inputs"})
   }
})

// server.post("/message", async (req,res)=>{
//     try{
//         const user = await User.login(req.body)
//         if(user){
//             const message = await Message.newMessage({userid:user._id,message:req.body.message})
//         }
//         res.json({succes:true})
//    } catch(error) {
//        console.log(error)
//        res.status(400)
//        res.json({error:"check inputs"})
//    }
// })

// server.post("/message/user/:username/pass/:password", async (req,res)=>{
//     try{
//         const user = await User.login(req.params)
//         if(user){
//             const message = await Message.newMessage({userid:user._id,message:req.body.message})
//         }
//         res.json({succes:true})
//    } catch(error) {
//        console.log(error)
//        res.status(400)
//        res.json({error:"check inputs"})
//    }
// })

// server.post("/message", async (req,res)=>{
//     try{
//         const user = await User.login(req.query)
//         if(user){
//             const message = await Message.newMessage({userid:user._id,message:req.body.message})
//         }
//         res.json({succes:true})
//    } catch(error) {
//        console.log(error)
//        res.status(400)
//        res.json({error:"check inputs"})
//    }
// })

server.post("/message", async (req,res)=>{
    try{
        const username = req.header("username")
        const password = req.header("password")
        const user = await User.login({username:username,password:password})
        if(user){
            const message = await Message.newMessage({userid:user._id,message:req.body.message})
        }
        res.json({succes:true})
   } catch(error) {
       console.log(error)
       res.status(400)
       res.json({error:"check inputs"})
   }
})



server.post("/close",(req,res)=>{
    dbDisconnect()
    res.send("server disconnected")
})

server.listen(3000,()=>console.log("Server up at :http://localhost:3000"))