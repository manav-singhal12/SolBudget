import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({
    path:".env"
})

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath){
            return null;
        }
        const result=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto" //autodetect the type of file
        })
        fs.unlinkSync(localFilePath); // delete from system
        return result;
        
    } catch (error) {
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
}

export {uploadOnCloudinary}