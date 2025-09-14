import CategoriesControl from "@/app/components/DishesGrid/CategoriesControl";


export default function MenuPage() {

    const categories = [
        { id: 1, name: "Салаты", icon: "IconSalad" },
        // { id: 2, name: "Халодныя Стравы", icon: "IconSnowflake" },
        { id: 3, name: "Супы", icon: "IconSoup" },
        { id: 4, name: "Гарачыя Стравы", icon: "IconFlame" },
        { id: 5, name: "Дэсерты", icon: "IconCake" },
        { id: 6, name: "Напоі", icon: "IconGlassCocktail" }
    ] as const;

    return (
        <CategoriesControl categories={categories} />
    );
}
