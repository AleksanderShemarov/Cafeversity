import CashPaymentProvider from "./CashPaymentContext";
import CashMachine from "./CashMachine";
import { CashPaymentBtn } from "./PaymentBtn";


export default function CashPayment({ commonCost, choisenName }: { commonCost: string, choisenName: string }) {
    return (
        <div className={`
            ${
                choisenName === "cash"
                ?
                "block flex-1 px-[2rem] py-[1.5rem] border-1"
                :
                "hidden"
            }
        `}>
            <CashPaymentProvider>
                <div className="w-[100%] flex flex-col items-center h-full">
                    <div className="w-[100%] flex flex-1 items-stretch justify-center mb-[2.5rem]">
                        <div className="flex flex-1 items-center justify-center border-r-[0.5px]">
                            <p className="text-[4.5rem] text-center font-semibold">
                                Агульны Кошт:
                                <br />
                                <span className="underline">{commonCost}</span> BYN
                            </p>
                        </div>
                        <div className="flex flex-col flex-1 items-center justify-center border-l-[0.5px]">
                            <CashMachine />
                        </div>
                    </div>
                    <CashPaymentBtn commonCost={commonCost} />
                </div>
            </CashPaymentProvider>
        </div>
    );
}
