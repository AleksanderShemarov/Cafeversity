import { Suspense } from "react";
import GridBlock from "@/app/components/GridBlock";

import CommonIncomeChart from "@/app/components/AdminCharts/CommonIncome/CommonIncomeChart";
import CommonIncomeLayout from "@/app/components/AdminCharts/CommonIncome/CommonIncomeLayout";
import CommonIncomeLoading from "@/app/components/AdminCharts/CommonIncome/CommonIncomeLoading";

import DishesTypesChart from "@/app/components/AdminCharts/DishesTypes/DishesTypesChart";
import DishesTypesLayout from "@/app/components/AdminCharts/DishesTypes/DishesTypesLayout";
import DishesTypesLoading from "@/app/components/AdminCharts/DishesTypes/DishesTypesLoading";

import MealsTypesChart from "@/app/components/AdminCharts/MealsTypes/MealsTypesChart";
import MealsTypesLayout from "@/app/components/AdminCharts/MealsTypes/MealsTypesLayout";
import MealsTypesLoading from "@/app/components/AdminCharts/MealsTypes/MealsTypesLoading";

import PopularDishesLoading from "@/app/components/AdminCharts/PopularDishes/PopularDishesLoading";
import PopularDishesLayout from "@/app/components/AdminCharts/PopularDishes/PopularDishesLayout";
import PopularDishesChart from "@/app/components/AdminCharts/PopularDishes/PopularDishesChart";



export default function DashboardLayout() {
    return (
        <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gridTemplateRows: "1fr 1fr",
            height: "85vh", gap: "3rem"
        }}>
            <GridBlock column="1/3" row={1}>
                <Suspense fallback={<PopularDishesLoading />}>
                    <PopularDishesLayout>
                        <PopularDishesChart />
                    </PopularDishesLayout>
                </Suspense>
            </GridBlock>

            <GridBlock column="3/5" row={1}>
                <Suspense fallback={<DishesTypesLoading />}>
                    <DishesTypesLayout>
                        <DishesTypesChart />
                    </DishesTypesLayout>
                </Suspense>
            </GridBlock>

            <GridBlock column="1/3" row={2}>
                <Suspense fallback={<CommonIncomeLoading />}>
                    <CommonIncomeLayout>
                        <CommonIncomeChart />
                    </CommonIncomeLayout>
                </Suspense>
            </GridBlock>

            <GridBlock column="3/5" row={2}>
                <Suspense fallback={<MealsTypesLoading />}>
                    <MealsTypesLayout>
                        <MealsTypesChart />
                    </MealsTypesLayout>
                </Suspense>
            </GridBlock>
        </div>
    );
}
