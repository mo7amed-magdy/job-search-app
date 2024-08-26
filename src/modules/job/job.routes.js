import express from "express"
import { validation } from "../../middleware/validation.js";
import { allowedTo, auth } from "../../middleware/auth.js";
import { addApplicationSchemaVal, addJobSchemaVal, deleteSchemaVal, updateSchemaVal } from "./job.validation.js";
import { addApplication, addJob, allJobs, deleteJob, getAllJobs, updateJob } from "./job.controllers.js";
import { fileUpload } from "../../middleware/fileUpload.js";



const jobRouter = express.Router( {mergeParams:true})

jobRouter.post('/addjob', auth,validation(addJobSchemaVal),allowedTo('company_HR'), addJob)
jobRouter.post('/applytojob', validation(addApplicationSchemaVal),auth,allowedTo('user'), fileUpload('resume'),addApplication)
jobRouter.put('/updatejob/:jobId', auth,validation(updateSchemaVal),allowedTo('company_HR') ,updateJob)
jobRouter.delete('/deletejob/:jobId', auth,validation(deleteSchemaVal) ,deleteJob)
jobRouter.get('/', auth,allowedTo('company_HR','user'),getAllJobs)
jobRouter.get('/jobs', auth,allowedTo('company_HR','user'),allJobs)


export default jobRouter