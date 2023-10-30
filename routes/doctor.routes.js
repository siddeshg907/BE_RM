const express = require("express");
const { DoctorModel } = require("../model/doctor.model");
const { auth } = require("../middlewares/auth.middleware");

const doctorRouter = express.Router();

doctorRouter.use(auth)

doctorRouter.post("/appointments", async (req, res) => {
  try {
    const {
      name,
      imageURL,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    } = req.body;

    const newDoctor=new DoctorModel({
        name,
      imageURL,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    })

    await newDoctor.save()

    res.status(200).json(newDoctor)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
});


doctorRouter.get("/",async(req,res)=>{
    try {
        const appointments=await DoctorModel.find()

        res.status(200).json(appointments)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


doctorRouter.put("/update/:id",async (req,res)=>{
    try {
        const {name,imageURL,specialization,experience,location,date,slots,fee}=req.body
        const doctor=await DoctorModel.findByIdAndUpdate(
            req.params.id,
            {name,imageURL,specialization,experience,location,date,slots,fee},
            {new:true}
        )
        if(!doctor){
            return res.status(404).json({error:"Doctor not found"})
        }
        res.status(200).json(doctor)
    } catch (error) {
        res.status(500).json({error:"Failed to Update the doctor"})
    }
})

doctorRouter.delete("/delete/:id",async (req,res)=>{
    try {
        const doctor=await DoctorModel.findByIdAndRemove(
            req.params.id,
        )
        if(!doctor){
            return res.status(404).json({error:"Doctor not found"})
        }
        res.status(200).json()
    } catch (error) {
        res.status(500).json({error:"Failed to Delete the doctor"})
    }
})


doctorRouter.get("/",async (req,res)=>{
    try {
        const {specialization,sort,search}=req.query

        const filter=specialization?{specialization}:{}

        let sortOption={date:1}
        if(sort){
            if(sort==="date-asc"){
                sortOption={date:1}
            }else if(sort ==="date-desc"){
                sortOption={data:-1}
            }
        }

        let searchFilter={}

        if(search){
            searchFilter={name:new RegExp(search,"i")}
        }

        const doctors=await DoctorModel.find({...filter,...searchFilter}).sort(sortOption)
        res.status(200).json(doctors)
    } catch (error) {
        res.status(400).json({error:"Failed to load"})
    }
})

module.exports = {
    doctorRouter,
};
