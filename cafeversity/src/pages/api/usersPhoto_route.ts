import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import fs from "node:fs/promises";
import path from "path";
import { IncomingForm } from "formidable";

export const config = {
    api: {
        bodyParser: false,
    }
}


const UserMainPhotoServerSave: NextApiHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method !== "POST") {
        response.setHeader('Allow', ['POST']);
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }
  
    const formData = new IncomingForm();
    const uploadDir = path.join(process.cwd(), 'public/uploads');
  
    try {
        await fs.mkdir(uploadDir, { recursive: true });


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
            formData.parse(request, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });


        const photoFile = files.imageFile?.[0];
        const photoId = fields.imageId?.[0];
  
        if (!photoFile || !photoId) {
            return response.status(400).json({ 
                status: "Error", 
                message: "Missing file or ID" 
            });
        }


        const sanitizeId = (id: string) => id.replace(/[^a-zA-Z0-9_-]/g, '');
        const safePhotoId = sanitizeId(photoId);
  
        const originalName = photoFile.originalFilename || 'uploaded_file';
        const ext = path.extname(originalName);
        const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '');
        const fileName = `${baseName}_${safePhotoId}${ext}`;
        const filePath = path.join(uploadDir, fileName);
  
        
        try {
            await fs.access(photoFile.filepath);
        } catch {
            return response.status(400).json({ 
                status: "Error", 
                message: "Temp file not found" 
            });
        }
  

        await fs.copyFile(photoFile.filepath, filePath);
      

        try {
            await fs.unlink(photoFile.filepath);
        } catch (unlinkError) {
            console.warn("Failed to delete temp file:", unlinkError);
        }
  
        return response.status(200).json({
            status: "Success",
            path: `/uploads/${fileName}`
        });
    } catch (error) {
        console.error("Upload error:", error);
        return response.status(500).json({ 
            status: "Error", 
            message: "Internal server error" 
        });
    }
};


export default UserMainPhotoServerSave;
