import CardImage from "@/components/CardParts/CardImage";
import CardTitle from "@/components/CardParts/CardTitle";


export default function CafeDishBlank({
    dishImage, dishName, dishPortion, dishCost, dishType
}: {
    dishImage: string, dishName: string, dishPortion: number, dishCost: number, dishType: number
}) {
    return (
        <div className="
            p-[2rem] mx-[1rem] my-[0.5rem]
            first:mx-0 first:ml-[0.5rem] first:mr-[1rem]
            last:mx-0 last:ml-[1rem] last:mr-[0.5rem]
            outline-1 outline-[lightgray] rounded-[1.75rem]
            snap-center
        ">
            <CardImage imagePath={dishImage} imageAlt={dishImage.substring(dishImage.lastIndexOf("/") + 1)}
                width={550}
                height={450}
                style={{ borderRadius: "1.75rem" }}
            />
            <CardTitle title={dishName} style={{}} className="pt-[0.5rem] text-[1.6rem] font-bold text-left" />
            <div className="w-[100%] py-[0.25rem] inline-flex items-center">
                <p className="grow text-[1.4rem] text-left font-normal m-0 p-0">{dishPortion}{dishType === 6 ? "ml" : "g"}</p>
                <p className="grow text-[1.4rem] text-right font-normal m-0 p-0">{dishCost} BYN</p>
            </div>
        </div>
    );
}
