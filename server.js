
let mongoose=require("mongoose");
let express=require("express")
let cors=require("cors")
require("dotenv").config();
let databaseconnection=require("./Router/Database")
let mainfunction=require("./Router/Routes")
let app=express();
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))


databaseconnection()
app.use("/",mainfunction)
app.listen(process.env.PORT,()=>{
    console.log(`server is running in the${process.env.PORT}port`)
});










   