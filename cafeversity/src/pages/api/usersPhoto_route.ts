import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import fs from "node:fs/promises";
import path from "path";


const UserMainPhotoServerSave: NextApiHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === "POST") {
        const photoFile: File = request.body.imageFile;
    
        if (photoFile) {
            // const arrayBuffer = Buffer.from(photoFile, "base64");
            const arrayBuffer = await photoFile.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const imageFilePath = path.join(process.cwd(), `public/uploads`, photoFile.name);

            try {
                // await fs.writeFile(imageFilePath, Buffer.from(arrayBuffer));
                await fs.writeFile(imageFilePath, buffer);// await fs.writeFile(`./public/uploads/${imageFile.name}`, buffer);
                return response.status(200).json({ 
                    message: `Your new account photo (${photoFile.name}) is saved on the server.`
                });
            } catch (error) {
                return response.status(500).json({ message: `Error of photo saving! Error: ${error}.` });
            }
        } else {
            return response.status(400).json({ message: "No file provided" });
        }
    } else {
        response.setHeader('Allow', ['POST']);
        response.status(405).end(`Method ${request.method} Not Allowed`);
    }
}

export default UserMainPhotoServerSave;
