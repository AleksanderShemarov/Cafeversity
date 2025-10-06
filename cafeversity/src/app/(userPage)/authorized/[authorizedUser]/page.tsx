import { use } from "react";
import LocalStorageStyles from "@/components/LocalStorage/LocalStorage";
import AuthorizedUserClient from "@/app/components/AuthorizedUserClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import dishesBySets from "@/app/actions/dishesBySets";


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
            checkedDish: null
        }
    }[]
}


export type DishProps = {
    dishID: number, dishes: {
        food_name: string,
        imagePath: string,
        food_portion: number,
        cost: number,
        checkedDish: null
    }
}


async function fetchData(params: { authorizedUser: string; }) {
    const { authorizedUser } = params;
    console.log(params, authorizedUser);

    const response = await fetch(`http://localhost:3000/api/userData?name=${authorizedUser}`, { cache: "no-store" });
    const userData = await response.json();

    return userData;
}


async function dishesFetchData(params: { authorizedUser: string; }) {
    const { authorizedUser } = params;
    
    const dishesByUserSets = await dishesBySets(authorizedUser);

    return dishesByUserSets;
}


export default function AuthorizedUser({ params }: { params: { authorizedUser: string } }) {
    
    const data: UserDataTypes = use(fetchData(params));
    const dishesData: DishProps[] = use(dishesFetchData(params));

    // console.log("data -->", data);
    // console.log("data.favouriteDish AuthorizedUser -->", data.favouriteDish);
    // console.log("otherDishes -->", dishesData);

    return (
        <>
            <AuthorizedUserClient userData={data} dataOfDishes={dishesData} />
            
            <LocalStorageStyles {...data.customSets} />
            <ToastContainer />
        </>
    )
}
