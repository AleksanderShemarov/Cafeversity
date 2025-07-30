import Image from "next/image";
import imgEditStyles from "./imgEditor.module.css";
import { CSSProperties } from "react";


type ImgCont = {
    img_path: string|null,
    style?: CSSProperties
}


export default function ImageContainer({ img_path, style }: ImgCont) {
    return (
        <div className={imgEditStyles.photo_container} style={style}>
            <Image
                src={img_path === null ? "/uploads/tempUserImage.png" : img_path}
                alt={img_path === null ? "/uploads/tempUserImage.png" : img_path}
                layout="fill"
            ></Image>
        </div>
    )
}
