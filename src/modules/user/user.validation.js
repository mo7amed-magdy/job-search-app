import Joi from "joi"




const signupSchemaVal = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    userName: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    recoveryEmail: Joi.string().email(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),
    DOB: Joi.string().regex(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/),
    mobileNumber: Joi.string().pattern(/^01[0-25]\d{8}$/),
    role:Joi.string()
})


const signinSchemaVal = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    mobileNumber: Joi.string().pattern(/^01[0-25]\d{8}$/),
})
const updateSchemaVal = Joi.object({
    firstName: Joi.string().min(2).max(20),
    lastName: Joi.string().min(2).max(20),
    email: Joi.string().email(),
    recoveryEmail: Joi.string().email(),
    DOB: Joi.string().regex(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/),
    mobileNumber: Joi.string().pattern(/^01[0-25]\d{8}$/),
    id:Joi.string()
})
const deleteSchemaVal = Joi.object({
    id:Joi.string()
})
const updatePassSchemaVal = Joi.object({
    password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    newPassword: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    id:Joi.string()

})

export {
    signupSchemaVal,
    signinSchemaVal,
    updateSchemaVal,
    deleteSchemaVal,
    updatePassSchemaVal
}