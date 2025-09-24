import styles from "@/app/(commonSite)/[locale]/news/foodpeople/foodpeople.module.css";
import Image from "next/image";
import Link from "next/link";


interface ArticleCardProps {
    id: number,
    image: string,
    imageName: string,
    articleName: string,
    shortText: string,
    published: boolean,
    pathname: string,
}


export default function ArticleCard(
    { id, image, imageName, articleName, shortText, published, pathname }: ArticleCardProps
) {
    if (!published) {
        return (
            <div className={styles.articleCard} style={{ opacity: 0.6 }}>
                <Image
                    src={image}
                    alt={imageName}
                    fill
                    className={styles.articleImage}
                />
                <div className={styles.articleOverlay}>
                    <div className={styles.articleContent}>
                        <h2 className={styles.articleTitle}>{articleName}</h2>
                        <p className={styles.articleDescription}>{shortText}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        
        <div className={styles.articleCard}>
            <Link 
                href={`${pathname.slice(0, 3)}/news/foodpeople/${id}`}
                className={styles.articleCardLink}
            >
                <Image
                    src={image}
                    alt={imageName}
                    fill
                    className={styles.articleImage}
                />
                <div className={styles.articleOverlay}>
                    <div className={styles.articleContent}>
                        <h2 className={styles.articleTitle}>{articleName}</h2>
                        <p className={styles.articleDescription}>{shortText}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}