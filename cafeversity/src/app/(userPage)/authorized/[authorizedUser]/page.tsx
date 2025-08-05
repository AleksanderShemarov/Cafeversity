import Image from "next/image";
import styles from "@/app/(userPage)/authorized/[authorizedUser]/authorized.module.css";
import { use } from "react";
import LocalStorageStyles from "@/components/LocalStorage/LocalStorage";
import SortableAreaComponent from "@/components/DropArea/SortableAreaComponent";


type UserDataTypes = {
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
            imagePath: string
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
    // console.log("data.favouriteDish -->", data.favouriteDish);

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
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "baseline",
                    paddingLeft: "25px", 
                    gap: "2.5rem",
                    // outline: "1px solid black"
                }}>
                    <p
                        // className={styles.userName}
                        style={{
                            margin: 0,
                            fontSize: "3.5rem",
                            // outline: "1px solid black",
                            fontFamily: "var(--font-family)",
                            fontWeight: "var(--font-volume-weight)",
                            fontStyle: "var(--font-volume-style)"
                        }}
                    >
                        {data.firstName} {data.lastName}
                        {data.nickName !== null &&
                            <><br />&quot;{data.nickName}&quot;</>
                        }
                    </p>
                    <p style={{
                        margin: 0,
                        fontSize: "3rem",
                        // outline: "1px solid black",
                        fontFamily: "var(--font-family)",
                        fontWeight: "var(--font-volume-weight)",
                        fontStyle: "var(--font-volume-style)"
                    }}>
                        {data.email}
                    </p>
                </div>
            </div>
            
            {/* Drag-&-Drop Component */}
            <SortableAreaComponent favouriteDishes={data.favouriteDish} />           

            <LocalStorageStyles {...data.customSets} />
        </>
    )
}
