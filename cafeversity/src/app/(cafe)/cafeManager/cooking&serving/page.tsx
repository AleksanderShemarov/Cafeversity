import PlansOnCooking from "@/app/components/CafeManager/Cooking&ServingPage/Cooking/PlansOnCooking";
import ServingPage from "@/app/components/CafeManager/Cooking&ServingPage/Serving/ServingPage";


export default function Page () {

    const role = "CASHIER";

    return (
        <>
        {
            role === "CASHIER" ? <ServingPage /> : <PlansOnCooking />
        }
        </>
    );
}
