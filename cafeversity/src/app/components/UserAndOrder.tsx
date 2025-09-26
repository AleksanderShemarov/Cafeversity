import Image from "next/image";
import styles from "@/app/(userPage)/authorized/[authorizedUser]/authorized.module.css";
import Order from "./OrderComponent/Order";
import { SelectedDish } from "./AuthorizedUserClient";
import { Dispatch, SetStateAction } from "react";


interface UserAndOrder {
    imagePath: string|null,
    name: string,
    surname: string,
    nickname: string|null,
    email: string,
    selectedDishes: SelectedDish[],
    setDishSelection: Dispatch<SetStateAction<SelectedDish[]>>,
    onRemoveDish: (dishId: number) => void,
    isOrderOpen: boolean,
}

export default function UserAndOrder({ imagePath, name, surname, nickname, email, selectedDishes, setDishSelection, onRemoveDish, isOrderOpen }: UserAndOrder) {    
    return (
        <div style={{
            display: "flex",
            // flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            // gap: "2rem",
            position: "relative",
            zIndex: 1
        }}>
            <div style={{
                display: "flex",
                // border: "3px dashed orange",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "30px",
                width: "100%",//
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
            <Order selectedDishes={selectedDishes} setDishSelection={setDishSelection} onRemoveDish={onRemoveDish} isOpen={isOrderOpen} />
        </div>
    );
}
