import dialogViewStyles from "@/components/Dialog/DialogView.module.css";
import { ReactNode } from "react";


interface DialogInterface {
    question: boolean | string,
    children: ReactNode,
}

export default function DialogView({ question, children }: DialogInterface) {
    return (
        <div id={dialogViewStyles.dialog}>
            <div id={dialogViewStyles.question_container}>
                <p id={dialogViewStyles.dialog_question}>
                    {question}
                </p>
                <div id={dialogViewStyles.dialog_buttons}>
                    {children}
                </div>
            </div>
        </div>
    )
}
