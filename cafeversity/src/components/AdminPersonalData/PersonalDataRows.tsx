"use client";

import { IconCancel, IconCheck, IconDeviceFloppy, IconPencil, IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";


type AdminPersonalDataProps = {
    personalDataID: number,
    personalDataName: string,
    personalData: string
}


const PersonalDataRows = (
    { personalDataArray, onSave }:
    { personalDataArray: AdminPersonalDataProps[], onSave: (id: number, newValue: string) => void }
) => {

    const [buttonClicked, setButtonClicked] = useState<number|null>(null);
    const [editedValues, setEditedValues] = useState<Record<number, string>>({});
    const changeDialogRef = useRef<HTMLDialogElement>(null);
    
    const showChangeDialog = () => changeDialogRef.current?.showModal();
    const accessAnswer = () => {
        if (buttonClicked !== null) {
            onSave(buttonClicked, editedValues[buttonClicked]);
            setButtonClicked(null);
            denyAnswer();
        }
    }
    const denyAnswer = () => changeDialogRef.current?.close();

    const [editButtonHovered, setEditButtonHovered] = useState<number|null>(null);
    const [cancelButtonHovered, setCancelButtonHovered] = useState<boolean>(false);

    const handleEdit = (id: number, currentValue: string) => {
        setEditedValues((prev) => ({ ...prev, [id]: currentValue }));
        setButtonClicked(id);
    }

    const handleCancel = () => {
        setButtonClicked(null);
    }

    return (
        <>
            {personalDataArray.map(arrayItem =>
                <div key={arrayItem.personalDataID}>
                    <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <div>
                            <p style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
                                {arrayItem.personalDataName}
                            </p>
                            {buttonClicked !== arrayItem.personalDataID ?
                                <p style={{ fontSize: "1.5rem" }}>
                                    {arrayItem.personalData}
                                </p>
                                :
                                <input style={{ fontSize: "1.8rem", flex: 1, padding: "4px 8px", borderRadius: "1.5rem" }}
                                    name={`input-${arrayItem.personalDataID}`}
                                    type="text"
                                    value={editedValues[arrayItem.personalDataID] || arrayItem.personalData}
                                    onChange={(e) => setEditedValues(
                                        (prev) => ({ ...prev, [arrayItem.personalDataID]: e.target.value })
                                    )}
                                />
                                
                            }
                        </div>

                        <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", gap: "1.75rem" }}>
                            {buttonClicked === arrayItem.personalDataID &&
                                <button style={{ borderRadius: "1rem", width: "auto", padding: "8px 16px",
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    gap: "1.5rem", fontSize: "1.6rem", fontWeight: "600", border: "none",
                                    outline: cancelButtonHovered ? "2px solid red" : undefined, cursor: "pointer"
                                }}
                                    disabled={buttonClicked !== arrayItem.personalDataID}
                                    onClick={() => {
                                        handleCancel();
                                        setCancelButtonHovered(prev => !prev);
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
                                color: buttonClicked === arrayItem.personalDataID ? "green" : undefined,
                                outline: buttonClicked === arrayItem.personalDataID && editButtonHovered === arrayItem.personalDataID
                                    ? "2px solid green" : editButtonHovered === arrayItem.personalDataID
                                    ? "2px solid black" : undefined,
                                cursor: "pointer"
                            }}
                                disabled={buttonClicked !== null && buttonClicked !== arrayItem.personalDataID}
                                onClick={() => {
                                    buttonClicked === arrayItem.personalDataID ? showChangeDialog() : handleEdit(arrayItem.personalDataID, arrayItem.personalData);
                                }}
                                onMouseEnter={() => setEditButtonHovered(arrayItem.personalDataID)}
                                onMouseLeave={() => setEditButtonHovered(null)}
                            >
                                {buttonClicked === arrayItem.personalDataID ? (
                                    <>
                                        <IconDeviceFloppy style={{ color: "green" }} /> Save
                                    </>
                                ) : (
                                    <>
                                        <IconPencil /> Edit
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
    )
}

export default PersonalDataRows;
