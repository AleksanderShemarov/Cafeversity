import dynamic from "next/dynamic";
import CommonIncomeLoading from "./CommonIncomeLoading";
import { use } from "react";
import { getCafeIncomes } from "@/app/actions/getDishesData";
const NivoChart = dynamic(
    () => import("@/components/Charts/Nivo"),
    {
        ssr: false,
        loading: () => <CommonIncomeLoading />
    }
);


async function getIncomesOfCafes() {
    const data = await getCafeIncomes();
    return data;
}


export default function CommonIncomeChart() {
    const cafesIncomes = use(getIncomesOfCafes());

    // const cafesIncomes: Record<string, number> = {
    //     "Кафэ Гэрадоту": 400,
    //     "Кафэ Эдгара Кодду": 200,
    //     "Тэрмаядзернае Кафэ": 150,
    // }

    return (
        <NivoChart cafesIncomes={cafesIncomes} />
    );
}
