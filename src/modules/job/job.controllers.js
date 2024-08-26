import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { companyModel } from "../../../databases/models/company.model.js";
import { jobModel } from "../../../databases/models/job.model.js";
import { applicationModel } from "../../../databases/models/application.model.js";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'didtiaqgl', 
  api_key: '347577137761927', 
  api_secret: 'Ks5KnSxuYq-rpPOsVPg-299771U' 
});
const addJob = catchError(async (req, res, next) => {
  req.body.addedBy = req.user._id;
  await jobModel.insertMany(req.body);
  res.json({ message: "success" });
});


const addApplication = catchError(async (req, res, next) => {
  req.body.userId = req.user._id;
  req.body.userTechSkills=JSON.parse(req.body.userTechSkills)
  req.body.userSoftSkills=JSON.parse(req.body.userSoftSkills)
  cloudinary.uploader.upload(req.file.path,
    async (error, result) => {
        req.body.userResume = result.secure_url
        await applicationModel.insertMany(req.body)
    });
  res.json({ message: "success" });
});

const updateJob = catchError(async (req, res, next) => {
  let job = await jobModel.findById(req.params.jobId);
  if (!job) return next(new AppError("job not found"));
  if (req.user._id !== job.addedBy.valueOf()) {
    return next(new AppError("You are not the owner of this job", 401));
  }

  await jobModel.findByIdAndUpdate(
    req.params.jobId,
    {
      $set: {
        jobTitle: req.body.jobTitle,
        jobLocation: req.body.jobLocation,
        workingTime: req.body.workingTime,
        seniorityLevel: req.body.seniorityLevel,
        jobDescription: req.body.jobDescription,
        technicalSkills: req.body.technicalSkills,
        softSkills: req.body.softSkills,
      },
    },
    { new: true }
  );
  res.json({ message: "job updated successfully" });
});

const deleteJob = catchError(async (req, res, next) => {
  let job = await jobModel.findById(req.params.jobId);
  if (!job) return next(new AppError("job not found"));
  if (req.user._id !== job.addedBy.valueOf()) {
    return next(new AppError("You are not the owner of this job", 401));
  }
  await jobModel.findByIdAndDelete(req.params.jobId);
  res.json({ message: "job deleted successfully" });
});

const getAllJobs = catchError(async (req,res,next) =>{
  let filterObj = {};
  if (req.params.companyname){
    let company = await companyModel.findOne({companyName:req.params.companyname});
    if (!company) return next(new AppError("company not found"));
    filterObj= {company:company._id}
  }
  let jobs = await jobModel.find(filterObj)
  if (!jobs) return next(new AppError("jobs not found"));
  res.json({message:"success",jobs})
})
const allJobs = catchError(async (req,res,next) =>{
  if(req.query){
    var filterObj = {...req.query};
  }
  let jobs = await jobModel.find(filterObj).populate('company')
  if (!jobs) return next(new AppError("jobs not found"));
  res.json({message:"success",jobs})
})



export {
  addJob,
  updateJob,
  deleteJob,
  getAllJobs,
  allJobs,
  addApplication
};
