import GridBlock from "../../GridBlock";
import Image from "next/image";


export default function HomeCafeManagerView({
    cafeName, openHours, city, street, country, phone,
    cafeImage, latitude, longitude, srid
}: {
    cafeName: string, openHours: string, city: string, street: string, country: string, phone: string,
    cafeImage: string, latitude: string | null, longitude: string | null, srid: number
}) {
    const [workdays, saturday] = openHours.split("\\n");

    return (
        <div className="grid grid-cols-2 grid-rows-3 h-[85dvh] ml-[10rem] mr-[10rem]">
            <GridBlock column="1/3" row={1} style={{
                boxShadow: "none", borderRadius: "none", padding: 0,
                borderTopLeftRadius: "1.5rem", borderTopRightRadius: "1.5rem",
                border: "2px solid",
            }}>
                <div className="p-[2rem] text-[2rem]">
                    <p className="text-[4rem] text-right font-semibold underline mb-[0.75rem]">{cafeName}</p>
                    <p className="text-[2.75rem] text-right font-medium mt-[0.75rem] mb-[0.75rem]">
                        {workdays}<br />{saturday}
                    </p>
                    <p className="text-right text-balance font-light mt-[0.75rem] mb-[0.75rem]">
                        г. {city}, вул. {street} ({country})
                    </p>
                    <p className="text-right font-light mt-[0.75rem]">Тэл.: {phone}</p>
                </div>
            </GridBlock>

            <GridBlock column={1} row={"2/4"} style={{
                boxShadow: "none", borderRadius: "none", padding: "1rem",
                borderBottomLeftRadius: "1.5rem",
                border: "2px solid", borderTop: "none",
            }}>
                <p className="text-[2rem]">Latitude: {latitude !== null ? latitude.toString() : "no data"}</p>
                <p className="text-[2rem]">Longitude: {longitude !== null ? longitude.toString() : "no data"}</p>
                <p className="text-[2rem]">SRId: {srid}</p>
            </GridBlock>

            <GridBlock column={2} row={"2/4"} style={{
                boxShadow: "none", borderRadius: "none", padding: 0, overflow: "hidden",
                borderBottomRightRadius: "1.5rem",
                border: "2px solid", borderTop: "none", borderLeft: "none",
            }}>
                {/* <div className="text-[2rem]">Малюнак кафэ (сталоўкі)</div> */}
                <div className="h-[100%] w-[100%] relative">
                    <Image src={cafeImage} alt={`${cafeImage.substring(cafeImage.lastIndexOf("/") + 1)}`}
                        fill
                        style={{ objectFit: "contain" }}
                    ></Image>
                </div>
            </GridBlock>
        </div>
    );
}
