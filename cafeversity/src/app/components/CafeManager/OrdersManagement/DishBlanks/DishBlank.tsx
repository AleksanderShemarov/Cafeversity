import {
    IconChecks,
    IconExclamationMark
} from "@tabler/icons-react";
import CardImage from "@/components/CardParts/CardImage";
import CardTitle from "@/components/CardParts/CardTitle";
import { MouseEventHandler } from "react";


export default function DishBlank({
    image, dishName, dishCost, dishReady,
    onDishBlankClick, optionalStyle = ""
}: {
    image: string, dishName: string, dishCost: number, dishReady: boolean,
    onDishBlankClick?: MouseEventHandler<HTMLDivElement>, optionalStyle?: string
}) {
    return (
        <div
            className={`
                w-[98%] flex flex-row items-center
                my-[1.75rem] mx-auto p-[1.25rem]
                first:my-0 first:mt-[0.5rem] first:mb-[1.75rem]
                last:my-0 last:mt-[1.75rem] last:mb-[0.5rem]
                rounded-[0.75rem]
                ${optionalStyle}
            `}
            onClick={onDishBlankClick}
        >
            <CardImage imagePath={image} imageAlt={image.substring(image.lastIndexOf("/") + 1)}
                width={75}
                height={75}
                style={{ borderRadius: "0.75rem" }}
            />
            <div className="px-[1rem] grow">
                <CardTitle title={dishName} style={{}} className="text-[1.8rem] text-left font-bold m-0 p-0" />
                <p className="text-[1.6rem] text-left text-gray-400 font-medium m-0 p-0">
                    ({dishCost.toFixed(2)} BYN) x 1
                </p>
            </div>
            {
                dishReady
                ? <IconChecks className="w-[3rem] h-[3rem] rounded-[50%] text-green-500 border-1 border-[lightgray] bg-green-200" />
                : <IconExclamationMark className="w-[3rem] h-[3rem] rounded-[50%] text-gray-400 border-1 border-[lightgray] bg-gray-100" />
            }
        </div>
    );
}
