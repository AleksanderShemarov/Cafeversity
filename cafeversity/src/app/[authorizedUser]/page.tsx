import tempUserPage from "../../../public/tempUserImage.png";
import Image from "next/image";
import styles from "@/app/[authorizedUser]/authorized.module.css";


export default function AuthorizedUser({ params }: { params: { authorizedUser: string } }) {
    
    const { authorizedUser } = params;
    const nameSurname: string[] = authorizedUser.split("_");
    
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
                <Image
                    src={tempUserPage}
                    alt="tempUserImage.png"
                    className={styles.userImage}
                ></Image>
                <p className={styles.userName}>{nameSurname[0]}<br />{nameSurname[1]}</p>
            </div>
            {/* <div className={styles.exit_cover}>
                <div id={styles.exit_field}></div>
            </div> */}
        </>
    )
}
