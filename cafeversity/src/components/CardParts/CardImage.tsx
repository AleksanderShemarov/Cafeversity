import Image from "next/image";
import { CSSProperties } from "react";


const CardImage = ({ imagePath, imageAlt = "", fill = false, width, height, style }: {
    imagePath: string,
    imageAlt?: string,
    fill?: boolean,
    width?: number,
    height?: number,
    style?: CSSProperties
}) => {
    return (
        <div style={{
            position: fill ? "relative" : "static",
            width: fill ? "100%" : width,
            height: fill ? "100%" : height,
            overflow: "hidden",
            ...style
        }}>
            <Image src={imagePath} alt={imageAlt}
                fill={fill}
                width={fill ? undefined : width}
                height={fill ? undefined : width}
                style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%"
                }}
                priority={false}
            />
        </div>
    )
}

export default CardImage;
