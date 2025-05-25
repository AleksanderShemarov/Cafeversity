"use client";

import AccessBtn from "../Buttons/DifferentButtons"
import ImageContainer from "../ImageEditor/ImageContainer"
import { useState } from "react";

import AdminHeaderOptions from "./AdminHeaderOptions";


export default function AdminHeaderBlock() {

    const [dark, setDark] = useState<boolean>(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "1rem 2.5rem", borderRadius: "1rem", backgroundColor: "#B8860B",
            }}>
                <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "4rem", cursor: "pointer" }} onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
                        <ImageContainer img_path="/menu_list_icon.webp" style={{
                            height: "90%", width: "90%",
                            marginTop: 0, marginBottom: 0,
                            boxShadow: "wheat 0 0 2px 3px",
                            margin: "0 auto",
                            backgroundColor: "whitesmoke"
                        }} />
                    </div>
                    <p style={{ fontSize: "3rem", margin: 0 }}>Admin&#39;s Menu</p>
                </div>
                <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", gap: "4.5rem" }}>
                    <AccessBtn onClick={() => {
                        if (!dark) {
                            setDark(!dark);
                            alert("DARK THEME");
                        } else {
                            setDark(!dark);
                            alert("LIGHT THEME");
                        }
                    }} buttonName={dark ? "Light" : "Dark"}
                    additionalStyle={{
                        paddingLeft: "6rem", paddingRight: "6rem",
                        backgroundColor: dark ? "whitesmoke" : "darkgray",
                        color: !dark ? "whitesmoke" : "darkgray",
                        boxShadow: "gray 0 0 3px 2px",
                        cursor: "pointer"
                    }} />
                    <div style={{ width: "7.5rem" }}>
                        <ImageContainer img_path={null} style={{
                            height: "90%", width: "90%",
                            marginTop: 0, marginBottom: 0,
                            boxShadow: "black 0 0 2px 3px",
                            margin: "0 auto"
                        }} />
                    </div>
                </div>
            </div>

            <AdminHeaderOptions isOptionsOpen={isOptionsOpen} />
        </>
    )
}
