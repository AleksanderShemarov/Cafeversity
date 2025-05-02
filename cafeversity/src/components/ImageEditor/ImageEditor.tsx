"use client";

import { useId, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import imgEditStyles from "./imgEditor.module.css";
import ImageContainer from "./ImageContainer";
import ImageEditButtons from "./ImageEditBtns";
import { useTranslations } from "next-intl";


interface ImageIditorTypes {
    getImagePath: string | null,
    setImagePath: (imagePath: string) => void,
    setImageFileId: (imageFileId: string) => void,
    disabled?: boolean,
    translate?: string,
}

interface ImageEditorRef {
    photoServerSave: () => Promise<{ status: string, path: string|null }>;
}

// eslint-disable-next-line react/display-name
const ImageEditor = forwardRef<ImageEditorRef, ImageIditorTypes>(
    ({ 
        getImagePath, setImagePath, setImageFileId, disabled, translate = "SettingsPage"
    }, ref) => {
        const templatePhoto: string = "/uploads/tempUserImage.png";
        const [image, setImage] = useState<string|null>(getImagePath);
        const bool = image === templatePhoto;

        const [imageFile, setImageFile] = useState<File | null>(null);

        function photoSelect (event: React.ChangeEvent<HTMLInputElement>) {
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0];
                const tempURL = URL.createObjectURL(file);

                setImageFile(file);
                setImage(tempURL);
                setImagePath(file.name);

                return () => URL.revokeObjectURL(tempURL);
            }
        }

        const photoDelete = () => {
            if (image !== null && getImagePath !== null && image === getImagePath) {
                setImageFile(null);
                setImage("/uploads/tempUserImage.png");
                setImagePath("/uploads/tempUserImage.png");
            } else if (image !== null && getImagePath !== null && image !== getImagePath) {
                URL.revokeObjectURL(image);
                setImageFile(null);
                setImage("/uploads/tempUserImage.png");
                setImagePath("/uploads/tempUserImage.png");
            } else if (image !== null && getImagePath !== null) {
                URL.revokeObjectURL(image);
                setImageFile(null);
                setImage(getImagePath);
                setImagePath(getImagePath);
            } else if (image !== null) {
                URL.revokeObjectURL(image);
                setImageFile(null);
                setImage("/uploads/tempUserImage.png");
                setImagePath("/uploads/tempUserImage.png");
            } else {
                setImageFile(null);
                setImage("/uploads/tempUserImage.png");
                setImagePath("/uploads/tempUserImage.png");
            }
        }


        const pictureId = useId();
        useEffect(() => {
            setImageFileId(pictureId);
        }, [pictureId, setImageFileId]);


        async function photoServerSave() {
            console.log("photoServerSave imageFile ->", imageFile);
            console.log("photoServerSave image ->", image);
            console.log("photoServerSave getImagePath ->", getImagePath);

            if (imageFile !== null) {
                const imageFileFormData = new FormData();
                imageFileFormData.append("imageId", pictureId);
                imageFileFormData.append("imageFile", imageFile);

                const apiResponse = await fetch("http://localhost:3000/api/usersPhoto_route", {
                    method: "POST",
                    body: imageFileFormData,
                });

                const apiResult = await apiResponse.json();
                console.dir(apiResult.path);
                return apiResult;
            }
            else if (imageFile === null && image !== null) {
                console.dir("System has left your prevoius photo");
                return { status: "Success", path: image };
            }
            else {
                console.dir("Your account photo is the common temporary User's image");
                return { status: "Success", path: null };
            }
        }

        useImperativeHandle(ref, () => ({
            photoServerSave,
        }));

        const t = useTranslations(translate);

        return (
            <div className={imgEditStyles.photo_workplace}>
                <ImageContainer img_path={image} />
                <ImageEditButtons
                    btnName1={t("firstSetsPart.photoEditor.changePhotoButton")}
                    btnName2={t("firstSetsPart.photoEditor.deletePhotoButton")}
                    isTemplatePhoto={bool}
                    onChangeReplace={photoSelect}
                    onClickDelete={photoDelete}
                    disabled={disabled}
                />
            </div>
        )
    }
)

export default ImageEditor;
