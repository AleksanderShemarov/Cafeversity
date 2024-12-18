"use client";

import ImageEditor from "@/components/ImageEditor/ImageEditor";
import { useState, useReducer, useEffect, useRef } from "react";
import setStyles from "./settings.module.css";
import TextFormField from "@/components/FormFields/TextFormField";
import StickyNavBar from "@/components/StickySettingsNavBar/StickyNavBar";
import DialogView from "@/components/Dialog/DialogView";
import AccessBtn, { DenyBtn } from "@/components/Buttons/DifferentButtons";
import PageExterior from "@/components/PageAppearanceSets/PageExterior";
import CustomSelect from "@/components/OptionsChoice/CustomSelect";
import ColourSets from "@/components/ColoursPageSets/ColourSets";
import RadiosChoice from "@/components/RadiosChoice/Radios";
import FontsFamilySizeWeight from "@/components/FontsSettings/FontsSetUps";
import TastesNBodyConstition from "@/components/TastesSettings/Tastes&BodyConst";
import TastesCheckboxes, { ParagraphFor } from "@/components/TastesSettings/MildSpicy/TasteCheckboxes";
import RangeInput2Handlers from "@/components/TastesSettings/CaloriesRange/RangeOfCalories";
import SubTitle from "@/components/OtherParts/SubTitle/SubTitle";
import HorizontalLine from "@/components/OtherParts/HorizontalLine/HorizontalLine";
import useThemeSets from "@/hooks/themeSets";
import useAccentColourSet from "@/hooks/accentColourSet";
import useFontFamilySet from "@/hooks/fontFamilySet";
// import PLFSetUps from "@/components/TastesSettings/ProteinLipidFat/PLFSetUps";


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


const langs: [string, string, string][] = [
    [ "Belarusian", "Беларуская", "/countries/Belarus_borders.jpg" ],
    [ "English", "English", "/countries/UK_borders.jpg" ],
    [ "Czech", "Čeština", "/countries/CzechRepublic_borders.jpg" ],
    [ "Polish", "Polski", "/countries/Poland_borders.jpg" ],
    [ "Ukranian", "Українська", "/countries/Ukraine_borders.jpg" ],
    [ "Lithuanian", "Lietuvių", "/countries/Lithuania_borders.jpg" ],
    [ "Italian", "Italiano", "/countries/Italy_borders.jpeg" ],
    [ "French", "Français", "/countries/France_borders.jpg" ],
    [ "Turkish", "Türkçe", "/countries/Turkey_borders.jpg" ],
    [ "Japanese", "日本語", "/countries/Japan_borders.jpg" ],
    // ["Russian", "Русский", "/countries/russia_border.jpg"],
];


export default function SettingsPage({ params }: { params: { authorizedUser: string } }) {

    const { authorizedUser } = params;

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


    // light/dark theme settings
    const [theme, setTheme] = useThemeSets();
    function switchBetweenColourThemes(index: number) {
        const newTheme = index === 0 ? 'light' : 'dark';
        setTheme(newTheme);
    }
    /*
    Clicking on "Refresh" button in a browser makes the changing between
    light/dark page's mode broken because of desynchronization between
    Server and Client parts. useEffect solves that problem.
    */
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);


    // accent colour settings
    const [accentColour, setAccentColour] = useAccentColourSet();

    
    // font family settings
    const [fontFamilyType, setFontFamilyType] = useFontFamilySet();

    return (
        <>
            <StickyNavBar>
                {parts.map((part, index) =>
                    <p
                        key={index}
                        onClick={(event) => {
                            event.preventDefault();
                            document.querySelector(`${settingsLinks}${index}`)?.scrollIntoView({ behavior: "smooth" });
                            switching(index);
                        }}
                        className={setStyles.bar_link}
                        style={{
                            borderBottom: checking[index] ? "3px solid #714efe" : "none",
                            pointerEvents: checking[index] ? "none" : "auto",
                        }}
                    >
                        <a
                            href={`${settingsLinks}${index}`}
                            style={{ textDecoration: "none", color: checking[index] ? "#714efe" : "var(--text-color)", }}
                        >
                            {part}
                        </a>
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


            <HorizontalLine cssProps={{ border: "5px double gray", marginTop: "10px", marginBottom: "10px" }} />


            <TastesNBodyConstition id="section1">
                <SubTitle name="Choose your preferencies" />
                <TastesCheckboxes />
                
                <HorizontalLine />

                <SubTitle name="Average amount of calories per day" />
                <ParagraphFor sentence="How many calories do you want to get per day?">
                    <RangeInput2Handlers twohandRangeName="caloriesRangeSlider" />
                </ParagraphFor>
                {/* <hr /> */}
                {/* <PLFSetUps /> */}
                {/* <BodyConstitution /> */}
            </TastesNBodyConstition>


            <HorizontalLine cssProps={{ border: "5px double gray", marginTop: "10px", marginBottom: "10px" }} />


            <PageExterior id="section2">
                <SubTitle name="Language" />
                <CustomSelect
                    labelName="Choose your native language: "
                    selectorName="languages"
                    options={langs}
                />

                <HorizontalLine />

                {mounted && <>
                <SubTitle name="Interface Themes" />
                <ColourSets
                    name="Customise your application theme"
                    theme={theme}
                    switcher={switchBetweenColourThemes}
                />
                </>}

                <HorizontalLine />

                <SubTitle name="Brand (Accent) Colours" />
                <RadiosChoice
                    choseRadio={accentColour}
                    hookFunction={setAccentColour}
                />

                <HorizontalLine />
                
                <SubTitle name="Font Settings" />
                <FontsFamilySizeWeight fontFamily={fontFamilyType} hookFunction={setFontFamilyType} />
            </PageExterior>

            {dialog && (
                <DialogView question={
                    (/Save/.test(dialog) && "Ці згодзен Ты са зменамі?")
                    ||
                    (/Deny/.test(dialog) && "Хочаш адмовіць змены?")
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
        </>
    )
}
