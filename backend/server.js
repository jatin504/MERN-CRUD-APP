const express = require('express')
const app = express()
require("dotenv").config()
const PORT = process.env.PORT||3000
const connectDB = require("./confing/connectDB")
const router = require("./router/router") /////////
const cors = require("cors")


app.use(express.json());

app.use(express.urlencoded({extended:true})) ////////////
app.use(cors())
app.use("/api",router)  ////////////

app.get("/",(req,res)=>{
    res.send("hello world")
})

const start=()=>{
    try{
        app.listen(PORT,()=>{
            connectDB()
            console.log(`server is running :http://localhost:${PORT}`)
        })
    }
    catch(err){
        console.log(err)
    }
}
start()