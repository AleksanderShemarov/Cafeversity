import { IconTrash, IconUpload } from "@tabler/icons-react";
import ImageContainer from "../ImageEditor/ImageContainer";


const AdminDataComponent = ({ children }: { children: React.ReactNode }) => {
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
        </div>
    )
}

export default AdminDataComponent;
