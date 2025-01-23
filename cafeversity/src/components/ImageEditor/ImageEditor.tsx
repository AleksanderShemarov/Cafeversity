"use client";

import { useId, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import imgEditStyles from "./imgEditor.module.css";
import ImageContainer from "./ImageContainer";
import ImageEditButtons from "./ImageEditBtns";


interface ImageIditorTypes {
    photoEditorName: string,
    getImagePath: string | null,
    btnName1: string,
    btnName2: string,
    setImagePath: (
        imagePath: string,
    ) => void,
    setImageFileId: (
        imageFileId: string,
    ) => void,
    disabled?: boolean,
}

interface ImageEditorRef {
    photoServerSave: () => Promise<void>;
}

// eslint-disable-next-line react/display-name
const ImageEditor = forwardRef<ImageEditorRef, ImageIditorTypes>(({
    photoEditorName, getImagePath, btnName1, btnName2, setImagePath, setImageFileId, disabled
}, ref) => {

    const templatePhoto: string = "/uploads/tempUserImage.png";
    const [image, setImage] = useState<string|null>(getImagePath);
    const bool = image === templatePhoto;

    useEffect(() => {
        setImage(getImagePath);
    }, [getImagePath]);

    useEffect(() => {
        disabled && setImage(getImagePath);
    }, [disabled, getImagePath]);


    const [imageFile, setImageFile] = useState<File | null>(null);

    function photoSelect (event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            setImageFile(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
            setImagePath(event.target.files[0].name);
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
        if (imageFile !== null) {
            const imageFileFormData = new FormData();
            imageFileFormData.append("imageId", pictureId);
            imageFileFormData.append("imageFile", imageFile);

            const apiResponse = await fetch("http://localhost:3000/api/usersPhoto_route", {
                method: "POST",
                body: imageFileFormData,
            });

            const apiResult = await apiResponse.json();
            console.dir(apiResult.message);
            return apiResult.status;
        } else {
            console.dir("Your account photo is the common temporary User's image");
            return "Success";
        }
    }

    useImperativeHandle(ref, () => ({
        photoServerSave,
    }));

    // console.dir(image);
    // console.dir(imageFile);
    // console.dir(getImagePath);

    return (
        <>
            <p className={imgEditStyles.photo_edit_name}>{photoEditorName}</p>
            <div className={imgEditStyles.photo_workplace}>
                <ImageContainer img_path={image} />
                <ImageEditButtons
                    btnName1={btnName1}
                    btnName2={btnName2}
                    isTemplatePhoto={bool}
                    onChangeReplace={photoSelect}
                    onClickDelete={photoDelete}
                    disabled={disabled}
                />
            </div>
        </>
    )
})

export default ImageEditor;
