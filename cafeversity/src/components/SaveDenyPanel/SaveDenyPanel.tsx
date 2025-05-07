import { useTranslations } from "next-intl";
import { DenyBtn } from "../Buttons/DifferentButtons";
import AccessBtn from "../Buttons/DifferentButtons";
import { Dispatch, SetStateAction } from "react";
import blockStyle from "./SaveDenyPanel.module.css";


interface SaveDenyPanelTypes {
    enableBtns: boolean,
    translate: string,
    setButtonsFunc: Dispatch<SetStateAction<boolean>>,
    setDialogFunc: Dispatch<SetStateAction<string>>,
}


const SaveDenyPanel = ({ enableBtns, translate, setButtonsFunc, setDialogFunc }: SaveDenyPanelTypes) => {

    const t = useTranslations(translate);

    return (
        <div className={blockStyle.btnsBlock}>
            <DenyBtn
                disabled={enableBtns}
                additionalStyle={enableBtns ? {
                    backgroundColor: "lightgray",
                    color: "gray",
                    pointerEvents: "none",
                } : {}}
                onClick={() => {
                    if (enableBtns) setButtonsFunc(!enableBtns);
                    else {
                        setDialogFunc("Deny_Button");
                        document.body.style.overflow = 'hidden';
                    }
                }}
                buttonName={t("firstSetsPart.cancelButton")}
            />
            <AccessBtn
                onClick={() => {
                    if (enableBtns) setButtonsFunc(!enableBtns);
                    else {
                        setDialogFunc("Save_Button");
                        document.body.style.overflow = 'hidden';
                    }
                }}
                buttonName={`${enableBtns ? t("firstSetsPart.saveButtonType1") : t("firstSetsPart.saveButtonType2")}`}
            />
        </div>
    )
}

export default SaveDenyPanel;
