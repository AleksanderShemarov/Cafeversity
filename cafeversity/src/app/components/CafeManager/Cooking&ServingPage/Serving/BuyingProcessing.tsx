"use client";

import { useBuyingContext } from "./BuyingContext";
import BuyingDialog from "./BuyingDialog";
import BuyingPreview from "./BuyingPreview";
import PaymentsBlock from "./Payments";


export default function BuyingProcessing() {

    const { buyingData } = useBuyingContext();
    const commonCost = String(buyingData.reduce((sum, datum) => sum + (datum.cost * datum.amount), 0).toFixed(2));

    return (
        <BuyingDialog>
            <BuyingPreview buyingData={buyingData} commonCost={commonCost} />
            <PaymentsBlock commonCost={commonCost} />
        </BuyingDialog>
    );
}
