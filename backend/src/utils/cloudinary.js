import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })

        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        console.log('failed to upload on file pls try again');
        fs.unlinkSync(localFilePath)
        return error
    }
}

export { uploadOnCloudinary }