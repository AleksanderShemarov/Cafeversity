import { IconTrash, IconUpload } from "@tabler/icons-react";
import ImageContainer from "../ImageEditor/ImageContainer";


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


const AdminDataComponent = ({ children }: { children: React.ReactNode }) => {

    const languageChange = (language: string) => {
        const lang = langs.filter(langRow => langRow[1] === language).flat();
        alert(`The Admin's Section will be translated in "${lang[0]}" language.`);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ width: "18rem" }}>
                    <ImageContainer img_path={null} style={{
                        height: "90%", width: "90%",
                        marginTop: 0, marginBottom: 0,
                        boxShadow: "black 0 0 2px 3px",
                        margin: "0 auto",
                    }} />
                </div>
                <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", gap: "1.75rem" }}>
                    <button style={{ borderRadius: "1rem", padding: "8px 16px", color: "red",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        gap: "1.5rem", fontSize: "1.6rem", fontWeight: "600"
                    }}
                        onClick={() => {}}
                    >
                        <IconTrash style={{ color: "red" }} /> Delete
                    </button>
                        <button style={{ borderRadius: "1rem", padding: "8px 16px",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        gap: "1.5rem", fontSize: "1.6rem", fontWeight: "600"
                    }}
                        onClick={() => {}}
                    >
                        <IconUpload /> Upload
                    </button>
                </div>
            </div>

            <hr style={{ border: "1px solid", width: "100%", borderRadius: "0.5px" }} />

            {children}

            <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
                    Page&apos;s Language
                </p>
                <select name="langs"
                    style={{
                        fontSize: "1.6rem", fontWeight: "500", border: "none",
                        padding: "8px 16px 8px 4px", textAlign: "justify",
                        borderRadius: "1rem", backgroundColor: "rgb(237, 237, 237)"
                    }}
                    onChange={e => languageChange(e.target.value)}
                >
                    {langs.map((lang, index) =>
                        <option key={index} value={lang[1]}
                            style={{
                                textAlign: "left",
                                borderRadius: "1rem",
                                backgroundColor: "rgb(237, 237, 237)"
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
