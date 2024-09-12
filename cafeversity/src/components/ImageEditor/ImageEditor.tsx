"use client";

import { useRef, useState } from "react";
import imgEditStyles from "./imgEditor.module.css";
import Image from "next/image";


export default function ImageEditor({ disabled }: { disabled?: boolean }) {

    const [image, setImage] = useState<string>("/uploads/tempUserImage.png");// useReducer might be here.
    const templatePhoto: string = "/uploads/tempUserImage.png";
    const bool = image === templatePhoto;

    const [imageFile, setImageFile] = useState<File | null>(null);

    function photoSelect (event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            setImageFile(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const photoDelete = () => {
        URL.revokeObjectURL(image);
        setImage("/uploads/tempUserImage.png");
        setImageFile(null);
    }

    async function photoServerSave() {
        if (imageFile !== null) {
            const imageFormData = new FormData();
            imageFormData.append("imageFile", imageFile);

            const apiResponse = await fetch("http://localhost:3000/api/usersPhoto_route", {
                method: "POST",
                body: imageFormData,
            });

            const apiResult = await apiResponse.json();
            console.dir(apiResult.message);
        } else {
            console.dir("Your account photo is the common temporary User's image");
        }
    }

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
}


type ImgCont = {
    img_path: string,
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
            <Image src={img_path} alt="template_of_user_photo" layout="fill"></Image>
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
