import { useState } from "react";
import ImageContainer from "../ImageEditor/ImageContainer"


export default function AdminHeaderOptions({ isOptionsOpen }: { isOptionsOpen: boolean }) {

    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <>
            <div style={{
                maxWidth: "100%", backgroundColor: "rgba(184, 135, 11, 0.215)", padding: "2rem 5rem",
                display: isOptionsOpen ? "block" : "none", position: "absolute", left: 0, right: 0,
                marginTop: "0.5rem", zIndex: 1, backdropFilter: "blur(1rem)"
            }}>
                <div style={{
                    display: "flex", flexDirection: "row", flexWrap: "wrap",
                    justifyContent: "space-between", alignItems: "center",
                    width: "100%"
                }}>
                    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                        style={{
                            // border: "2px solid",
                            display: "flex", flexDirection: "column", alignItems: "center",
                            padding: "1.5rem 5rem", position: "relative",
                            height: "5rem"
                        }}
                    >
                        <div style={{
                            width: "5rem", cursor: "pointer", position: "absolute", top: isHovered ? 0 : "20%"
                        }}>
                            <ImageContainer img_path="/menu_list_icon.webp"
                            style={{
                                height: "90%", width: "90%",
                                marginTop: 0, marginBottom: 0,
                                boxShadow: "wheat 0 0 2px 3px",
                                margin: "0 auto",
                                backgroundColor: "whitesmoke"
                            }}/>
                        </div>
                        <p style={{
                            margin: "1rem 0 0 0", display: isHovered ? "block" : "none", textAlign: "center",
                            fontSize: "2rem", fontWeight: "400", position: "absolute",
                            bottom: isHovered ? 0 : "50%"
                        }}>
                            Page1
                        </p>
                    </div>

                    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                        style={{
                            display: "flex", flexDirection: "column", alignItems: "center",
                            padding: "1.5rem 5rem", position: "relative",
                            height: "5rem"
                        }}
                    >
                        <div style={{ width: "5rem", cursor: "pointer", position: "absolute", top: isHovered ? 0 : "20%" }}>
                            <ImageContainer img_path="/menu_list_icon.webp" style={{
                                height: "90%", width: "90%",
                                marginTop: 0, marginBottom: 0,
                                boxShadow: "wheat 0 0 2px 3px",
                                margin: "0 auto",
                                backgroundColor: "whitesmoke"
                            }} />
                        </div>
                        <p style={{
                            margin: "1rem 0 0 0", display: isHovered ? "block" : "none", textAlign: "center",
                            fontSize: "2rem", fontWeight: "400", position: "absolute",
                            bottom: isHovered ? 0 : "50%"
                        }}>
                            Page2
                        </p>
                    </div>

                    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                        style={{
                            display: "flex", flexDirection: "column", alignItems: "center",
                            padding: "1.5rem 5rem", position: "relative",
                            height: "5rem"
                        }}
                    >
                        <div style={{ width: "5rem", cursor: "pointer", position: "absolute", top: isHovered ? 0 : "20%" }}>
                            <ImageContainer img_path="/menu_list_icon.webp" style={{
                                height: "90%", width: "90%",
                                marginTop: 0, marginBottom: 0,
                                boxShadow: "wheat 0 0 2px 3px",
                                margin: "0 auto",
                                backgroundColor: "whitesmoke"
                            }} />
                        </div>
                        <p style={{
                            margin: "1rem 0 0 0", display: isHovered ? "block" : "none", textAlign: "center",
                            fontSize: "2rem", fontWeight: "400", position: "absolute",
                            bottom: isHovered ? 0 : "50%"
                        }}>
                            Page3
                        </p>
                    </div>
                </div>                
            </div>
        </>
    );
}
