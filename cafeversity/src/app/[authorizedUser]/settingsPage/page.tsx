"use client";

import { BottomButtonsContext } from "@/components/BottomMenu/BottomMenu";
import BottomMenu from "@/components/BottomMenu/BottomMenu";
import ImageEditor from "@/components/ImageEditor/ImageEditor";
import { useState, useReducer } from "react";
import setStyles from "./settings.module.css";
import TextFormField from "@/components/FormFields/TextFormField";


type bottomBtns = {
    name: string,
    icon: string,
    icon_alt: string,
    topMargin?: number,
    path?: string,
}

interface State {
    firstName: string,
    lastName: string,
    nickname: string,
}

type Action = 
| { type: "firstNameChange"; firstName: string }
| { type: "lastNameChange"; lastName: string }
| { type: "nicknameChange"; nickname: string };


function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "firstNameChange": {
            return {
                ...state,
                firstName: action.firstName,  
            };
        }
        case "lastNameChange": {
            return {
                ...state,
                lastName: action.lastName,
            };
        }
        case "nicknameChange": {
            return {
                ...state,
                nickname: action.nickname,
            };
        }
        default: {
            // return state;
            const exhaustiveCheck: never = action;
            throw new Error(`Unknown action: ${exhaustiveCheck}`);
        }
    }
}


export default function SettingsPage({ params }: { params: { authorizedUser: string } }) {

    const { authorizedUser } = params;

    const BottomBtns: bottomBtns[] = [
        { name: "Меню", icon: "/menu_list_icon.webp", icon_alt: "Menu_List_Icon", topMargin: 50, },
        { name: "Агульная", icon: "/account_icon.png", icon_alt: "Account_Icon",
            path: `/${authorizedUser}` },
        { name: "Навіны", icon: "/earth_planet.webp", icon_alt: "Earth_Icon", topMargin: 50, },
    ];

    const parts: string[] = ["Common Settings", "Tasties & Body Constitution", "Page Appearance"];

    const [checking, setChecking] = useState<boolean[]>([true, false, false]);
    const [state, dispatch] = useReducer(reducer, { firstName: "Pat", lastName: "Postman", nickname: "WestOak" });
    
    function firstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: "firstNameChange",
            firstName: event.target.value
        })
    }

    function lastNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: "lastNameChange",
            lastName: event.target.value
        })
    }

    function nicknameChange(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: "nicknameChange",
            nickname: event.target.value
        })
    }

    const switching = (index: number) => {
        const newParts = Array(checking.length).fill(false);
        newParts[index] = !(checking[index]);
        setChecking(newParts);
    }

    const settingsTextFormFields = [
        { fieldName: "First Name", fieldValue: state.firstName, fieldPlaceholder: "John", changeFunc: firstNameChange, },
        { fieldName: "Last Name", fieldValue: state.lastName, fieldPlaceholder: "Doe", changeFunc: lastNameChange, },
        { fieldName: "Nickname", fieldValue: state.nickname, fieldPlaceholder: "Done!", changeFunc: nicknameChange, },
    ];

    return (
        <>
            <h2 style={{ fontFamily: "Consolas, monospace" }}>Account Settings</h2>
            <hr style={{ backgroundColor: "black", height: "3px" }} />
            <div style={{
                // border: "3px solid black",
                display: "flex",
                fontFamily: "Consolas, monospace",
                fontSize: "20px",
            }}>
                {parts.map((part, index) =>
                    <p
                        key={index}
                        onClick={() => switching(index)}
                        className={setStyles.bar_link}
                        style={{
                            color: checking[index] ? "#714efe" : "black",
                            borderBottom: checking[index] ? "3px solid #714efe" : "none",
                        }}
                    >
                        {part}
                    </p>
                )}
            </div>
            <ImageEditor />
            <form action="" method="post" className={setStyles.commonSet}>
                {settingsTextFormFields.map((settingTextFormField, index) => 
                    <TextFormField
                        key={`SettingTextField__${index}`}
                        fieldName={settingTextFormField.fieldName}
                        fieldValue={settingTextFormField.fieldValue}
                        fieldPlaceholder={settingTextFormField.fieldPlaceholder}
                        inputStyles={setStyles.textInput}
                        labelStyles={setStyles.inputLabel}
                        onChange={settingTextFormField.changeFunc}
                    />
                )}
            </form>
            {/* <p>There will be another settings: ...</p> */}
            <BottomButtonsContext.Provider value={BottomBtns}>
                <BottomMenu />
            </BottomButtonsContext.Provider>
        </>
    )
}
