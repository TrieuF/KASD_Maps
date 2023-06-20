import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_key,
    api_secret: process.env.cloudinary_secret
};
cloudinary.config(credentials);

export const imageStore = {

    uploadImage: async function(imagefile) {
        writeFileSync("./public/temp.img", imagefile);
        const response = await cloudinary.v2.uploader.upload("./public/temp.img");
        return response.url;
    },

    deleteImage: async function(img) {
        const shorturl = img.slice(0, -4);
        const words = shorturl.split("/")
        const public_id = words.pop();
        await cloudinary.v2.uploader.destroy(public_id, {});
    }
};
