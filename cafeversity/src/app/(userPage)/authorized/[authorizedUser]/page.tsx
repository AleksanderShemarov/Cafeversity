import { use } from "react";
import LocalStorageStyles from "@/components/LocalStorage/LocalStorage";
import AuthorizedUserClient from "@/app/components/AuthorizedUserClient";


export type UserDataTypes = {
    firstName: string,
    lastName: string,
    nickName: string,
    userPhoto: string,
    email: string,
    customSets: {
        spicy: boolean,
        vegetarian: boolean,
        vegan: boolean,
        minCalory: number,
        maxCalory: number,
        pageTheme: "light"|"dark",
        brandColor: string,
        fontFamily: string,
        fontSize: string,
        fontVolume: string,
    },
    favouriteDish:
    {
        dishID: number, dishes: {
            food_name: string,
            imagePath: string,
            food_portion: number,
            cost: number,
        }
    }[]
}


async function fetchData(params: { authorizedUser: string; }) {
    const { authorizedUser } = params;
    console.log(params, authorizedUser);

    const response = await fetch(`http://localhost:3000/api/userData?name=${authorizedUser}`, { cache: "no-store" });
    const userData = await response.json();

    return userData;
}


export default function AuthorizedUser({ params }: { params: { authorizedUser: string } }) {
    
    const data: UserDataTypes = use(fetchData(params));

    // console.log("data -->", data);
    // console.log("data.favouriteDish AuthorizedUser -->", data.favouriteDish);

    return (
        <>
            <AuthorizedUserClient userData={data} />
            
            <LocalStorageStyles {...data.customSets} />
        </>
    )
}
