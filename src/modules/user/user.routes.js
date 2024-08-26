


import express from "express"
import { deleteUser, forgetPassword, getProfileData, getSameRecovery, getUserData, resetPassword, signin, signup, updatePassword, updateUser } from "./user.controllers.js"
import { deleteSchemaVal, signinSchemaVal, signupSchemaVal, updatePassSchemaVal, updateSchemaVal } from "./user.validation.js"
import { hashPassword } from "../../middleware/hashPassword.js";
import { validation } from "../../middleware/validation.js";
import { chekEmailExist } from '../../middleware/chekEmailExist.js';
import { allowedTo, auth } from "../../middleware/auth.js";


const userRouter = express.Router()

userRouter.post('/signup', validation(signupSchemaVal),chekEmailExist,hashPassword, signup)
userRouter.post('/signin', validation(signinSchemaVal) ,signin)
userRouter.put('/updateuser/:id', auth,validation(updateSchemaVal) ,updateUser)
userRouter.delete('/deleteuser/:id', auth,validation(deleteSchemaVal) ,deleteUser)
userRouter.get('/getuser/:id', auth,allowedTo('company_HR','user'),validation(deleteSchemaVal) ,getUserData)
userRouter.get('/getprofile/:id',getProfileData)
userRouter.put('/updatepass/:id',auth,validation(updatePassSchemaVal),updatePassword)
userRouter.post('/forgetPassword', forgetPassword);
userRouter.post('/resetPassword',auth, resetPassword);
userRouter.get('/getSameRecovery', getSameRecovery);

export default userRouter