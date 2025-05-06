import { use } from "react";
import StickyNavBar from "@/components/StickySettingsNavBar/StickyNavBar";
import SettingsPage from "@/components/SettingsPage/SettingsPage";


export interface UserDataTypes {
    id: number,
    firstName: string,
    lastName: string,
    nickName: string,
    userPhoto: string|null,
    customSets: {
        spicy: boolean,
        vegetarian: boolean,
        vegan: boolean,
        minCalory: number,
        maxCalory: number,
        language: string,
        pageTheme: "light"|"dark",
        brandColor: string,
        fontFamily: string,
        fontSize: string,
        fontVolume: string,
    }
}

async function fetchData(authorizedUser: string) {
    const response = await fetch(`http://localhost:3000/api/userData?name=${authorizedUser}&page=settings`, { cache: "no-store" });
    const userData = await response.json();
    return userData;
}


export default function SettingsPageOnServer({ params }: { params: { authorizedUser: string } }) {
    const { authorizedUser } = params;
    const userData: UserDataTypes = use(fetchData(authorizedUser));

    return (
        <>
            <StickyNavBar
                navbarName="stickyNavbar.name"
                pageTranslate="SettingsPage"
                stickyNavbarParts={["stickyNavbar.part1", "stickyNavbar.part2", "stickyNavbar.part3"]}
            />
            <SettingsPage authorizedUser={authorizedUser} userData={userData} />
        </>
    )
}
