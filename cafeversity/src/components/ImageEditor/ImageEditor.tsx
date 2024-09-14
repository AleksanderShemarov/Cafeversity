/* eslint-disable react/display-name */
"use client";

import { useId, useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import imgEditStyles from "./imgEditor.module.css";
import Image from "next/image";


interface ImageIditorTypes {
    getImagePath: string | null,
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

const ImageEditor = forwardRef<ImageEditorRef, ImageIditorTypes>(({ getImagePath, setImagePath, setImageFileId, disabled }, ref) => {

    const templatePhoto: string = "/uploads/tempUserImage.png";
    const [image, setImage] = useState<string|null>(getImagePath);
    const bool = image === templatePhoto;

    useEffect(() => {
        setImage(getImagePath);
    }, [getImagePath]);


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
        // if (image !== null) {
        //     URL.revokeObjectURL(image);
        //     setImageFile(null);
        //     setImage("/uploads/tempUserImage.png");
        //     setImagePath("/uploads/tempUserImage.png");
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

    console.dir(image);
    console.dir(imageFile);
    console.dir(getImagePath);

    return (
        <>
            <div className={imgEditStyles.photo_editor}>
                <p className={imgEditStyles.photo_edit_name}>User Image Editor</p>
                <div className={imgEditStyles.photo_workplace}>
                    <ImageContainer img_path={image} />
                    <ImageEditButtons
                        isTemplatePhoto={bool}
                        onChangeReplace={photoSelect}
                        onClickDelete={photoDelete}
                        disabled={disabled}
                    />
                </div>
            </div>
        </>
    )
})

export default ImageEditor;


type ImgCont = {
    img_path: string|null,
}

type ImgEditBtns = {
    isTemplatePhoto?: boolean,
    onChangeReplace?: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void,
    onClickDelete?: (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => void,
    disabled?: boolean,
}

export function ImageContainer({ img_path }: ImgCont) {

    return (
        <div className={imgEditStyles.photo_container}>
            <Image
                src={img_path === null ? "/uploads/tempUserImage.png" : img_path}
                alt={img_path === null ? "/uploads/tempUserImage.png" : img_path}
                layout="fill"
            ></Image>
        </div>
    )
}

export function ImageEditButtons({ isTemplatePhoto, onChangeReplace, onClickDelete, disabled }: ImgEditBtns) {


    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    return (
        <div className={imgEditStyles.photo_edit_buttons}>
            <input type="file" onChange={onChangeReplace} ref={inputRef} style={{ display: "none" }}/>
            <button
                className={imgEditStyles.changeBtn}
                onClick={handleImageClick}
                disabled={disabled}
                style={disabled ?
                {
                    backgroundColor: "lightgray",
                    color: "gray",
                    pointerEvents: "none",
                } : {}
                }
            >
                Change Photo
            </button>
            <button
                className={imgEditStyles.deleteBtn}
                disabled={disabled}
                style={disabled ?
                {
                    background: "lightgray",
                    pointerEvents: "none",
                } : isTemplatePhoto ? 
                {
                    background: "radial-gradient(orange 25% 35%, red 70%)",
                    pointerEvents: "none",
                } : {}
            }
                onClick={onClickDelete}>
                    <span
                        className={imgEditStyles.deleteBtnText}
                        style={disabled ? 
                        {
                            background: "none",
                            color: "gray",
                        } :
                        isTemplatePhoto ?
                        {
                            backgroundColor: "white",
                            backgroundImage: "linear-gradient(90deg, white 5%, lightgray 20% 80%, white 95%)",
                            backgroundSize: "100%",
                            backgroundRepeat: "repeat",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        } :
                    {}}>
                        Delete Photo
                    </span>
            </button>
        </div>
    )
}
