import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import fs from "node:fs/promises";
import path from "path";
import { IncomingForm } from "formidable";
import type { File } from "formidable";


export const config = {
    api: {
        bodyParser: false,
    }
}

const UserMainPhotoServerSave: NextApiHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === "POST") {

        const formData = new IncomingForm();
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        try {
            await fs.access(uploadDir);
            console.log("Folder exists!");
        } catch (error) {
            await fs.mkdir(uploadDir, { recursive: true });
            console.log("Folder was not created and is created!");
        }

        formData.parse(request, async (err, fields, files) => {
            if (err) {
                return response.status(500).json({ status: "Error", message: `Error parsing form data: ${err}` });
            }

            const photoId = fields.imageId ? fields.imageId[0] as string : undefined;
            const photoFile = files.imageFile ? files.imageFile[0] as File : undefined;

            console.log("Request is passed. (UserMainPhotoServerSave)");
            console.dir(fields);
            console.dir(files);

            if (photoFile && photoId) {
                console.log("Condition is passed: OK");
                if (photoFile.filepath) {
                    console.log("Condition is passed: OK");

                    try {
                        // const arrayBuffer = Buffer.from(photoFile, "base64");
                        
                        //const arrayBuffer = await fs.readFile(photoFile.filepath);
                        // const buffer = new Uint8Array(arrayBuffer);
                        await fs.stat(photoFile.filepath);

                        let fileName = photoFile.originalFilename as string;
                        const fileNameArray = fileName.split("");
                        const sanitizedPhotoId = photoId.replace(/[^a-zA-Z0-9_]/g, '');
                        fileNameArray.splice(fileName.lastIndexOf("."), 0, `_${sanitizedPhotoId}`);
                        fileName = fileNameArray.join("");
                        const imageFilePath = path.join(uploadDir, fileName);
                        
                        // const imageFilePath = path.join(process.cwd(), `public/uploads`, fileName);
                        // const imageFilePath = path.join(process.cwd(), `public/uploads`, `${photoFile.originalFilename}_${photoId}`);
                        // console.log("imageFilePath is created!");

                        console.log(`File path: ${photoFile.filepath}`);
                        console.log(`Destination path: ${imageFilePath}`);

                        // await fs.writeFile(imageFilePath, Buffer.from(arrayBuffer));
                        // await fs.writeFile(imageFilePath, buffer);// await fs.writeFile(`./public/uploads/${imageFile.name}`, buffer);
                        
                        await fs.copyFile(photoFile.filepath, imageFilePath);
                        return response.status(200).json({ 
                            status: "Success",
                            message: `Your new account photo (${photoFile.originalFilename}) is saved on the server.`
                        });
                        // } catch (error) {
                        //     return response.status(500).json({ status: "Error", message: `Error of photo saving! Error: ${error}.` });
                        // }
                    } catch (readError) {
                        return response.status(500).json({ status: "Error", message: `Error reading file: ${readError}` });
                    }
            } else {
                return response.status(400).json({ status: "No Datum", message: "No file provided." });
            }
        }
    });
    } else {
        response.setHeader('Allow', ['POST']);
        response.status(405).end(`Method ${request.method} Not Allowed`);
    }
}

export default UserMainPhotoServerSave;
