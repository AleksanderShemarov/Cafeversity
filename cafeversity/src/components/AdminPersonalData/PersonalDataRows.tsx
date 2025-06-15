"use client";

import { IconCancel, IconCheck, IconDeviceFloppy, IconPencil, IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";


type AdminPersonalDataProps = {
    personalDataID: number,
    personalDataName: string,
    personlData: string
}

const PersonalDataRows = ({ personalDataArray }: { personalDataArray: AdminPersonalDataProps[]}) => {

    const changeDialogRef = useRef<HTMLDialogElement>(null);
    const [buttonClicked, setButtonClicked] = useState<number|null>(null);
    
    const showChangeDialog = () => changeDialogRef.current?.showModal();
    const accessAnswer = () => {
        setButtonClicked(null);
        changeDialogRef.current?.close();
    }
    const denyAnswer = () => changeDialogRef.current?.close();

    return (
        <>
            {personalDataArray.map(arrayItem =>
                <>
                    <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center" }}
                        key={arrayItem.personalDataID}
                    >
                        <div>
                            <p style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
                                {arrayItem.personalDataName}
                            </p>
                            <p style={{ fontSize: "1.5rem" }}>
                                {arrayItem.personlData}
                            </p>
                        </div>
                        <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", gap: "1.75rem" }}>
                            {buttonClicked === arrayItem.personalDataID &&
                                <button style={{ borderRadius: "1rem", width: "auto", padding: "8px 16px",
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    gap: "1.5rem", fontSize: "1.6rem", fontWeight: "600", border: "none",
                                    // color: "red"
                                }}
                                    disabled={buttonClicked !== null && buttonClicked !== arrayItem.personalDataID}
                                    onClick={() => setButtonClicked(null)}
                                >
                                    <IconCancel style={{ color: "red" }} />
                                </button>
                            }

                            <button style={{ borderRadius: "1rem", width: "auto", padding: "8px 16px",
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                gap: "1.5rem", fontSize: "1.6rem", fontWeight: "600", border: "none",
                                color: buttonClicked === arrayItem.personalDataID ? "green" : undefined
                            }}
                                disabled={buttonClicked !== null && buttonClicked !== arrayItem.personalDataID}
                                onClick={() => {
                                    if (buttonClicked === null) setButtonClicked(arrayItem.personalDataID);
                                    else if (buttonClicked === arrayItem.personalDataID) showChangeDialog();
                                }}
                            >
                                {buttonClicked === arrayItem.personalDataID ? <IconDeviceFloppy style={{ color: "green" }} /> : <IconPencil />}
                                {buttonClicked === arrayItem.personalDataID ? "Save" : "Edit"}
                            </button>
                        </div>
                    </div>

                    <hr style={{ border: "1px solid", width: "100%", borderRadius: "0.5px" }} />

                    <dialog ref={changeDialogRef} style={{ border: "none", borderRadius: "1.2rem" }}>
                    <p style={{ fontSize: "2.2rem", fontWeight: "700", textAlign: "center", marginTop: "1rem" }}>
                        Saving New Data
                    </p>
                    <p style={{ margin: "1.5rem 0.5rem", fontSize: "1.8rem", textAlign: "justify", textIndent: "2px" }}>
                        Are you agreed to save an updated datum?
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
                                <span style={{ textIndent: "5px" }}>Yes</span>
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
                                <span style={{ textIndent: "5px" }}>No</span>
                            </div>
                        </button>
                    </div>
                </dialog>
                </>
            )}    
        </>
    )
}

export default PersonalDataRows;
