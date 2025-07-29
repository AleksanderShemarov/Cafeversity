"use client";

import adminPasswordConfirm from "@/app/actions/adminPasswordConfirm";
import { IconCancel, IconCheck, IconDeviceFloppy, IconExclamationMark, IconPencil, IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";
import TextFormField from "../TextFormField";
import { startTransition } from "react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import passwordStyle from "@/app/(auth)/[locale]/LoginPage.module.css";
import { emailTokenConfirm, letterForEmailConfirmation } from "@/app/actions/emailConfirmation";
import { useTranslations } from "next-intl";


type AdminSecurityProps = {
    securityID: number,
    securityName: string,
    securityData: string,
    securityType?: string,
    securityConfirmed?: boolean,
    securityPass1?: string,
    securityPass2?: string
}

const SecurityRows = ({
    securityArray, onSave
}: {
    securityArray: AdminSecurityProps[], onSave: (id: number, newValue: string) => void
}) => {
    const securityRowsComps = useTranslations("AdminPageSetUps");

    const [buttonClicked, setButtonClicked] = useState<number|null>(null);
    const [editedValues, setEditedValues] = useState<Record<number, string>>({});
    const [passwordValues, setPasswordValues] = useState<{pass1: string, pass2: string}>({pass1: '', pass2: ''});
    const [passwordError, setPasswordError] = useState<string>('');


    const changeDialogRef = useRef<HTMLDialogElement>(null);    
    const showChangeDialog = () => {
        if (buttonClicked === 2) {
            if (passwordValues.pass1 !== passwordValues.pass2) {
                setPasswordError(securityRowsComps("3_blocks.security.messages.password.mistakes.different"));
                return;
            }
            if (passwordValues.pass1.length < 8) {
                setPasswordError(securityRowsComps("3_blocks.security.messages.password.mistakes.short"));
                return;
            }
            setPasswordError('');
        }

        changeDialogRef.current?.showModal();
    }
    const accessAnswer = () => {
        if (buttonClicked !== null) {
            const valueToSave = buttonClicked === 2 ? passwordValues.pass1 : editedValues[buttonClicked];
            onSave(buttonClicked, valueToSave);
            setButtonClicked(null);
            setHasAccess(false);
            denyAnswer();

            if (buttonClicked === 2) {
                setPasswordValues({ pass1: "", pass2: "" });
            }
        }
    }
    const denyAnswer = () => changeDialogRef.current?.close();


    const [hasAccess, setHasAccess] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

    const [letterSent, setLetterSent] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");

    const accessDialogRef = useRef<HTMLDialogElement>(null);
    const showAccessDialog = () => accessDialogRef.current?.showModal();
    const confirmAccess = () => {
        startTransition(async () => {
            setIsVerifying(true);
            const result = await adminPasswordConfirm(securityArray[0].securityData, password);
            if (result.success) {
                setHasAccess(true);
                toast.success(securityRowsComps("3_blocks.security.messages.access.confirmed"), { style: { fontSize: "1.5rem" } });
            } else {
                setHasAccess(false);
                toast.error(securityRowsComps("3_blocks.security.messages.access.denied"), { style: { fontSize: "1.5rem" } });
            }
            setIsVerifying(false);
            accessDialogRef.current?.close();
        });
    }
    const closeAccess = () => accessDialogRef.current?.close();


    const [editButtonHovered, setEditButtonHovered] = useState<number|null>(null);
    const [cancelButtonHovered, setCancelButtonHovered] = useState<boolean>(false);


    const handleEdit = (id: number, currentValue: string) => {
        setEditedValues((prev) => ({ ...prev, [id]: currentValue }));
        setButtonClicked(id);
    }


    const handleCancel = () => {
        setButtonClicked(null);
        setPasswordValues({pass1: '', pass2: ''});
        setPasswordError('');
    }


    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'pass1' | 'pass2') => {
        setPasswordValues(prev => ({
            ...prev,
            [field]: e.target.value
        }));
        
        if (passwordError) {
            setPasswordError('');
        }
    }

    return (
        <>
            <div>
                <button style={{ borderRadius: "1rem", width: "auto", padding: "8px 16px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    gap: "1.5rem", fontSize: "1.6rem", fontWeight: "600", border: "none",
                    cursor: "pointer", margin: "0 auto"
                }}
                    disabled={hasAccess}
                    onClick={showAccessDialog}
                >
                    {hasAccess ? securityRowsComps("3_blocks.security.messages.access.granted") : securityRowsComps("3_blocks.security.messages.access.get")}
                </button>
            </div>

            {securityArray.map(arrayItem =>
                <div key={arrayItem.securityID}>
                    <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <div>
                            <p style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
                                {arrayItem.securityName}
                            </p>
                            {buttonClicked !== arrayItem.securityID ?
                                (<div style={{ display: "inline-flex", gap: "10px", alignItems: "center" }}>
                                    <p style={{ fontSize: "1.5rem" }}>
                                        {arrayItem.securityData}
                                    </p>
                                    {arrayItem.securityType === "email" &&
                                        <div style={{
                                            borderRadius: "0.5rem", fontSize: "1.5rem", fontWeight: "700",
                                            padding: "3px 10px", color: arrayItem?.securityConfirmed ? "whitesmoke" : "black",
                                            cursor: arrayItem?.securityConfirmed ? "auto" : "pointer",
                                            outline: arrayItem?.securityConfirmed ? "none" : "1px solid black",
                                            backgroundColor: arrayItem?.securityConfirmed ? "green" : "gold"
                                        }}>
                                            {arrayItem?.securityConfirmed
                                            ? 
                                            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                                                <IconCheck style={{ color: "whitesmoke" }} /> {securityRowsComps("3_blocks.security.messages.emailStatus.confirmed")}
                                            </div>
                                            :
                                            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "5px" }}
                                                onClick={() => {
                                                    startTransition(async () => {
                                                        const result = await letterForEmailConfirmation(securityArray[0].securityData);
                                                        if (result.success) {
                                                            toast.success(`${securityRowsComps("3_blocks.security.messages.confirmLetter.sent")} ${securityArray[0].securityData}`, { style: { fontSize: "1.5rem" } });
                                                            setLetterSent(true);
                                                        } else {
                                                            toast.error(securityRowsComps("3_blocks.security.messages.confirmLetter.problem"));
                                                        }
                                                    });
                                                }}
                                            >
                                                <IconExclamationMark style={{ color: "black" }} /> {securityRowsComps("3_blocks.security.messages.emailStatus.unconfirmed")}
                                            </div>}
                                        </div>
                                    }
                                    {(arrayItem.securityType === "email" && letterSent) &&
                                        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                                            <input id={passwordStyle.password}
                                                style={{ marginTop: 0, marginBottom: 0 }}
                                                placeholder={securityRowsComps("3_blocks.security.tokenPlaceholder")}
                                                onChange={(e) => setToken(e.target.value)}
                                            />
                                            <button style={{ borderRadius: "1rem", width: "auto", padding: "8px 16px",
                                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                                gap: "1.5rem", fontSize: "1.6rem", fontWeight: "600", border: "none",
                                                cursor: "pointer", backgroundColor: "green", color: "whitesmoke"
                                            }}
                                                onClick={() => {
                                                    setLetterSent(false);
                                                    startTransition(async () => {
                                                        const result = await emailTokenConfirm(token);
                                                        if (result.success) {
                                                            securityArray[0].securityConfirmed = true;//! Check this moment later
                                                            toast.success(securityRowsComps("3_blocks.security.messages.isEmailConfirmed.yes"), { style: { fontSize: "1.5rem" } });
                                                        } else {
                                                            toast.error(securityRowsComps("3_blocks.security.messages.isEmailConfirmed.no"), { style: { fontSize: "1.5rem" } });
                                                        }
                                                    });
                                                }}
                                            >
                                                {securityRowsComps("3_blocks.security.buttons.confirm")}
                                            </button>
                                        </div>
                                    }
                                </div>
                                )
                                :
                                arrayItem.securityName !== "Password" ?
                                    <input style={{ fontSize: "1.8rem", flex: 1, padding: "4px 8px", borderRadius: "1.5rem" }}
                                        name={`input-${arrayItem.securityID}`}
                                        type={arrayItem.securityType ?? "text"}
                                        value={editedValues[arrayItem.securityID] || arrayItem.securityData}
                                        onChange={(e) => setEditedValues(
                                            (prev) => ({ ...prev, [arrayItem.securityID]: e.target.value })
                                        )}
                                    />
                                    :
                                    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                                        <input style={{ fontSize: "1.8rem", flex: 1, padding: "4px 8px", borderRadius: "1.5rem" }}
                                            name={`input-${arrayItem.securityID}1`}
                                            type={arrayItem.securityType ?? "text"}
                                            value={passwordValues.pass1}
                                            placeholder={securityRowsComps("3_blocks.security.passwordPlaceholder")}
                                            onChange={(e) => handlePasswordChange(e, "pass1")}
                                        />
                                        <input style={{ fontSize: "1.8rem", flex: 1, padding: "4px 8px", borderRadius: "1.5rem" }}
                                            name={`input-${arrayItem.securityID}2`}
                                            type={arrayItem.securityType ?? "text"}
                                            value={passwordValues.pass2}
                                            placeholder={securityRowsComps("3_blocks.security.repeatPasswordPlaceholder")}
                                            onChange={(e) => handlePasswordChange(e, "pass2")}
                                        />
                                    </div>
                            }
                            {passwordError && (
                                <p style={{ color: "red", fontSize: "1.4rem", margin: "5px 0" }}>
                                    {passwordError}
                                </p>
                            )}
                        </div>

                        <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", gap: "1.75rem" }}>
                            {buttonClicked === arrayItem.securityID &&
                                <button style={{ borderRadius: "1rem", width: "auto", padding: "8px 16px",
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    gap: "1.5rem", fontSize: "1.6rem", fontWeight: "600", border: "none",
                                    outline: cancelButtonHovered ? "2px solid red" : undefined, cursor: "pointer"
                                }}
                                    disabled={buttonClicked !== arrayItem.securityID}
                                    onClick={() => {
                                        handleCancel();
                                        setCancelButtonHovered(prev => !prev);
                                        setHasAccess(false);
                                    }}
                                    onMouseEnter={() => setCancelButtonHovered(prev => !prev)}
                                    onMouseLeave={() => setCancelButtonHovered(prev => !prev)}
                                >
                                    <IconCancel style={{ color: "red" }} />
                                </button>
                            }

                            <button style={{ borderRadius: "1rem", width: "auto", padding: "8px 16px",
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                gap: "1.5rem", fontSize: "1.6rem", fontWeight: "600", border: "none",
                                color: buttonClicked === arrayItem.securityID ? "green" : undefined,
                                outline: buttonClicked === arrayItem.securityID && editButtonHovered === arrayItem.securityID
                                    ? "2px solid green" : editButtonHovered === arrayItem.securityID
                                    ? "2px solid black" : undefined,
                                cursor: hasAccess ? "pointer" : "auto"
                            }}
                                disabled={!hasAccess || (buttonClicked !== null && buttonClicked !== arrayItem.securityID)}
                                onClick={() => {
                                    buttonClicked === arrayItem.securityID
                                    ? showChangeDialog()
                                    : handleEdit(arrayItem.securityID, arrayItem.securityData);
                                }}
                                onMouseEnter={() => setEditButtonHovered(arrayItem.securityID)}
                                onMouseLeave={() => setEditButtonHovered(null)}
                            >
                                {buttonClicked === arrayItem.securityID ? (
                                    <>
                                        <IconDeviceFloppy style={{ color: "green" }} /> {securityRowsComps("3_blocks.security.buttons.save")}
                                    </>
                                ) : (
                                    <>
                                        <IconPencil /> {securityRowsComps("3_blocks.security.buttons.change")}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <hr style={{ border: "1px solid", width: "100%", borderRadius: "0.5px" }} />
                </div>
            )}

            <dialog ref={changeDialogRef} style={{ border: "none", borderRadius: "1.2rem" }}>
                <p style={{ fontSize: "2.2rem", fontWeight: "700", textAlign: "center", marginTop: "1rem" }}>
                    {securityRowsComps("3_blocks.security.dialogs.saveChangesDialog.title")}
                </p>
                <p style={{ margin: "1.5rem 0.5rem", fontSize: "1.8rem", textAlign: "justify", textIndent: "2px" }}>
                    {securityRowsComps("3_blocks.security.dialogs.saveChangesDialog.text")}
                </p>
                <div style={{ width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 auto" }}>
                    <button type="button"
                        style={{
                            border: "none",
                            borderRadius: "0.75rem",
                            height: "30px",
                            padding: "2px 5px",
                            color: "whitesmoke",
                            fontWeight: "600",
                            fontSize: "1.5rem",
                            backgroundColor: "green",
                            cursor: "pointer",
                        }}
                        onClick={accessAnswer}
                    >
                        <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                            <IconCheck />
                            <span style={{ textIndent: "5px" }}>{securityRowsComps("3_blocks.security.dialogs.saveChangesDialog.buttons.yes")}</span>
                        </div>
                    </button>
                    <button type="button"
                        style={{
                            border: "none",
                            borderRadius: "0.75rem",
                            height: "30px",
                            padding: "2px 5px",
                            color: "whitesmoke",
                            fontWeight: "600",
                            fontSize: "1.5rem",
                            backgroundColor: "red",
                            cursor: "pointer",
                        }}
                        onClick={denyAnswer}
                    >
                        <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                            <IconX />
                            <span style={{ textIndent: "5px" }}>{securityRowsComps("3_blocks.security.dialogs.saveChangesDialog.buttons.no")}</span>
                        </div>
                    </button>
                </div>
            </dialog>

            <dialog ref={accessDialogRef} style={{ border: "none", borderRadius: "1.2rem" }}>
                <p style={{ fontSize: "2.2rem", fontWeight: "700", textAlign: "center", marginTop: "1rem" }}>
                    {securityRowsComps("3_blocks.security.dialogs.getAccessDialog.title")}
                </p>
                <p style={{ margin: "1.5rem 0.5rem", fontSize: "1.8rem", textAlign: "justify", textIndent: "2px" }}>
                    {securityRowsComps("3_blocks.security.dialogs.getAccessDialog.text")}
                </p>
                <div style={{ marginLeft: "8px", marginRight: "8px" }}>
                    <TextFormField
                        label={securityRowsComps("3_blocks.security.dialogs.getAccessDialog.inputLabel")}
                        inputType="password"
                        inputName="password"
                        styleId={passwordStyle.password}
                        placeholder="*******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{ width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 auto" }}>
                    <button type="button"
                        style={{
                            border: "none",
                            borderRadius: "0.75rem",
                            height: "30px",
                            padding: "2px 5px",
                            color: "whitesmoke",
                            fontWeight: "600",
                            fontSize: "1.5rem",
                            backgroundColor: "green",
                            cursor: "pointer",
                        }}
                        onClick={confirmAccess}
                        disabled={isVerifying}
                    >
                        <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                            <IconCheck />
                            <span style={{ textIndent: "5px" }}>{securityRowsComps("3_blocks.security.dialogs.getAccessDialog.buttons.confirm")}</span>
                        </div>
                    </button>
                    <button type="button"
                        style={{
                            border: "none",
                            borderRadius: "0.75rem",
                            height: "30px",
                            padding: "2px 5px",
                            color: "whitesmoke",
                            fontWeight: "600",
                            fontSize: "1.5rem",
                            backgroundColor: "red",
                            cursor: "pointer",
                        }}
                        onClick={closeAccess}
                    >
                        <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                            <IconX />
                            <span style={{ textIndent: "5px" }}>{securityRowsComps("3_blocks.security.dialogs.getAccessDialog.buttons.close")}</span>
                        </div>
                    </button>
                </div>
            </dialog>
        </>
    )
}

export default SecurityRows;
