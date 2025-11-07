
let mongoose=require("mongoose");
let express=require("express")
let cors=require("cors")
require("dotenv").config();
let databaseconnection=require("./Router/Database")
let mainfunction=require("./Router/Routes")
let app=express();
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}));
const path = require("path");

app.use(express.static(path.join(__dirname, "./client/build")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
databaseconnection()
app.use("/",mainfunction)
app.listen(process.env.PORT,()=>{
    console.log(`server is running in the${process.env.PORT}port`)
});










   