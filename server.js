import "dotenv/config"
import exp from "express"
import {connect} from "mongoose"
import dns from "dns"
import { RagRouter } from "./rag routes/rag.routes.js" 

dns.setServers([
    '0.0.0.0',
    '1.1.1.1'
])

const app=exp()

let DB_URL=process.env.DB_URL
let PORT=process.env.PORT
//body parser middleware 
app.use(exp.json())
// db conncetion middleware
async function connectDB() {
    try{
       await connect(DB_URL)
       console.log("DB connected successfully")
       //start server
       app.listen(PORT,()=>console.log("server running "))
    }catch(err){
       console.log(" error in DB connection",err)
    }
}

connectDB()
// error handeling middleware
app.use("/rag-api",RagRouter)