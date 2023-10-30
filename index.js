const express=require("express")
require("dotenv").config()
const cors=require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { doctorRouter } = require("./routes/doctor.routes")

const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).json({msg:"This is Home Page"})
})

app.use("/users",userRouter)
app.use("/doctors",doctorRouter)

app.listen(8080,async()=>{
    try{
        await connection
        console.log(`Connnected to the DB`)
        console.log(`server is running on port 8080`)
    }
    catch(error){
        console.log(error)
    }
})