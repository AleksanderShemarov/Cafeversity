import styles from "@/app/(commonSite)/page.module.css";
import Link from "next/link";


interface OptionData {
    path: string,
    id_style: string,
    button_name?: string,
}
interface OptionDataArray {
    data: OptionData[],
}

export default function TwoMainBottomButtons({ data } : OptionDataArray) {
    return (
        <>
            <div className={styles.buttons}>
                {data.map((datum, index) => 
                    <Link key={index} href={datum.path} id={datum.id_style}>
                        {datum.button_name}
                    </Link>
                )}
            </div>
        </>
    );
}
