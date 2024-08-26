import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { companyModel } from "./../../../databases/models/company.model.js";
import { jobModel } from "../../../databases/models/job.model.js";
import { applicationModel } from './../../../databases/models/application.model.js';

const addCompany = catchError(async (req, res, next) => {
  if(req.body.companyHR != req.user._id) return next(new AppError("you must add your own company"))
  let company = await companyModel.findOne({companyHR:req.body.companyHR})
  if (company) return next(new AppError("you can not have another company"))
  await companyModel.insertMany(req.body);
  res.json({ message: "success" });
});

const updateCompany = catchError(async (req, res, next) => {
  let company = await companyModel.findById(req.params.compId);
  if (!company) return next(new AppError("company not found"));
  if (req.user._id !== company.companyHR.valueOf()) {
    return next(new AppError("You are not the owner of this company", 401));
  }
  const conflictingCompany = await companyModel.findOne({
    $or: [
      { companyEmail: req.body.companyEmail },
      { companyName: req.body.companyName },
    ],
  });
  if (conflictingCompany) {
    return next(new AppError("Conflict: Email or Name  already in use", 409));
  }
  await companyModel.findByIdAndUpdate(
    req.params.compId,
    {
      $set: {
        companyName: req.body.companyName,
        description: req.body.description,
        industry: req.body.industry,
        address: req.body.address,
        numberOfEmployees: req.body.numberOfEmployees,
        companyEmail: req.body.companyEmail,
      },
    },
    { new: true }
  );
  res.json({ message: "company updated successfully" });
});

const deleteCompany = catchError(async (req, res, next) => {
  let company = await companyModel.findById(req.params.compId);
  if (!company) return next(new AppError("company not found"));
  if (req.user._id !== company.companyHR.valueOf()) {
    return next(new AppError("You are not the owner of this company", 401));
  }
  await companyModel.findByIdAndDelete(req.params.compId);
  res.json({ message: "company deleted successfully" });
});

const getCompanyData = catchError(async (req, res, next) => {
  let company = await companyModel.findById(req.params.compId);
  if (!company) return next(new AppError("company not found"));
  let jobs = await jobModel.find({company:company._id})
  res.json({ message: "success", company,jobs });
});

const searchCompany = catchError(async (req, res, next) => {
  const company = await companyModel.findOne({
    companyName: req.body.companyName,
  });
  if (!company) return next(new AppError("company not found"));
  res.json({ message: "success", company });
});
const getApplications = catchError(async (req, res, next) => {
  const applications = await applicationModel.find({
    companyId: req.params.companyId,
  });
  if (!applications) return next(new AppError("applications not found"));
  res.json({ message: "success", applications });
});


export {
  addCompany,
  updateCompany,
  deleteCompany,
  getCompanyData,
  searchCompany,
  getApplications

};
