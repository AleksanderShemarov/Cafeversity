"use client";

import React, { useState, useEffect } from "react";
import AdminDataComponent from "@/components/AdminPersonalData/AdminDataComponent";
import PersonalDataRows from "@/components/AdminPersonalData/PersonalDataRows";
import AdminSecurityComponent from "@/components/AdminSecurity/AdminSecurityComponent";
import SecurityRows from "@/components/AdminSecurity/SecurityRows";
import AdminUsersComponent from "@/components/AdminUsersTable/AdminUsersComponent";
import { AdminUsersTable } from "@/components/AdminUsersTable/AdminUsersTable";


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


const AdminSetUps = () => {

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

    const dataRows = [
        { personalDataID: 2, personalDataName: "Name", personlData: "Gordon Harris" },
        { personalDataID: 3, personalDataName: "Telephone", personlData: "+375 (29) ***-**-**" },
        { personalDataID: 4, personalDataName: "Languages", personlData: "English, Belarusian, Czech" },
    ];

    const rowsOfSecurities = [
        { securityID: 1, securityName: "Email", securityData: "email@example.com" },
        { securityID: 2, securityName: "Password", securityData: "passwordExample" },
    ];

    return (
        <div style={{
            display: "inline-grid", gridTemplateColumns: "1fr 3fr",
            width: "100%", fontSize: "1.8rem"
        }}>
            <div style={{
                height: "79dvh", borderRight: "1px solid", padding: "3rem 2rem"
            }}>
            {setupsLines.map(({ id, name }) =>
                <div key={id}
                    style={{
                        padding: "8px 16px",
                        // outline: "1px solid orange",

                        borderTop: id !== 1 ? "1.5px solid" : "none",
                        borderBottom: id !== setupsLines.length ? "1.5px solid" : "none",
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
                    <AdminDataComponent>
                        <PersonalDataRows personalDataArray={dataRows} />
                    </AdminDataComponent>
                }

                {setupsLineClicked === 2 &&
                    <AdminSecurityComponent>
                        <SecurityRows securityArray={rowsOfSecurities} />
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
