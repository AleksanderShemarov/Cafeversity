"use client";

import { useRef, useState } from "react";
import imgEditStyles from "./imgEditor.module.css";
import Image from "next/image";


// function reducer(state, action) {
//     switch (action.type) {
//         case "new": {
//             return {};
//         }
//         case "old": {
//             return {};
//         }
//         case "default": {
//             return {};
//         }
//     }
//     throw new Error(`Unknown action: ${action.type}`);
// }

export default function ImageEditor() {

    const [image, setImage] = useState<string>("/uploads/tempUserImage.png");// useReducer must be here.
    const templatePhoto: string = "/uploads/tempUserImage.png";
    const bool = image === templatePhoto;

    // const [state, dispatch] = useReducer(reducer, { data: "Something..." });

    function photoSelect (event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const photoDelete = () => {
        URL.revokeObjectURL(image);
        setImage("/uploads/tempUserImage.png");
    }

    return (
        <>
            <div className={imgEditStyles.photo_editor}>
                <p className={imgEditStyles.photo_edit_name}>User Image Editor</p>
                <div className={imgEditStyles.photo_workplace}>
                    <ImageContainer img_path={image} />
                    <ImageEditButtons isTemplatePhoto={bool} onChangeReplace={photoSelect} onClickDelete={photoDelete} />
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
}

export function ImageContainer({ img_path }: ImgCont) {

    return (
        <div className={imgEditStyles.photo_container}>
            <Image src={img_path} alt="template_of_user_photo" width={300} height={300}></Image>
        </div>
    )
}

export function ImageEditButtons({ isTemplatePhoto, onChangeReplace, onClickDelete }: ImgEditBtns) {


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
                onClick={handleImageClick}>
                Change Photo
            </button>
            <button
                className={imgEditStyles.deleteBtn}
                style={isTemplatePhoto ? 
                {
                    background: "radial-gradient(orange 25% 35%, red 70%)",
                    pointerEvents: "none",
                } : 
                {}}
                onClick={onClickDelete}>
                    <span
                        className={imgEditStyles.deleteBtnText}
                        style={isTemplatePhoto ?
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
