import { use } from "react";
import SettingsPage from "@/components/SettingsPage/SettingsPage";


export interface UserDataTypes {
    firstName: string,
    lastName: string,
    nickName: string,
    userPhoto: string|null,
    customSets: {
        spicy: boolean,
        veget: boolean,
        vegan: boolean,
        minCalory: number,
        maxCalory: number,
        language: string,
    }
}

async function fetchData(authorizedUser: string) {
    const response = await fetch(`http://localhost:3000/api/userData?name=${authorizedUser}&page=settings`);
    const userData = await response.json();
    return userData;
}


export default function SettingsPageOnServer({ params }: { params: { authorizedUser: string } }) {
    const { authorizedUser } = params;
    const userData: UserDataTypes = use(fetchData(authorizedUser));

    return (
        <SettingsPage authorizedUser={authorizedUser} userData={userData} />
    )
}
