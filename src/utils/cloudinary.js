import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("Uploading file to Cloudinary:", localFilePath);
        if(!localFilePath) return null;
        // Upload the files in the cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been successfully uploaded in the cloudinary
        //console.log("File is uploaded successfully in the cloudinary", response.url);
        fs.unlinkSync(localFilePath); // remove the locally saved temporary files as the upload operaion is successful
        return response;
        
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        fs.unlinkSync(localFilePath); // remove the locally saved temporary files as the upload operaion got failed
        return null;
        
    }
}


export { uploadOnCloudinary}