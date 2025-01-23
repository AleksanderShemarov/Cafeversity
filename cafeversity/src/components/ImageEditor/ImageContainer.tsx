import Image from "next/image";
import imgEditStyles from "./imgEditor.module.css";


type ImgCont = {
    img_path: string|null,
}


export default function ImageContainer({ img_path }: ImgCont) {
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
