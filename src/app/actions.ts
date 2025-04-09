"use server"

import { prisma } from "@/db";
import { File } from "buffer";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET,
});


export async function uploadFile(formData: FormData) {
    const file = formData.get("profile_image");
    if (file instanceof File) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log(cloudinary.config());
        console.log(process.env.CLOUD_API_SECRET);

        const Stream = cloudinary.uploader.upload_stream({resource_type: "image"}, async (error, result) => {
            if (error || !result) {
                throw new Error(error?.message || "No result found");
            }  
            await prisma.image.create({
                data: {
                    name: result.display_name,
                    url: result.secure_url,
                }
            })
        });

        streamifier.createReadStream(buffer).pipe(Stream);
    }
}
