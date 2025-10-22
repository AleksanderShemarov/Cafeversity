import HomeCafeManagerView from "@/app/components/CafeManager/HomePage/HomeView";
import prisma from "../../../../lib/utils/prismaClient";


type CafeProps = {
    ID: number,
    cafeName: string;
    openHours: string;
    city: string;
    street: string;
    country: string;
    phone: string;
    cafeImage: string;
    latitude: string | null;
    longitude: string | null;
    SRId: number;
}


export default async function HomeCafeManagerPage() {

    const cafe = await prisma.cafes.findUnique({ where: { ID: 1 } }) as CafeProps;

    return (
        <>
            {/* <h3 className="text-[2rem] font-bold underline">Main page of cafe&apos;s manager operations.</h3> */}
            <HomeCafeManagerView cafeName={cafe.cafeName} openHours={cafe.openHours}
                city={cafe.city} street={cafe.street} country={cafe.country} phone={cafe.phone} cafeImage={cafe.cafeImage}
                latitude={cafe.latitude ? cafe.latitude : "51.505"} longitude={cafe.longitude ? cafe.longitude : "-0.09"} srid={cafe.SRId}
            />
        </>
    );
}
