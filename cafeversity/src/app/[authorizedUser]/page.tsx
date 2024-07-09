import tempUserPage from "../../../public/tempUserImage.png";
import Image from "next/image";
import styles from "@/app/[authorizedUser]/authorized.module.css";


export default function AuthorizedUser({ params }: { params: { authorizedUser: string } }) {
    
    const { authorizedUser } = params;
    
    return (
        <>
            <div style={{
                display: "flex",
                border: "3px dashed orange",
                alignItems: "center",
                justifyContent: "flex-start",
            }}>
                <Image
                    src={tempUserPage}
                    alt="tempUserImage.png"
                    className={styles.userImage}
                ></Image>
                <h2 className={styles.userName}>{authorizedUser}</h2>
            </div>
            {/* <div className={styles.exit_cover}>
                <div id={styles.exit_field}></div>
            </div> */}
        </>
    )
}
