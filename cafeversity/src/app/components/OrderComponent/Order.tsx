"use client";

import CardImage from "@/components/CardParts/CardImage";
import { IconCircleCheck, IconExclamationCircle, IconSquareX, IconXboxX } from "@tabler/icons-react";
import AccessBtn from "@/components/Buttons/DifferentButtons";
import Select, { CSSObjectWithLabel } from "react-select";
import HorizontalLine from "@/components/OtherParts/HorizontalLine";


const Cafes: {label: string, value: string}[] = [
    { label: "Кафэ Франціска Скарыны", value: "1" },
    { label: "Кафэ Аляксандра Кашкі", value: "2" },
    { label: "Кафэ Эдгару Кодду", value: "3" }
];

const Times: {label: string, value: string}[] = [
    { label: "10:00 – 11:00", value: "10:00 – 11:00" },
    { label: "10:30 – 11:30", value: "10:30 – 11:30" },
    { label: "11:00 – 12:00", value: "11:00 – 12:00" },
    { label: "11:30 – 12:30", value: "11:30 – 12:30" },
    { label: "12:00 – 13:00", value: "12:00 – 13:00" },
    { label: "12:30 – 13:30", value: "12:30 – 13:30" },
    { label: "13:00 – 14:00", value: "13:00 – 14:00" },
    { label: "13:30 – 14:30", value: "13:30 – 14:30" },
    { label: "14:00 – 15:00", value: "14:00 – 15:00" },
];


export default function Order() {

    const available: boolean|null = null;

    const parts = [1, 2, 3, 4, 5];

    const cafeSelectOptionWidth = {
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            minWidth: "21rem",
            fontSize: "1.4rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            minWidth: "21rem",
            fontSize: "1.2rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
        }),
        singleValue: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
        }),
        dropdownIndicator: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
            '&:hover': {
                color: "gold",
            },
        }),
        option: (base: CSSObjectWithLabel, state: { isFocused: boolean, isSelected: boolean }) => ({
            ...base,
            backgroundColor: state.isSelected ? "rgb(48, 151, 255)" : state.isFocused ? "darkgrey" : "var(--background-color)",
            color: state.isSelected ? "gold" : state.isFocused ? "gold" : "var(--text-color)",
        }),
        input: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
        }),
    }

    const timeSelectOptionWidth = {
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            minWidth: "10rem",
            fontSize: "1.4rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
            zIndex: 12,
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "auto",
            minWidth: "10rem",
            fontSize: "1.2rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
        }),
        singleValue: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
        }),
        dropdownIndicator: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
            '&:hover': {
                color: "gold",
            },
        }),
        option: (base: CSSObjectWithLabel, state: { isFocused: boolean, isSelected: boolean }) => ({
            ...base,
            backgroundColor: state.isSelected ? "rgb(48, 151, 255)" : state.isFocused ? "darkgrey" : "var(--background-color)",
            color: state.isSelected ? "gold" : state.isFocused ? "gold" : "var(--text-color)",
        }),
        input: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
        }),
    }

    return (
        <div style={{
            width: "50%", height: "30vh",
            backgroundColor: "#f2dabfff",
            borderRadius: "1rem",
        }}>
            <div style={{}}>
                <p style={{
                    textAlign: "center", fontSize: "1.5rem", fontWeight: "400",
                    width: "fit-content", margin: "0.5rem auto",
                }}>Current Order</p>
            </div>
            <div style={{
                borderRadius: "1rem",
                padding: "0.5rem 1.5rem",
                backgroundColor: "rgb(252, 242, 223)",
                marginLeft: "0.75rem", marginRight: "0.75rem",
                height: "10vh", overflowY: "auto",
                marginBottom: "0.5rem"
            }}>
                {parts.map(part =>
                    <div key={part} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        marginTop: "0.5rem", marginBottom: "0.5rem"
                    }}>
                        <div style={{ fontSize: "1.25rem", width: "1.5rem", textAlign: "right" }}>
                            {part}.
                        </div>
                        <div style={{ height: "3rem", width: "5rem" }}>
                            <CardImage imagePath={"/no_image1.jpg"}
                                style={{ borderRadius: "0.5rem" }}
                                fill
                            />
                        </div>
                        <div style={{
                            // outline: "1px solid",
                            width: "25rem", padding: "0 0.5rem",
                            height: "2.75rem"
                        }}>
                            <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 300 }}>Dish with Different Sauces</p>
                        </div>
                        <div style={{
                            // outline: "1px solid",
                            width: "3rem", padding: "0 0.5rem", textAlign: "center"
                        }}>
                            <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 300 }}>300g</p>
                        </div>
                        <div style={{ height: "3rem", width: "3rem", borderRadius: "50%" }}>
                            {available === null
                            ? <IconExclamationCircle style={{ width: "3rem", height: "3rem", color: "orangered" }} />
                            : available ? <IconCircleCheck style={{ width: "3rem", height: "3rem", color: "green" }} />
                            : <IconXboxX style={{ width: "3rem", height: "3rem", color: "red" }} />
                            }
                        </div>
                        <div style={{
                            // outline: "1px solid",
                            width: "5rem", padding: "0 0.5rem", textAlign: "center"
                        }}>
                            <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 300 }}>0.00BYN</p>
                        </div>
                        <div
                            style={{
                                borderRadius: "10%",
                                // backgroundColor: "red",
                                height: "3rem",
                                width: "3rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                // outline: "1px solid"
                            }}
                            // onClick={() => {
                            //     // deletion(datum.id)
                            // }}
                        >
                            <IconSquareX style={{ height: "3rem", width: "3rem", color: "red", backgroundColor: "white" }} />
                        </div>
                    </div>
                )}
            </div>
            <HorizontalLine cssProps={{ marginLeft: "0.75rem", marginRight: "0.75rem" }} />
            <div style={{
                display: "flex", alignItems: "center", gap: "3.5rem", justifyContent: "center",
                marginTop: "0.5rem", marginBottom: "0.5rem"
            }}>
                <div>
                    <p style={{ fontSize: "1.25rem", margin: "0.5rem 0.75rem", textAlign: "center" }}>Choose Cafe</p>
                    <Select options={Cafes}
                        instanceId="custom-select"
                        menuPlacement="auto"
                        styles={cafeSelectOptionWidth}
                        onChange={() => {}
                            // selectedOption => {
                            //     familyChange(selectedOption?.value as string);
                            // }
                        }
                        isSearchable={false}
                    />
                </div>
                <div>
                    <p style={{ fontSize: "1.25rem", margin: "0.5rem 0.75rem", textAlign: "center" }}>Choose Time</p>
                    <Select options={Times}
                        instanceId="custom-select"
                        menuPlacement="auto"
                        styles={timeSelectOptionWidth}
                        onChange={() => {}
                            // selectedOption => {
                            //     familyChange(selectedOption?.value as string);
                            // }
                        }
                        isSearchable={false}
                    />
                </div>
            </div>
            <HorizontalLine cssProps={{ marginLeft: "0.75rem", marginRight: "0.75rem" }} />
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-around", marginTop: "0.5rem"
            }}>
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                    borderRadius: "1rem", backgroundColor: "rgb(252, 242, 223)",
                }}>
                    <p style={{ fontSize: "1.25rem", margin: "0.5rem 0.75rem" }}>Tel:</p>
                    <input type="text" placeholder="Telephone"
                    // value=""
                    style={{
                        border: "none", borderBottom: "2.5px solid orange", backgroundColor: "inherit",
                        paddingLeft: "0.75rem", paddingRight: "0.75rem", outline: "none", margin: "0.5rem 0.75rem"
                    }} />
                </div>
                <div style={{ borderRadius: "1rem", backgroundColor: "rgb(252, 242, 223)" }}>
                    <p style={{ fontSize: "1.25rem", margin: "0.5rem 0.75rem", textAlign: "center" }}>Optional Comment</p>
                    <input type="textarea"
                    // value="n"
                    style={{
                        border: "none", backgroundColor: "inherit",
                        paddingLeft: "0.75rem", paddingRight: "0.75rem",
                        outline: "1px solid black", margin: "0.5rem 0.75rem",
                        borderRadius: "0.5rem"
                    }} />
                </div>
                <AccessBtn buttonName="Submit" onClick={() => {}} additionalStyle={{
                    fontSize: "1.25rem", paddingLeft: "5rem", paddingRight: "5rem",
                    height: "3rem"
                }} />
            </div>
        </div>
    );
}
