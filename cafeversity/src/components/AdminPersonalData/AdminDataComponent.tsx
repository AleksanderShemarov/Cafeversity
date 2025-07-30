"use client";

import { IconCancel, IconDeviceFloppy, IconTrash, IconUpload } from "@tabler/icons-react";
import ImageContainer from "../ImageEditor/ImageContainer";
import { startTransition, useRef, useState } from "react";
import { deleteAdminPhotoDbServer, newAdminPhotoDbServer } from "@/app/actions/adminSetups";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";


const langs: [string, string][] = [
    [ "Беларуская", "by" ],
    [ "English", "en" ],
    [ "Čeština", "cz" ],
    // [ "Polish", "Polski" ],
    // [ "Ukranian", "Українська" ],
    // [ "Lithuanian", "Lietuvių" ],
    // [ "Italian", "Italiano" ],
    // [ "French", "Français" ],
    // [ "Turkish", "Türkçe" ],
    // [ "Japanese", "日本語" ],
    // ["Russian", "Русский"],
] as const;


const AdminDataComponent = ({ photo, language, onSave, children }: { photo: string, language: string, onSave: (newValue: string) => void, children: React.ReactNode }) => {

    const adminDataComp = useTranslations("AdminPageSetUps");

    const [adminPhoto, setAdminPhoto] = useState<string>(photo);
    const [adminPhotoFile, setAdminPhotoFile] = useState<File|"">("");
    const [adminPhotoFileName, setAdminPhotoFileName] = useState<string>("");
    const [showAdminPhotoSave, setShowAdminPhotoSave] = useState<boolean>(false);

    const adminPhotoRef = useRef<HTMLInputElement>(null);

    const previewAdminPhoto = () => {
        adminPhotoRef.current?.click();
    }

    const removePreviewAdminPhoto = () => {
        if (adminPhotoRef.current) {
            adminPhotoRef.current.value = "";
        }
    }

    const showingAdminPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const tempURL = URL.createObjectURL(file);

            setAdminPhotoFile(file);
            setAdminPhoto(tempURL);
            setAdminPhotoFileName(file.name);
            setShowAdminPhotoSave((prev) => !prev);

            return () => URL.revokeObjectURL(tempURL);
        }
    }

    const savingAdminPhoto = () => {
        startTransition(async () => {
            const avatarFormData = new FormData();
            avatarFormData.append("adminAvatar", adminPhotoFile);
            const result = await newAdminPhotoDbServer(avatarFormData, adminPhotoFileName);
            if (result.success) toast.success(adminDataComp("3_blocks.personData.messages.photoFile.uploading.positive"), { style: { fontSize: "1.5rem" } });
            else {
                toast.error(`${adminDataComp("3_blocks.personData.messages.photoFile.uploading.negative")} ${result?.error}`, { style: { fontSize: "1.5rem" } });
                setShowAdminPhotoSave((prev) => !prev);
            }
        });
    }

    const removeAdminPhoto = () => {
        startTransition(async () => {
            const result = await deleteAdminPhotoDbServer(adminPhoto);
            if (result.success) toast.success(adminDataComp("3_blocks.personData.messages.photoFile.removing.positive"), { style: { fontSize: "1.5rem" } });
            else {
                toast.error(`${adminDataComp("3_blocks.personData.messages.photoFile.removing.negative")} ${result?.error}`, { style: { fontSize: "1.5rem" } });
                setShowAdminPhotoSave((prev) => !prev);
            }
        });
    }

    
    const languageChange = (language: string) => {
        const lang = langs.filter(langRow => langRow[1] === language).flat();
        onSave(lang[1]);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ width: "18rem" }}>
                    <ImageContainer img_path={adminPhoto === "" ? null : adminPhoto} style={{
                        height: "90%", width: "90%",
                        marginTop: 0, marginBottom: 0,
                        boxShadow: "black 0 0 2px 3px",
                        margin: "0 auto",
                    }} />
                    <input type="file" style={{ display: "none" }} ref={adminPhotoRef} onChange={showingAdminPhoto} />
                </div>
                <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", gap: "1.75rem" }}>
                    <button style={{ borderRadius: "1rem", width: "auto", padding: "8px 16px",
                        display: showAdminPhotoSave ? "flex" : "none", justifyContent: "space-between", alignItems: "center",
                        gap: "1.5rem", fontSize: "1.6rem", fontWeight: "600", border: "2px solid red",
                        cursor: "pointer"
                    }}
                        onClick={() => {
                            setAdminPhoto(photo);
                            setShowAdminPhotoSave((prev) => !prev);
                        }}
                    >
                        <IconCancel style={{ color: "red" }} />
                    </button>
                    <button style={{ borderRadius: "1rem", padding: "8px 16px", border: "2px solid green", color: "green",
                        display: showAdminPhotoSave ? "flex" : "none", justifyContent: "space-between", alignItems: "center",
                        gap: "1.5rem", fontSize: "1.6rem", fontWeight: "600", cursor: "pointer"
                    }}
                        onClick={() => {
                            onSave(`/adminPhotos/${adminPhotoFileName}`);
                            savingAdminPhoto();
                            setShowAdminPhotoSave((prev) => !prev);
                        }}
                    >
                        <IconDeviceFloppy style={{ color: "green" }} /> {adminDataComp("3_blocks.personData.buttons.save")}
                    </button>
                    <button style={{ borderRadius: "1rem", padding: "8px 16px", color: adminPhoto === "" ? "grey" : "red",
                        border: adminPhoto === "" ? "2px solid grey" : "2px solid red",
                        display: showAdminPhotoSave ? "none" : "flex", justifyContent: "space-between", alignItems: "center",
                        gap: "1.5rem", fontSize: "1.6rem", fontWeight: "600", cursor: adminPhoto === "" ? "auto" : "pointer"
                    }}
                        disabled={adminPhoto === ""}
                        onClick={() => {
                            setAdminPhoto("");
                            onSave("");
                            removeAdminPhoto();
                        }}
                    >
                        <IconTrash style={{ color: adminPhoto === "" ? "grey" : "red" }} /> {adminDataComp("3_blocks.personData.buttons.delete")}
                    </button>
                    <button style={{ borderRadius: "1rem", padding: "8px 16px",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        gap: "1.5rem", fontSize: "1.6rem", fontWeight: "600", cursor: "pointer"
                    }}
                        onClick={() => {
                            previewAdminPhoto();
                            removePreviewAdminPhoto();
                        }}
                    >
                        <IconUpload /> {adminDataComp("3_blocks.personData.buttons.upload")}
                    </button>
                </div>
            </div>

            <hr style={{ border: "1px solid", width: "100%", borderRadius: "0.5px" }} />

            {children}

            <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
                    {adminDataComp("3_blocks.personData.pageLanguage")}
                </p>
                <select name="langs"
                    style={{
                        fontSize: "1.6rem", fontWeight: "500", border: "none",
                        padding: "8px 16px 8px 4px", textAlign: "justify",
                        borderRadius: "1rem", backgroundColor: "rgb(237, 237, 237)",
                        cursor: "pointer"
                    }}
                    value={langs.find(lang => lang[1] === language)?.[1]}
                    onChange={e => languageChange(e.target.value)}
                >
                    {langs.map((lang, index) =>
                        <option key={index} value={lang[1]}
                            style={{
                                textAlign: "left",
                                borderRadius: "1rem",
                                backgroundColor: "rgb(237, 237, 237)",
                                display: lang[1] === language ? "none" : "block",
                            }}
                        >
                            {lang[0]}
                        </option>
                    )}
                </select>
            </div>

            <hr style={{ border: "1px solid", width: "100%", borderRadius: "0.5px" }} />
        </div>
    )
}

export default AdminDataComponent;
