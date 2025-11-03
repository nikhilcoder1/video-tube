import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

console.log("Cloudinary ENV check =>", {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET ? "✅ Exists" : "❌ Missing"
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null; 
        const response = await cloudinary.uploader.upload(
            localFilePath, { 
                resource_type: "auto",
            }
        );  
        console.log("File uploaded to Cloudinary:", response.url);
        // Delete the local file after upload
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        fs.unlinkSync(localFilePath);
        return null;
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        console.log("Deleted from Cloudinary:", result);
    }
    catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        return null;
    }
};

export { uploadOnCloudinary , deleteFromCloudinary };