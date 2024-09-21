"use client";

import { BottomButtonsContext } from "@/components/BottomMenu/BottomMenu";
import BottomMenu from "@/components/BottomMenu/BottomMenu";
import ImageEditor from "@/components/ImageEditor/ImageEditor";
import { useState, useReducer, useEffect, useRef } from "react";
import setStyles from "./settings.module.css";
import TextFormField from "@/components/FormFields/TextFormField";
import StickyNavBar from "@/components/StickySettingsNavBar/StickyNavBar";
import DialogView from "@/components/Dialog/DialogView";
import AccessBtn, { DenyBtn } from "@/components/Buttons/DifferentButtons";


type bottomBtns = {
    name: string,
    icon: string,
    icon_alt: string,
    topMargin?: number,
    path?: string,
}

type userDataTypes = {
    firstName: string,
    lastName: string,
    nickName: string,
    userPhoto: string|null,
}

interface State {
    firstName: string,
    lastName: string,
    nickName: string,
    userPhoto: string|null,
}

type Action = 
| { type: "SET_REAL_USER_DATA"; payload: State }
| { type: "firstNameChange"; firstName: string }
| { type: "lastNameChange"; lastName: string }
| { type: "nicknameChange"; nickName: string };


function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_REAL_USER_DATA": {
            return {
                ...state,
                ...action.payload,
            };
        }
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
                nickName: action.nickName,
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
    const settingsLinks: string = "#section";

    const switching = (index: number) => {
        const newParts = Array(checking.length).fill(false);
        newParts[index] = !(checking[index]);
        setChecking(newParts);
    }

    
    const [userData, setUserData] = useState<userDataTypes>({ firstName: "Pat", lastName: "Postman", nickName: "WestOak", userPhoto: null });
    const [imagePath, setImagePath] = useState<string>("/uploads/tempUserImage.png");
    const [imageFileId, setImageFileId] = useState<string>("");

    const imageEditorRef = useRef<{ photoServerSave: () => Promise<void> }>(null);


    const [state, dispatch] = useReducer(reducer, userData);
    
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
            nickName: event.target.value
        })
    }

    useEffect(() => {
        fetch(`http://localhost:3000/api/userData?name=${authorizedUser}&page=settings`)
        .then(res => res.json())
        .then(data => {
            setUserData(data);
            dispatch({ type: 'SET_REAL_USER_DATA', payload: data });
            if (data.userPhoto !== null) setImagePath(data.userPhoto);
            console.log("API data");
            console.dir(data);
        });
    }, [authorizedUser]);


    async function saveNewCommonUserData() {

        const imagePathArray = imagePath.split("");
        const deletedNotAccessSymbols = imageFileId.replace(/[^a-zA-Z0-9_]/g, '');
        imagePathArray.splice(imagePath.lastIndexOf("."), 0, `_${deletedNotAccessSymbols}`);

        const dataForm = {
            oldName: authorizedUser,
            oldNickname: userData.nickName,

            newName: state.firstName,
            newSurname: state.lastName,
            newNickname: state.nickName,

            newUserPhoto: imagePath !== "/uploads/tempUserImage.png" ?
            `/uploads/${imagePathArray.join("")}` :
            null,
        }

        await fetch("http://localhost:3000/api/userData?page=settings", {
            method: "POST",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(dataForm),
        })
        .then((res) => {
            console.log(res.status);
            return res.json();
        })
        .then(async (data) => {
            console.log(data);
            let serverAnswer;
            if (imageEditorRef.current) {
                serverAnswer = await imageEditorRef.current.photoServerSave(); // Save the image to the server
            }
            if (data.status === "Success" && data.status === serverAnswer) {
                window.location.href = data.redirect;
            }
        })
        .catch((error) => console.error(error));
    }

    function denyNewCommonUserData() {
        dispatch({ type: 'SET_REAL_USER_DATA', payload: userData });
    }


    const settingsTextFormFields = [
        { fieldName: "First Name", fieldValue: state.firstName, fieldPlaceholder: state.firstName, changeFunc: firstNameChange, },
        { fieldName: "Last Name", fieldValue: state.lastName, fieldPlaceholder: state.lastName, changeFunc: lastNameChange, },
        { fieldName: "Nickname", fieldValue: state.nickName, fieldPlaceholder: state.nickName, changeFunc: nicknameChange, },
    ];


    const [buttons, setButtons] = useState<boolean>(true);
    const [dialog, setDialog] = useState<string>("");

    console.dir(userData);

    return (
        <>
            <StickyNavBar>
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
                        <a href={`${settingsLinks}${index}`} style={{ textDecoration: "none", color: "none" }}>{part}</a>
                    </p>
                )}
            </StickyNavBar>
            <ImageEditor ref={imageEditorRef}
                getImagePath={state.userPhoto}
                setImagePath={setImagePath}
                setImageFileId={setImageFileId}
                disabled={buttons}
                id="section0"
            />
            <form className={setStyles.commonSet}>
                {settingsTextFormFields.map((settingTextFormField, index) => 
                    <TextFormField
                        key={`SettingTextField__${index}`}
                        fieldName={settingTextFormField.fieldName}
                        fieldValue={settingTextFormField.fieldValue}
                        fieldPlaceholder={settingTextFormField.fieldPlaceholder}
                        inputStyles={setStyles.textInput}
                        labelStyles={setStyles.inputLabel}
                        onChange={settingTextFormField.changeFunc}
                        disabled={buttons}
                    />
                )}
            </form>
            <hr style={{ border: "5px double gray" }} />

            {dialog && (
                <DialogView question={
                    (/Save/.test(dialog) && "Ці згодзен Ты са зменамі?")
                    ||
                    (/Deny/.test(dialog) && "Хочаш адмяніць змены?")
                }>
                    <AccessBtn
                        uniqueStyle={{ paddingLeft: "60px", paddingRight: "60px" }}
                        onClick={() => {
                            if (/Save/.test(dialog)) saveNewCommonUserData();
                            if (/Deny/.test(dialog)) denyNewCommonUserData();
                            setButtons(!buttons);
                            setDialog("");
                            document.body.style.overflow = 'auto';
                        }}
                        buttonName="Так"
                    />
                    <DenyBtn
                        uniqueStyle={{ paddingLeft: "60px", paddingRight: "60px", backgroundColor: "orange" }}
                        onClick={() => {
                            setDialog("");
                            document.body.style.overflow = 'auto';
                        }}
                        buttonName="Не"
                    />
                </DialogView>
            )}

            <div className={setStyles.commonSetsBtns}>
                <button
                    className={setStyles.cancelBtn}
                    disabled={buttons}
                    style={buttons ? {
                        backgroundColor: "lightgray",
                        color: "gray",
                        pointerEvents: "none",
                    } : {}}
                    onClick={() => {
                        if (buttons) setButtons(!buttons);
                        else {
                            setDialog("Deny_Button");
                            document.body.style.overflow = 'hidden';
                        }
                    }}
                >
                    <span className={setStyles.btn_name}>Cancel</span>
                </button>
                <button
                    className={setStyles.saveBtn}
                    onClick={() => {
                        if (buttons) setButtons(!buttons);
                        else {
                            setDialog("Save_Button");
                            document.body.style.overflow = 'hidden';
                        }
                    }}
                >
                    <span className={setStyles.btn_name}>{`${buttons ? "Change" : "Save"}`}</span>
                </button>
            </div>
            <p>There will be another settings: ...</p>

            <div style={{
                height: "70vh",
                outline: "2px dashed black",
                borderRadius: "1%/2%",
                padding: "1em",
                backgroundColor: "white",
                scrollMarginTop: "180px",
            }} id="section1">
                <p style={{
                    fontSize: "30px",
                    fontWeight: "400",
                    fontFamily: "Consolas, monospace",
                }}>Tasties & Body Constitution</p>
            </div>
            <div style={{
                height: "60vh",
                outline: "2px dashed black",
                borderRadius: "1%/2%",
                padding: "1em",
                backgroundColor: "white",
                scrollMarginTop: "180px",
            }} id="section2">
                <p style={{
                    fontSize: "30px",
                    fontWeight: "400",
                    fontFamily: "Consolas, monospace",
                }}>Page Appearance</p>
            </div>
            
            <BottomButtonsContext.Provider value={BottomBtns}>
                <BottomMenu />
            </BottomButtonsContext.Provider>
        </>
    )
}
