import Image from "next/image";
import styles from "@/app/[authorizedUser]/authorized.module.css";
import { use } from "react";
import ThemeManager from "@/hooks/GetThemeSets";
import AccentColourManager from "@/hooks/GetAccentColour";
import GetFontFamily from "@/hooks/GetFontFamily";
import GetFontSize from "@/hooks/GetFontSize";
import GetFontVolume from "@/hooks/GetFontVolume";


type UserDataTypes = {
    firstName: string,
    lastName: string,
    userPhoto: string,
}


async function fetchData(params: { authorizedUser: string; }) {
    const { authorizedUser } = params;
    console.log(params, authorizedUser);

    const response = await fetch(`http://localhost:3000/api/userData?name=${authorizedUser}`);
    const userData = await response.json();

    return userData;
}


export default function AuthorizedUser({ params }: { params: { authorizedUser: string } }) {
    
    const data: UserDataTypes = use(fetchData(params));

    return (
        <>
            <div style={{
                display: "flex",
                border: "3px dashed orange",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "30px",
            }}>
                <div className={styles.userImage}>
                    <Image
                        src={data ? data.userPhoto : "/uploads/tempUserImage.png"}
                        alt={data ? data.userPhoto : "/uploads/tempUserImage.png"}
                        layout="fill"
                    ></Image>
                </div>
                <p className={styles.userName}>{data.firstName}<br />{data.lastName}</p>
            </div>
            <ThemeManager />
            <AccentColourManager />
            <GetFontFamily />
            <GetFontSize />
            <GetFontVolume />
            {/* <div className={styles.exit_cover}>
                <div id={styles.exit_field}></div>
            </div> */}
        </>
    )
}
