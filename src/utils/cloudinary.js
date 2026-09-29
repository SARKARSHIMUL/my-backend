import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // Upload the files in the cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been successfully uploaded in the cloudinary
        console.log("File is uploaded successfully in the cloudinary", response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temporary files as the upload operaion got failed
        return null;
        
    }
}


export { uploadOnCloudinary}