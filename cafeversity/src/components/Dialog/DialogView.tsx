import dialogViewStyles from "@/components/Dialog/DialogView.module.css";
import { CSSProperties, ReactNode } from "react";


interface DialogInterface {
    question: boolean | string,
    children: ReactNode,
    dialog_cover?: CSSProperties,
    dialog_container?: CSSProperties,
    dialog_question?: CSSProperties,
    dialog_buttons?: CSSProperties,
}

export default function DialogView(
    { question, children, dialog_cover, dialog_container, dialog_question, dialog_buttons }: DialogInterface
) {
    return (
        <div id={dialogViewStyles.dialog} style={dialog_cover}>
            <div id={dialogViewStyles.question_container} style={dialog_container}>
                <p id={dialogViewStyles.dialog_question} style={dialog_question}>
                    {question}
                </p>
                <div id={dialogViewStyles.dialog_buttons} style={dialog_buttons}>
                    {children}
                </div>
            </div>
        </div>
    )
}
