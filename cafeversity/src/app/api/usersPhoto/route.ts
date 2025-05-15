import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "path";
// import { createWriteStream } from "node:fs";
// import { pipeline } from "node:stream/promises";


export const dynamic = "force-dynamic";


const MAX_FILE_SIZE = 10 * 1024 * 1024;// 10MB
// const ALLOWED_TYPES = [ "image/jpeg", "image/jpg", "image/png" ];


const POST = async (request: Request) => {
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    try {
        await fs.mkdir(uploadDir, { recursive: true });

        const formData = await request.formData();
        const photoFile = formData.get("imageFile") as File;
        const photoId = formData.get("imageId") as string;
  
        if (!photoFile || !photoId) {
            return NextResponse.json(
                { 
                    status: "Error", 
                    message: "Missing file or ID"
                },
                { status: 400 }
            );
        }

        if (photoFile.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { status: "Error", message: "File is more, than 10MB!" },
                { status: 400 }
            );
        }

        // if (!ALLOWED_TYPES.includes(photoFile.type)) {
        //     return NextResponse.json(
        //         { status: "Error", message: "Invalid file type!\nThere available types are: .jpeg, .jpg, .png" },
        //         { status: 400 }
        //     );
        // }


        const sanitizeId = (id: string) => id.replace(/[^a-zA-Z0-9_-]/g, '');
        const safePhotoId = sanitizeId(photoId);
  
        const originalName = photoFile.name || 'uploaded_file';
        const ext = path.extname(originalName);
        const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '');
        
        const fileName = `${baseName}_${safePhotoId}${ext}`;
        const filePath = path.join(uploadDir, fileName);


        const fileBuffer = await photoFile.arrayBuffer();
        await fs.writeFile(filePath, new Uint8Array(fileBuffer));

        // Threads for big files:
        // 
        // const fileStream = createWriteStream(filePath);
        // await pipeline(photoFile.stream(), fileStream);
  
        return NextResponse.json(
            {
                status: "Success",
                path: `/uploads/${fileName}`
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { 
                status: "Error", 
                message: "Internal server error"
            },
            { status: 500 }
        );
    }
};

export { POST };
