import multer from 'multer';
import { AppError } from '../utils/appError.js';


export const fileUpload = (fieldName) => {

    const storage = multer.diskStorage({})
     
      function fileFilter(req,file,cb){
        if(file.mimetype.startsWith('application/pdf')){
            cb(null,true)
        }else
        {
            cb(new AppError('pdf only'),false)
        }
      }
      
      const upload = multer({ storage,fileFilter })

      return upload.single(fieldName)

}