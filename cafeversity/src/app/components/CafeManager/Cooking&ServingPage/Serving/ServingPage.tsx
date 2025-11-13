import { ReadyOrderTypes } from "./ReadyOrdersTable";
import readyOrdersGetter from "@/app/actions/readyOredersGetter";
import ReadyTakenOrdersTable from "./ReadyOrdersTable";
import ViewContextProvider from "./ViewContext";
import ActualDishes from "./ActualDishes";
import PartsSwitcher from "./PartsSwitcher";
import { getTranslations } from "next-intl/server";
import Category from "./Category";
import BuyingContextProvider from "./BuyingContext";
import BuyingLane from "./BuyingLane";
import BuyingPreviewProvider from "./BuyingPreviewContext";
import BuyingPreview from "./BuyingPreview";


export default async function ServingPage() {
    
    const pageData: ReadyOrderTypes[] = await readyOrdersGetter();

    const menuCategories = await getTranslations("UserMenuPage.categories");
    
        const categories = [
            { id: 1, name: menuCategories("salad"), categoryName: "Салаты" },
            // { id: 2, name: "Халодныя Стравы", categoryName: "Халодныя Стравы" },
            { id: 3, name: menuCategories("soup"), categoryName: "Супы" },
            { id: 4, name: menuCategories("main"), categoryName: "Гарачыя Стравы" },
            { id: 5, name: menuCategories("dessert"), categoryName: "Дэсерты" },
            { id: 6, name: menuCategories("drink"), categoryName: "Напоі" }
        ] as const;
    
    return (
        <ViewContextProvider>
            <PartsSwitcher>
                <BuyingContextProvider>
                    <BuyingPreviewProvider>
                        <ActualDishes>
                            {categories.map(category =>
                                <Category key={category.id} name={category.name} categotyFetchName={category.categoryName} />
                            )}
                        </ActualDishes>
                        <ReadyTakenOrdersTable readyOrders={pageData} />
                        <BuyingLane />
                        <BuyingPreview />
                    </BuyingPreviewProvider>
                </BuyingContextProvider>
            </PartsSwitcher>
        </ViewContextProvider>
    );
}
