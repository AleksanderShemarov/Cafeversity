import { IconCake, IconFlame, IconGlassCocktail, IconSalad, IconSearch, IconSnowflake, IconSoup } from "@tabler/icons-react";
import CategoryCard from "@/app/components/CategoryCard/CategoryCard";
import DishesGrid from "@/app/components/DishesGrid/DishesGrid";


export default function MenuPage() {

    const categories = [
        { id: 1, name: "Салаты", icon: IconSalad },
        { id: 2, name: "Халодныя Стравы", icon: IconSnowflake },
        { id: 3, name: "Супы", icon: IconSoup },
        { id: 4, name: "Гарачыя Стравы", icon: IconFlame },
        { id: 5, name: "Дэсерты", icon: IconCake },
        { id: 6, name: "Напоі", icon: IconGlassCocktail }
    ] as const;

    return (
        <>
            <div style={{
                width: "100%", margin: "0 auto",
                backgroundColor: "rgba(252, 242, 223, 0.67)", backdropFilter: "blur(5px)",
                display: "block", position: "sticky", top: 0, zIndex: 10
            }}>
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem",
                    paddingTop: "1.5rem", marginTop: 0, marginBottom: "1.5rem", marginLeft: 0, marginRight: 0
                }}>
                    <IconSearch
                        style={{
                            height: "3.5rem", width: "3.5rem",
                            borderRadius: "20%", boxShadow: "0px 0px 3px -1px rgba(66, 68, 90, 1)",
                            color: "orange"
                        }}
                    />
                    <input type="text" placeholder="Search..."
                        style={{
                            height: "3.5rem", fontSize: "2rem", border: "none", borderBottom: "2px solid orange",
                            backgroundColor: "inherit", paddingLeft: "10px", paddingRight: "10px", paddingBottom: 0
                        }}
                    />
                </div>
                
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", margin: "1rem 0" }}>
                    {categories.map((category, index) =>
                        <p key={index}
                            style={{
                                fontSize: "1.8rem", padding: "0.5rem 1.5rem", border: "2px solid orange",
                                height: "2.5rem", borderRadius: "1.5rem", fontWeight: 400, cursor: "pointer"
                            }}
                        >
                            {category.name}
                        </p>
                    )}
                </div>
            </div>

            <div>
                {categories.map(category =>
                    <CategoryCard key={category.id} name={category.name} icon={category.icon}>
                        <DishesGrid categotyName={category.name} />
                    </CategoryCard>
                )}
            </div>
        </>
    );
}
