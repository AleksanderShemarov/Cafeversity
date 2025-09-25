import CategoriesControl from "@/app/components/DishesGrid/CategoriesControl";
import { useTranslations } from "next-intl";


export default function MenuPage() {

    const menuCategories = useTranslations("UserMenuPage.categories");

    const categories = [
        { id: 1, name: menuCategories("salad"), categoryName: "Салаты", icon: "IconSalad" },
        // { id: 2, name: "Халодныя Стравы", categoryName: "Халодныя Стравы", icon: "IconSnowflake" },
        { id: 3, name: menuCategories("soup"), categoryName: "Супы", icon: "IconSoup" },
        { id: 4, name: menuCategories("main"), categoryName: "Гарачыя Стравы", icon: "IconFlame" },
        { id: 5, name: menuCategories("dessert"), categoryName: "Дэсерты", icon: "IconCake" },
        { id: 6, name: menuCategories("drink"), categoryName: "Напоі", icon: "IconGlassCocktail" }
    ] as const;

    return (
        <CategoriesControl categories={categories} />
    );
}
