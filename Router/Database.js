let mongoose=require("mongoose")
require("dotenv").config();

let myfunction=async()=>{
    try{
      await mongoose.connect(process.env.MONGODBCONNECTION)
       console.log("connected to database successfully")
      
    }
    catch(err){
        console.log("something is went wrong plz check the url of database")
    }
}

module.exports=myfunction;