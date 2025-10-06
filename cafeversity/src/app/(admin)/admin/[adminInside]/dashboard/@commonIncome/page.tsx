import dynamic from "next/dynamic";
import LoadingCommonIncome from "./loading";
import { use } from "react";
import { getCafeIncomes } from "@/app/actions/getDishesData";
const NivoChart = dynamic(
    () => import("@/components/Charts/Nivo"),
    {
        ssr: false,
        loading: () => <LoadingCommonIncome />
    }
);


async function getIncomesOfCafes() {
    const data = await getCafeIncomes();
    return data;
}


export default function CommonIncome() {
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
