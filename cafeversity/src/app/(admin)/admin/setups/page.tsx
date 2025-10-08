// "use client";

// import React, { useState, useEffect, startTransition } from "react";
// import AdminDataComponent from "@/components/AdminPersonalData/AdminDataComponent";
// import PersonalDataRows from "@/components/AdminPersonalData/PersonalDataRows";
// import AdminSecurityComponent from "@/components/AdminSecurity/AdminSecurityComponent";
// import SecurityRows from "@/components/AdminSecurity/SecurityRows";
// import AdminUsersComponent from "@/components/AdminUsersTable/AdminUsersComponent";
// import { AdminUsersTable } from "@/components/AdminUsersTable/AdminUsersTable";
// import { AdminPersonTypes } from "./layout";
// import { adminUpdate, UpdateAdminData } from "@/app/actions/adminSetups";
// import { toast } from "react-toastify";
// import "react-toastify/ReactToastify.css";
// import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";


// export type AdminUsersTableTypes = {
//     ID: number,
//     Name: string,
//     Surname: string,
//     Email: string,
//     EmailConfirmed: boolean,
//     Telephone: string|null,
//     Role: string,
//     Photo: string,
//     Language: string,
//     Theme: string,
//     SessionId: string|null,
//     Password: string,
//     SecretWord: string,
//     ResetToken: string|null,
//     ResetTokenExpiry: Date|null
// }


// type AdminSetUpsProps = {
//   data: AdminPersonTypes;
//   params?: never;
//   searchParams?: never;
// };


// const AdminSetUps = ({data}: AdminSetUpsProps) => {
//     const router = useRouter();

//     const [adminData, setAdminData] = useState<AdminUsersTableTypes[]|[]>([]);
    
//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch("http://localhost:3000/api/admin/adminsTable", { cache: "no-store" });
//             if (!response.ok) {
//                 throw new Error('Failed to fetch data');
//             }
//             const adminUsers = await response.json();

//             setAdminData(adminUsers);
//         }

//         fetchData();
//     }, []);

//     const [setupsLineHovered, setSetupsLineHovered] = useState<number|null>(null);
//     const [setupsLineClicked, setSetupsLineClicked] = useState<number>(1);

//     const adminSetUps = useTranslations("AdminPageSetUps");

//     const setupsLines: { id: number, name: string }[] = [
//         { id: 1, name: adminSetUps("3_blocks.personData.name") },
//         { id: 2, name: adminSetUps("3_blocks.security.name") },
//         { id: 3, name: adminSetUps("3_blocks.roles.name") },
//     ] as const;

//     const [personalDataRows, setPersonalDataRows] = useState([
//         // { personalDataID: 2, personalDataName: "Name", personlData: "Gordon Harris" },
//         // { personalDataID: 3, personalDataName: "Telephone", personlData: "+375 (29) ***-**-**" },
//         { personalDataID: 2, personalDataName: adminSetUps("3_blocks.personData.fullname"), personalData: `${data.Name} ${data.Surname}` },
//         { personalDataID: 3, personalDataName: adminSetUps("3_blocks.personData.telephone"), personalData: `${data.Telephone === "" ? "+*** (**) ***-**-**" : data.Telephone}` },
//         { personalDataID: 4, personalDataName: adminSetUps("3_blocks.personData.languagesList"), personalData: "English, Belarusian, Czech" },
//     ]);

//     const [rowsOfSecurities, setRowsOfSecurities] = useState([
//         { securityID: 1, securityName: adminSetUps("3_blocks.security.email"), securityData: data.Email, securityType: "email", securityConfirmed: data.EmailConfirmed },
//         { securityID: 2, securityName: adminSetUps("3_blocks.security.password"), securityData: adminSetUps("3_blocks.security.passwordTip"), securityType: "password", securityPass1: "", securityPass2: "" },
//         { securityID: 3, securityName: adminSetUps("3_blocks.security.secretWord"), securityData: data.SecretWord, securityType: "text" },
//     ]);

//     const handleSavePhotoLanguage = async (newValue: string) => {
//         if (newValue.length === 2) {
//             startTransition(async () => {
//                 const result = await saveAdminDataUpdated({ Language: newValue });
//                 if (result.success) {
//                     toast.success(adminSetUps("3_blocks.personData.messages.language.positive"), { style: { fontSize: "1.5rem" } });
//                     router.refresh(); 
//                 } else {
//                     toast.error(adminSetUps("3_blocks.personData.messages.language.negative"), { style: { fontSize: "1.5rem" } });
//                 }
//             });
//         } else if (newValue.includes("/")) {
//             startTransition(async () => {
//                 const result = await saveAdminDataUpdated({ Photo: newValue });
//                 if (result.success) {
//                     toast.success(adminSetUps("3_blocks.personData.messages.photo.positive"), { style: { fontSize: "1.5rem" } });
//                     router.refresh();
//                 } else {
//                     toast.error(adminSetUps("3_blocks.personData.messages.photo.negative"), { style: { fontSize: "1.5rem" } });
//                 }
//             });
//         } else if (newValue === "") {
//             startTransition(async () => {
//                 const result = await saveAdminDataUpdated({ Photo: newValue });
//                 if (result.success) {
//                     toast.success(adminSetUps("3_blocks.personData.messages.photo.neutral"), { style: { fontSize: "1.5rem" } });
//                     router.refresh();
//                 } else {
//                     toast.error(adminSetUps("3_blocks.personData.messages.photo.negative"), { style: { fontSize: "1.5rem" } });
//                 }
//             });
//         }
//     }

//     const handleSavePersonalData = async (id: number, newValue: string) => {
//         if (id === 2) {
//             const [adminName, adminSurname] = newValue.split(" ");

//             startTransition(async () => {
//                 const result = await saveAdminDataUpdated({ Name: adminName, Surname: adminSurname });
//                 if (result.success && result?.redirect) {
//                     toast.success(adminSetUps("3_blocks.personData.messages.fullname.positive"), { style: { fontSize: "1.5rem" } });
//                     router.push(result.redirect); 
//                 } else {
//                     toast.error(adminSetUps("3_blocks.personData.messages.fullname.negative"), { style: { fontSize: "1.5rem" } });
//                 }
//             });
//         } else if (id === 3) {
//             startTransition(async () => {
//                 const result = await saveAdminDataUpdated({ Telephone: newValue });
//                 if (result.success) {
//                     toast.success(adminSetUps("3_blocks.personData.messages.telephone.positive"), { style: { fontSize: "1.5rem" } });
//                 } else {
//                     toast.error(adminSetUps("3_blocks.personData.messages.telephone.negative"), { style: { fontSize: "1.5rem" } });
//                 }
//             });
//         }
        
//         setPersonalDataRows((prev) => prev.map(
//             item => item.personalDataID === id ? { ...item, personalData: newValue } : item
//         ));
//     }

//     async function saveAdminDataUpdated(newAdminData: UpdateAdminData) {
//         return await adminUpdate(newAdminData, data.ID);
//     }

//     const handleSaveRowsOfSecurities = async (id: number, newValue: string) => {
//         if (id === 1) {
//             startTransition(async () => {
//                 const result = await saveAdminDataUpdated({ Email: newValue, EmailConfirmed: false });
//                 if (result.success) {
//                     toast.success(adminSetUps("3_blocks.security.messages.email.positive"), { style: { fontSize: "1.5rem" } });
//                 } else {
//                     toast.error(adminSetUps("3_blocks.security.messages.email.negative"), { style: { fontSize: "1.5rem" } });
//                 }
//             });
//         } else if (id === 2) {
//             startTransition(async () => {
//                 const result = await saveAdminDataUpdated({ Password: newValue });
//                 if (result.success) {
//                     toast.success(adminSetUps("3_blocks.security.messages.password.positive"), { style: { fontSize: "1.5rem" } });
//                 } else {
//                     toast.error(adminSetUps("3_blocks.security.messages.password.negative"), { style: { fontSize: "1.5rem" } });
//                 }
//             });
//         } else if (id === 3) {
//             startTransition(async () => {
//                 const result = await saveAdminDataUpdated({ SecretWord: newValue });
//                 if (result.success) {
//                     toast.success(adminSetUps("3_blocks.security.messages.secretWord.positive"), { style: { fontSize: "1.5rem" } });
//                 } else {
//                     toast.error(adminSetUps("3_blocks.security.messages.secretWord.negative"), { style: { fontSize: "1.5rem" } });
//                 }
//             });
//         }
        
//         setRowsOfSecurities((prev) => prev.map(
//             item => item.securityID === id ? { ...item, securityData: newValue } : item
//         ));
//     }

//     return (
//         <div style={{
//             display: "inline-grid", gridTemplateColumns: "1fr 5fr",
//             width: "100%", fontSize: "1.8rem"
//         }}>
//             <div style={{
//                 height: "79dvh", borderRight: "1px solid", padding: "3rem 2rem"
//             }}>
//                 {setupsLines.map(({ id, name }) =>
//                     <div key={id}
//                         style={{
//                             padding: "8px 16px",
//                             borderTop: id !== 1 ? "1.5px solid" : "none",
//                             borderBottom: id !== setupsLines.length ? "1.5px solid" : "none",
//                             cursor: "pointer",
//                             backgroundColor: setupsLineClicked === id ? "lightgray" :
//                                 setupsLineHovered === id ? "#f0f0f0" : "transparent"
//                         }}
//                         onMouseEnter={() => setSetupsLineHovered(id)}
//                         onMouseLeave={() => setSetupsLineHovered(null)}
//                         onClick={() => setSetupsLineClicked(id)}
//                     >
//                         {name}
//                     </div>
//                 )}
//             </div>

//             <div style={{
//                 flexGrow: "4", height: "79dvh", borderLeft: "1px solid", padding: "3rem 2rem"
//             }}>
//                 {setupsLineClicked === 1 &&
//                     <AdminDataComponent photo={data.Photo} language={data.Language} onSave={handleSavePhotoLanguage}>
//                         <PersonalDataRows personalDataArray={personalDataRows} onSave={handleSavePersonalData} />
//                     </AdminDataComponent>
//                 }

//                 {setupsLineClicked === 2 &&
//                     <AdminSecurityComponent>
//                         <SecurityRows securityArray={rowsOfSecurities} onSave={handleSaveRowsOfSecurities} />
//                     </AdminSecurityComponent>
//                 }
                
//                 {setupsLineClicked === 3 &&
//                     <AdminUsersComponent>
//                         <AdminUsersTable data={adminData} />
//                     </AdminUsersComponent>
//                 }
//             </div>
//         </div>
//     )
// }

// export default AdminSetUps;




import AdminSetUps from "@/components/AdminSetUps/AdminSetUps";
import { use } from "react";


export type AdminPersonTypes = {
    ID: number,
    Name: string,
    Surname: string,
    Email: string,
    EmailConfirmed: boolean,
    Telephone: string|null,
    Photo: string,
    Language: string,
    SecretWord: string
}


async function fetchData() {
    const response = await fetch(`http://localhost:3000/api/adminPerson`, { cache: "no-store" });
    const adminLine = await response.json();

    return adminLine;
}


export default function SetupsLayout() {

    const adminLine: AdminPersonTypes = use(fetchData());

    return (
        <>
            <AdminSetUps {...adminLine} />
        </>
    );
}
