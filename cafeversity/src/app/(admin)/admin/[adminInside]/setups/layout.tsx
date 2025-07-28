import AdminSetUps from "./page";
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


async function fetchData(params: { adminInside: string }) {
    const { adminInside } = params;

    const response = await fetch(`http://localhost:3000/api/adminPerson?adminName=${adminInside}`, { cache: "no-store" });
    const adminLine = await response.json();

    return adminLine;
}


export default function SetupsLayout({ params }: { params: { adminInside: string } }) {

    const adminLine: AdminPersonTypes = use(fetchData(params));

    return (
        <>
            <AdminSetUps {...adminLine} />
        </>
    );
}
