let express =require("express")

let jwt =require("jsonwebtoken")
let bcrypt=require("bcrypt")
let routers=express.Router();
const multer = require("multer");
const upload = multer();
const usermodel=require("../Router/Module")



routers.post("/login",upload.none(),async(req,res)=>{//from this we creating an webtoken the token was creates successfully
  let userobj= await usermodel.find().and([{email:req.body.email}]);
  console.log(userobj)
  let matched=await  bcrypt.compare(req.body.password,userobj[0].password)//here we can compare the bcrypt password with the real password
  if(userobj.length>0){
    if(matched){
      let token=jwt.sign({email:req.body.email,password:req.body.password},"shhh")//here token was genrated
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
routers.post("/loginvalidate",upload.none(),async(req,res)=>{//in this we are dycrpting the webtokens 
  let dycrpt=jwt.verify(req.body.token,"shhh")
  let userobj= await usermodel.find().and([{email:dycrpt.email}]);//here we can dcrypt the email and password than we can create a autologinfunctinality

  if(userobj.length>0){
    if(userobj[0].password===dycrpt.password){
     
       let datasend={
  firstName: userobj[0].firstName,
      lastName: userobj[0].lastName,
      email: userobj[0].email,
      password:userobj[0].password,
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

routers.post("/mydetails",upload.none(), async (req, res) => {//signup and instering data to  database 
  let passordsecurity=req.body.password
  let hassedpassword= bcrypt.hash(passordsecurity,10)// we are creating security for password that stored in tha database
  try {
    let userobject = new usermodel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hassedpassword,
      mobileNumber: req.body.mobileNumber
    });
    console.log(userobject)
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
routers.patch("/mydetailsupdate",upload.none(), async (req, res) => {//if we want update any name or portion we are creating an edit profile
  await usermodel.updateMany({email:req.body.email},{firstName:req.body.firstName})
  await usermodel.updateMany({email:req.body.email},{lastName:req.body.lastName})
  await usermodel.updateMany({email:req.body.email},{mobileNumber:req.body.mobileNumber})
  res.json({status:200,msg:"succesfully updated"})
});
routers.delete("/deletereq",upload.none(),async(req,res)=>{// if we want delet an account for that we are using this
  console.log(req.body)
let delres=  await usermodel.deleteOne({email:req.body.email})
  if(delres.deletedCount>0){
  res.json({status:200,msg:"sucessfully deleted"})
  }
  else{
    res.json({status:500,msg:"server issues is rasied"})
  }
})
module.exports=routers