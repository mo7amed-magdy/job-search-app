


import express from "express"
import { validation } from "../../middleware/validation.js";
import { allowedTo, auth } from "../../middleware/auth.js";
import { addCompanySchemaVal, deleteSchemaVal, searchSchemaVal, updateSchemaVal } from "./company.validation.js";
import { addCompany, deleteCompany, getApplications, getCompanyData, searchCompany, updateCompany } from "./company.controllers.js";
import jobRouter from "../job/job.routes.js";


const companyRouter = express.Router()

companyRouter.use('/company/:companyname/jobs',jobRouter)

companyRouter.post('/addCompany', validation(addCompanySchemaVal),auth,allowedTo('company_HR'), addCompany)
companyRouter.put('/updateCompany/:compId', auth,validation(updateSchemaVal),allowedTo('company_HR') ,updateCompany)
companyRouter.delete('/deleteCompany/:compId', auth,validation(deleteSchemaVal) ,deleteCompany)
companyRouter.get('/getcompany/:compId', auth,allowedTo('company_HR'),validation(deleteSchemaVal) ,getCompanyData)
companyRouter.get('/searchcompany',auth,validation(searchSchemaVal),allowedTo('user','company_HR'),searchCompany)
companyRouter.get('/getapp/:companyId',auth,allowedTo('company_HR'),getApplications)

export default companyRouter