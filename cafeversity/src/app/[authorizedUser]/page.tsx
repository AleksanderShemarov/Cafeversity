import Image from "next/image";
import styles from "@/app/[authorizedUser]/authorized.module.css";
import { use } from "react";
import LocalStorageStyles from "@/components/LocalStorage/LocalStorage";


type UserDataTypes = {
    firstName: string,
    lastName: string,
    userPhoto: string,
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
    }
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
                        src={data.userPhoto ?? "/uploads/tempUserImage.png"}
                        alt={data.userPhoto ?? "/uploads/tempUserImage.png"}
                        layout="fill"
                    ></Image>
                </div>
                <p className={styles.userName}>{data.firstName}<br />{data.lastName}</p>
            </div>
            
            <LocalStorageStyles {...data.customSets} />
        </>
    )
}
