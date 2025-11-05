let mongoose=require("mongoose")
let myfunction=async()=>{
    try{
      await mongoose.connect("mongodb+srv://bhavanarayanachukka:narayana123@cluster0.2ybtcaq.mongodb.net/MERN2506?retryWrites=true&w=majority&appName=Cluster0")
       console.log("connected to database successfully")
      
    }
    catch(err){
        console.log("something is went wrong plz check the url of database")
    }
}

module.exports=myfunction;