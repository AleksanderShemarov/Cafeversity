"use client";

import React, { useState } from "react";
import AdminDataComponent from "@/components/AdminPersonalData/AdminDataComponent";
import PersonalDataRows from "@/components/AdminPersonalData/PersonalDataRows";


const AdminSetUps = () => {

    const [setupsLineHovered, setSetupsLineHovered] = useState<number|null>(null);
    const [setupsLineClicked, setSetupsLineClicked] = useState<number>(1);

    const setupsLines: { id: number, name: string }[] = [
        { id: 1, name: "Personal Data" },
        { id: 2, name: "Preferencies" },
        { id: 3, name: "Admins' Table" },
    ] as const;

    const setupsPages: { id: number, name: string }[] = [
        //{ id: 1, name: "Personal Data Page" },
        { id: 2, name: "Preferencies Page" },
        { id: 3, name: "Admins' Table Page" },
    ] as const;

    const dataRows = [
        { personalDataID: 2, personalDataName: "Name", personlData: "Gordon Harris" },
        { personalDataID: 3, personalDataName: "Contact", personlData: "email@example.com" },
    ];

    return (
        <div style={{
            display: "inline-flex", justifyContent: "space-between", alignItems: "center",
            width: "100%", fontSize: "1.8rem"
        }}>
            <div style={{
                flexGrow: "1", height: "79dvh", borderRight: "1px solid", padding: "3rem 2rem"
            }}>
            {setupsLines.map(({ id, name }) =>
                <div key={id}
                    style={{
                        padding: "8px 16px",
                        outline: "1px solid orange",

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
                
                {setupsPages.map(setupsPage =>
                    <div key={setupsPage.id}
                        style={{
                            display: setupsLineClicked === setupsPage.id ? "block" : "none"
                        }}
                    >
                        {setupsPage.name}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminSetUps;
