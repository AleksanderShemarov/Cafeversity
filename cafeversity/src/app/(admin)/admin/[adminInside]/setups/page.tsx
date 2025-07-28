"use client";

import React, { useState, useEffect, startTransition } from "react";
import AdminDataComponent from "@/components/AdminPersonalData/AdminDataComponent";
import PersonalDataRows from "@/components/AdminPersonalData/PersonalDataRows";
import AdminSecurityComponent from "@/components/AdminSecurity/AdminSecurityComponent";
import SecurityRows from "@/components/AdminSecurity/SecurityRows";
import AdminUsersComponent from "@/components/AdminUsersTable/AdminUsersComponent";
import { AdminUsersTable } from "@/components/AdminUsersTable/AdminUsersTable";
import { AdminPersonTypes } from "./layout";
import { adminUpdate, UpdateAdminData } from "@/app/actions/adminSetups";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useRouter } from "next/navigation";


export type AdminUsersTableTypes = {
    ID: number,
    Name: string,
    Surname: string,
    Email: string,
    EmailConfirmed: boolean,
    Telephone: string|null,
    Role: string,
    Photo: string,
    Language: string,
    Theme: string,
    SessionId: string|null,
    Password: string,
    SecretWord: string,
    ResetToken: string|null,
    ResetTokenExpiry: Date|null
}


const AdminSetUps = (data: AdminPersonTypes) => {
    const router = useRouter();

    const [adminData, setAdminData] = useState<AdminUsersTableTypes[]|[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/admin/adminsTable", { cache: "no-store" });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const adminUsers = await response.json();

            setAdminData(adminUsers);
        }

        fetchData();
    }, []);

    const [setupsLineHovered, setSetupsLineHovered] = useState<number|null>(null);
    const [setupsLineClicked, setSetupsLineClicked] = useState<number>(1);

    const setupsLines: { id: number, name: string }[] = [
        { id: 1, name: "Personal Data" },
        { id: 2, name: "Login & Security" },
        { id: 3, name: "Admins' Roles (Table)" },
    ] as const;

    const [personalDataRows, setPersonalDataRows] = useState([
        // { personalDataID: 2, personalDataName: "Name", personlData: "Gordon Harris" },
        // { personalDataID: 3, personalDataName: "Telephone", personlData: "+375 (29) ***-**-**" },
        { personalDataID: 2, personalDataName: "Name", personalData: `${data.Name} ${data.Surname}` },
        { personalDataID: 3, personalDataName: "Telephone", personalData: `${data.Telephone === "" ? "+*** (**) ***-**-**" : data.Telephone}` },
        { personalDataID: 4, personalDataName: "Languages", personalData: "English, Belarusian, Czech" },
    ]);

    const [rowsOfSecurities, setRowsOfSecurities] = useState([
        { securityID: 1, securityName: "Email", securityData: data.Email, securityType: "email", securityConfirmed: data.EmailConfirmed },
        { securityID: 2, securityName: "Password", securityData: "To change your password, get access and input the new one twice.", securityType: "password", securityPass1: "", securityPass2: "" },
        { securityID: 3, securityName: "Secret Word", securityData: data.SecretWord, securityType: "text" },
    ]);

    const handleSavePhotoLanguage = async (newValue: string) => {
        if (newValue.length === 2) {
            startTransition(async () => {
                const result = await saveAdminDataUpdated({ Language: newValue });
                if (result.success) {
                    toast.success("Language is updated.", { style: { fontSize: "1.5rem" } });
                    router.refresh(); 
                } else {
                    toast.error("Language update failed!", { style: { fontSize: "1.5rem" } });
                }
            });
        } else if (newValue.includes("/")) {
            startTransition(async () => {
                const result = await saveAdminDataUpdated({ Photo: newValue });
                if (result.success) {
                    toast.success("Photo is updated.", { style: { fontSize: "1.5rem" } });
                    router.refresh();
                } else {
                    toast.error("Photo update failed!", { style: { fontSize: "1.5rem" } });
                }
            });
        } else if (newValue === "") {
            startTransition(async () => {
                const result = await saveAdminDataUpdated({ Photo: newValue });
                if (result.success) {
                    toast.success("Admin's Template Photo is set.", { style: { fontSize: "1.5rem" } });
                    router.refresh();
                } else {
                    toast.error("Photo update failed!", { style: { fontSize: "1.5rem" } });
                }
            });
        }
    }

    const handleSavePersonalData = async (id: number, newValue: string) => {
        if (id === 2) {
            const [adminName, adminSurname] = newValue.split(" ");

            startTransition(async () => {
                const result = await saveAdminDataUpdated({ Name: adminName, Surname: adminSurname });
                if (result.success && result?.redirect) {
                    toast.success("Fullname is updated.", { style: { fontSize: "1.5rem" } });
                    router.push(result.redirect); 
                } else {
                    toast.error("Fullname update failed!", { style: { fontSize: "1.5rem" } });
                }
            });
        } else if (id === 3) {
            startTransition(async () => {
                const result = await saveAdminDataUpdated({ Telephone: newValue });
                if (result.success) {
                    toast.success("Telephone number is updated.", { style: { fontSize: "1.5rem" } });
                } else {
                    toast.error("Telephone number update failed!", { style: { fontSize: "1.5rem" } });
                }
            });
        }
        
        setPersonalDataRows((prev) => prev.map(
            item => item.personalDataID === id ? { ...item, personalData: newValue } : item
        ));
    }

    async function saveAdminDataUpdated(newAdminData: UpdateAdminData) {
        return await adminUpdate(newAdminData, data.ID);
    }

    const handleSaveRowsOfSecurities = async (id: number, newValue: string) => {
        if (id === 1) {
            startTransition(async () => {
                const result = await saveAdminDataUpdated({ Email: newValue, EmailConfirmed: false });
                if (result.success) {
                    toast.success("The new email address is saved.", { style: { fontSize: "1.5rem" } });
                } else {
                    toast.error("It is impossible to save the new email address.", { style: { fontSize: "1.5rem" } });
                }
            });
        } else if (id === 2) {
            startTransition(async () => {
                const result = await saveAdminDataUpdated({ Password: newValue });
                if (result.success) {
                    toast.success("The new password is set.", { style: { fontSize: "1.5rem" } });
                } else {
                    toast.error("It is impossible to save the new password.", { style: { fontSize: "1.5rem" } });
                }
            });
        } else if (id === 3) {
            startTransition(async () => {
                const result = await saveAdminDataUpdated({ SecretWord: newValue });
                if (result.success) {
                    toast.success("The new secret word is saved.", { style: { fontSize: "1.5rem" } });
                } else {
                    toast.error("It is impossible to save the new secret word.", { style: { fontSize: "1.5rem" } });
                }
            });
        }
        
        setRowsOfSecurities((prev) => prev.map(
            item => item.securityID === id ? { ...item, securityData: newValue } : item
        ));
    }

    return (
        <div style={{
            display: "inline-grid", gridTemplateColumns: "1fr 5fr",
            width: "100%", fontSize: "1.8rem"
        }}>
            <div style={{
                height: "79dvh", borderRight: "1px solid", padding: "3rem 2rem"
            }}>
                {setupsLines.map(({ id, name }) =>
                    <div key={id}
                        style={{
                            padding: "8px 16px",
                            borderTop: id !== 1 ? "1.5px solid" : "none",
                            borderBottom: id !== setupsLines.length ? "1.5px solid" : "none",
                            cursor: "pointer",
                            backgroundColor: setupsLineClicked === id ? "lightgray" :
                                setupsLineHovered === id ? "#f0f0f0" : "transparent"
                        }}
                        onMouseEnter={() => setSetupsLineHovered(id)}
                        onMouseLeave={() => setSetupsLineHovered(null)}
                        onClick={() => setSetupsLineClicked(id)}
                    >
                        {name}
                    </div>
                )}
            </div>

            <div style={{
                flexGrow: "4", height: "79dvh", borderLeft: "1px solid", padding: "3rem 2rem"
            }}>
                {setupsLineClicked === 1 &&
                    <AdminDataComponent photo={data.Photo} language={data.Language} onSave={handleSavePhotoLanguage}>
                        <PersonalDataRows personalDataArray={personalDataRows} onSave={handleSavePersonalData} />
                    </AdminDataComponent>
                }

                {setupsLineClicked === 2 &&
                    <AdminSecurityComponent>
                        <SecurityRows securityArray={rowsOfSecurities} onSave={handleSaveRowsOfSecurities} />
                    </AdminSecurityComponent>
                }
                
                {setupsLineClicked === 3 &&
                    <AdminUsersComponent>
                        <AdminUsersTable data={adminData} />
                    </AdminUsersComponent>
                }
            </div>
        </div>
    )
}

export default AdminSetUps;
