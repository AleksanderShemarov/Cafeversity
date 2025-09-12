import Image from "next/image";
import styles from "@/app/(userPage)/authorized/[authorizedUser]/authorized.module.css";
import Order from "./OrderComponent/Order";
import { SelectedDish } from "./AuthorizedUserClient";


interface UserAndOrder {
    imagePath: string|null,
    name: string,
    surname: string,
    nickname: string|null,
    email: string,
    selectedDishes: SelectedDish[],
    onRemoveDish: (dishId: number) => void,
}

export default function UserAndOrder({ imagePath, name, surname, nickname, email, selectedDishes, onRemoveDish }: UserAndOrder) {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
                display: "flex",
                // border: "3px dashed orange",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "30px",
                width: "50%",
                // outline: "2px solid purple"
            }}>
                <div className={styles.userImage}>
                    <Image
                        src={imagePath ?? "/uploads/tempUserImage.png"}
                        alt={imagePath ?? "/uploads/tempUserImage.png"}
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
                        {name} {surname}
                        {nickname !== null &&
                            <><br />&quot;{nickname}&quot;</>
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
                        {email}
                    </p>
                </div>
            </div>
            <Order selectedDishes={selectedDishes} onRemoveDish={onRemoveDish} />
        </div>
    );
}
