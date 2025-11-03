
let mongoose=require("mongoose");
let express=require("express")
let cors=require("cors")
let jwt=require("jsonwebtoken")
let app=express();
app.use(cors())
const multer = require("multer");
const upload = multer();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.listen(2222,()=>{
    console.log("server is running in the 2222 port")
});

let userschema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    mobileNumber:Number
})
let usermodel=new mongoose.model("bhava",userschema,"mydetails")

app.post("/login",upload.none(),async(req,res)=>{
  let userobj= await usermodel.find().and([{email:req.body.email}]);

  if(userobj.length>0){
    if(userobj[0].password===req.body.password){
      let token=jwt.sign({email:req.body.email,password:req.body.password},"shhh")
       let datasend={
  firstName: userobj[0].firstName,
      lastName: userobj[0].lastName,
      email: userobj[0].email,
      mobileNumber:userobj[0].mobileNumber,
      token:token
 }
       res.json({status:"success",msg:"yours credentials are correct",data:datasend })
      
    }
    else{
      console.log("your credentials are wrong")
    }
  }
  else{
    res.json({status:404,msg:"yours credentials are wrong"})
    console.log("yours credentials or wrong")
  }
 
  
})
app.post("/loginvalidate",upload.none(),async(req,res)=>{
  let dycrpt=jwt.verify(req.body.token,"shhh")
  let userobj= await usermodel.find().and([{email:dycrpt.email}]);

  if(userobj.length>0){
    if(userobj[0].password===dycrpt.password){
     
       let datasend={
  firstName: userobj[0].firstName,
      lastName: userobj[0].lastName,
      email: userobj[0].email,
      mobileNumber:userobj[0].mobileNumber,
      
 }
       res.json({status:"success",msg:"yours credentials are correct",data:datasend })
      
    }
    else{
      console.log("your credentials are wrong")
    }
  }
  else{
    res.json({status:404,msg:"yours credentials are wrong"})
    console.log("yours credentials or wrong")
  }
 
  
})

app.post("/mydetails",upload.none(), async (req, res) => {
  try {
    let userobject = new usermodel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      mobileNumber: req.body.mobileNumber
    });
  if(req.body.firstName && req.body.lastName && req.body.email && req.body.password && req.body.mobileNumber){
  await userobject.save(); 
    console.log(" Data inserted successfully");

    res.json({ status: "success", msg: "Data inserted successfully" });
    
  }
  else{
    console.log("insert data fully")
  }
    
  } catch (err) {
    console.log(" Error inserting data:", err);
    res.status(500).json({ status: "error", msg: "Database insert failed" });
  }
});
app.patch("/mydetailsupdate",upload.none(), async (req, res) => {
  await usermodel.updateMany({email:req.body.email},{firstName:req.body.firstName})
  // await usermodel.updateMnany({email:req.body.email},{lastName:req.body.lastName})
  // await usermodel.updateMnany({email:req.body.email},{email:req.body.email})
  // await usermodel.updateMnany({email:req.body.email},{mobileNumber:req.body.mobileNumber})
  res.json({status:200,msg:"succesfully updated"})
});
app.delete("/deletereq",upload.none(),async(req,res)=>{
  console.log(req.body)
let delres=  await usermodel.deleteOne({email:req.body.email})
  if(delres.deletedCount>0){
  res.json({status:200,msg:"sucessfully deleted"})
  }
  else{
    res.json({status:500,msg:"server issues is rasied"})
  }
})





let myfunction=async()=>{
    try{
      await mongoose.connect("mongodb+srv://bhavanarayanachukka:narayana123@cluster0.2ybtcaq.mongodb.net/MERN2506?retryWrites=true&w=majority&appName=Cluster0")
       console.log("connected to database successfully")
      
    }
    catch(err){
        console.log("something is went wrong plz check the url of database")
    }
}
myfunction()
   