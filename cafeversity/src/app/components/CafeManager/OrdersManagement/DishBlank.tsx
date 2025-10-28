import { IconCheck } from "@tabler/icons-react";
import CardImage from "@/components/CardParts/CardImage";
import CardTitle from "@/components/CardParts/CardTitle";


export default function DishBlank({ image, dishName, dishCost }: { image: string, dishName: string, dishCost: number }) {
    return (
        <div className="
            w-[98%] flex flex-row items-center
            my-[1.75rem] mx-auto p-[1.25rem]
            first:my-0 first:mt-[0.5rem] first:mb-[1.75rem]
            last:my-0 last:mt-[1.75rem] last:mb-[0.5rem]
            outline-1 outline-[lightgray] rounded-[0.75rem]
        ">
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
            <IconCheck className="w-[3rem] h-[3rem] rounded-[50%] text-gray-400 border-1 border-[lightgray] bg-gray-100" />
        </div>
    );
}
