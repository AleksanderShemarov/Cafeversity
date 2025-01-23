"use client";

import { useRef } from "react";
import imgEditStyles from "./imgEditor.module.css";


type ImgEditBtns = {
    btnName1: string,
    btnName2: string,
    isTemplatePhoto?: boolean,
    onChangeReplace?: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void,
    onClickDelete?: (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => void,
    disabled?: boolean,
}


export default function ImageEditButtons({
    btnName1,
    btnName2,
    isTemplatePhoto,
    onChangeReplace,
    onClickDelete,
    disabled
}: ImgEditBtns) {

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
                {/* Change Photo */}
                {btnName1}
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
                        {/* Delete Photo */}
                        {btnName2}
                    </span>
            </button>
        </div>
    )
}
