const express=require('express')
const router=express.Router()
const Faculty = require('./models/faculty.model');
router.get('/',(req,res)=>{
    res.send("hello")
})
router.post('/signup',(req,res)=>{
    const name = req.body.name;
    const faculty_id = req.body.faculty_id;
    const password=req.body.password;
    const department = req.body.department;
    const admin = req.body.admin;
    const hod = req.body.hod;

    const faculty = new Faculty({ "name": name, "faculty_id": faculty_id,"password":password, "department": department, "admin": admin, "HOD": hod });
    console.log(faculty);

    faculty.save()
        .then(() => res.json('faculty added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/signin',(req,res)=>{
   const{faculty_id,password}=req.body
   if(!faculty_id||!password){
       return res.status(422).json({error:"please add email or password"})
   }
   Faculty.findOne({faculty_id:faculty_id})
   .then(savedUser=>{
      if(!savedUser)
      return res.status(422).json({error:"Invalid Id or Password"})
      if(password===savedUser.password){
          res.json({message:"successfully"})}
          else{
              res.status(422).json({message:"Ok"})

          }
      }
   )
   .catch(err=>{
       console.log(err)
   })

   

    })
module.exports=router