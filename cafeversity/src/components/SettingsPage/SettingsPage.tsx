"use client";

import ImageEditor from "@/components/ImageEditor/ImageEditor";
import { useState, useReducer, useEffect, useRef } from "react";
import setStyles from "./settings.module.css";
import TextField from "@/components/FormFields/TextField";
import DialogView from "@/components/Dialog/DialogView";
import AccessBtn, { DenyBtn } from "@/components/Buttons/DifferentButtons";
import CustomSelect from "@/components/OptionsChoice/CustomSelect";
import ColourSets from "@/components/ColoursPageSets/ColourSets";
import RadiosBlock from "@/components/RadiosChoice/Radios";
import FontsFamilySizeWeight from "@/components/FontsSettings/FontsSetUps";
import TastesCheckboxes from "@/components/TastesSettings/MildSpicy/TasteCheckboxes";
import RangeInput2Handlers from "@/components/TastesSettings/CaloriesRange/RangeOfCalories";
import SubTitle from "@/components/PageBlocks/SubTitle/SubTitle";
import HorizontalLine from "@/components/OtherParts/HorizontalLine";
import useThemeSets from "@/hooks/themeSets";
import useAccentColourSet from "@/hooks/accentColourSet";
import useFontFamilySet from "@/hooks/fontFamilySet";
import useFontSizeSet from "@/hooks/fontSizeSet";
import useFontVolumeSet from "@/hooks/fontVolume";

import { useTranslations } from "next-intl";
import { UserDataTypes } from "@/app/[authorizedUser]/settingsPage/page";
import PageBlockName from "@/components/PageBlocks/PageBlockName";
import Paragraph from "../PageBlocks/Paragraphs/Paragraph";
import SaveDenyPanel from "../SaveDenyPanel/SaveDenyPanel";
import FormBlock from "../FormFields/FormBlock";
// import PLFSetUps from "@/components/TastesSettings/ProteinLipidFat/PLFSetUps";

import { useRouter } from "next/navigation";// for "saveLanguageSet" function


interface ActualUser {
    authorizedUser: string,
    userData: UserDataTypes
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
    [ "Беларуская", "by", "/countries/Belarus_borders.jpg" ],
    [ "English", "en", "/countries/UK_borders.jpg" ],
    [ "Čeština", "cz", "/countries/CzechRepublic_borders.jpg" ],
    // [ "Polish", "Polski", "/countries/Poland_borders.jpg" ],
    // [ "Ukranian", "Українська", "/countries/Ukraine_borders.jpg" ],
    // [ "Lithuanian", "Lietuvių", "/countries/Lithuania_borders.jpg" ],
    // [ "Italian", "Italiano", "/countries/Italy_borders.jpeg" ],
    // [ "French", "Français", "/countries/France_borders.jpg" ],
    // [ "Turkish", "Türkçe", "/countries/Turkey_borders.jpg" ],
    // [ "Japanese", "日本語", "/countries/Japan_borders.jpg" ],
    // ["Russian", "Русский", "/countries/russia_border.jpg"],
];


export default function SettingsPage({ authorizedUser, userData }: ActualUser) {
    const [imagePath, setImagePath] = useState<string>("/uploads/tempUserImage.png");
    const [imageFileId, setImageFileId] = useState<string>("");

    const [state, dispatch] = useReducer(reducer, userData);

    const router = useRouter();


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
    
    const imageEditorRef = useRef<{ photoServerSave: () => Promise<void> }>(null);


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


    async function saveLanguageSet (newLanguage: string) {
        
        try {
            const response = await fetch("http://localhost:3000/api/langSet", {
                method: "POST",
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: authorizedUser,
                    newLang: newLanguage,
                }),
            });

            if(!response.ok) {
                throw new Error("Failed to update language");
            }

            const data = await response.json();
            console.log(data.message);
            
            await fetch("/api/revalidate?path=/settings");// revalidation of settingsPage
            router.refresh();
        } catch (error) {
            console.error("Language update error:", error);
            alert("Failed to change language. Please try again.");
        }
    }


    const settingsTextFormFields = [
        { fieldName: "First Name", fieldValue: state.firstName, fieldPlaceholder: state.firstName, changeFunc: firstNameChange, },
        { fieldName: "Last Name", fieldValue: state.lastName, fieldPlaceholder: state.lastName, changeFunc: lastNameChange, },
        { fieldName: "Nickname", fieldValue: state.nickName, fieldPlaceholder: state.nickName, changeFunc: nicknameChange, },
    ];


    const [buttons, setButtons] = useState<boolean>(true);
    const [dialog, setDialog] = useState<string>("");


    // light/dark theme settings
    const [theme, setTheme] = useThemeSets();
    function switchBetweenColourThemes(index: number) {
        const newTheme = index === 0 ? 'light' : 'dark';
        setTheme(newTheme);
    }
    /*
    Clicking on "Refresh" button in a browser makes the changing between
    different page's modes (page's theme; font's family, size or weight) 
    broken using localStorage because of desynchronization between
    Server and Client parts. useEffect solves that problem.
    */
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);


    // accent colour settings
    const [accentColour, setAccentColour] = useAccentColourSet();

    
    // font family settings
    const [fontFamilyType, setFontFamilyType] = useFontFamilySet();


    // font size settings
    const [fontsize, setFontSize] = useFontSizeSet();


    // font volume (weight and style) settings
    const [fontvolume, setFontVolume] = useFontVolumeSet();


    const t = useTranslations("SettingsPage");

    return (
        <>
            <PageBlockName id="section0" name={t("firstSetsPart.name")} pageBlockCSS={{ scrollMarginTop: "302px" }}>
                <Paragraph question={t("firstSetsPart.photoEditor.name")}
                    paragraphBlockCSS={{ display: "block" }}
                    paragraphCSS={{
                        minWidth: "fit-content",
                        marginBottom: "0.88rem",
                        textIndent: "1rem",//! An important moment
                    }}
                >
                    <ImageEditor ref={imageEditorRef}
                        getImagePath={state.userPhoto}
                        setImagePath={setImagePath}
                        setImageFileId={setImageFileId}
                        disabled={buttons}
                    />
                </Paragraph>

                <FormBlock className={setStyles.commonSet}>
                    {settingsTextFormFields.map((settingTextFormField, index) => 
                        <TextField
                            key={`SettingTextField__${index}`}
                            fieldName={t(`firstSetsPart.input${index + 1}`)}
                            fieldValue={settingTextFormField.fieldValue}
                            fieldPlaceholder={settingTextFormField.fieldPlaceholder}
                            onChange={settingTextFormField.changeFunc}
                            disabled={buttons}
                        />
                    )}
                </FormBlock>
                
                <SaveDenyPanel
                    enableBtns={buttons}
                    translate="SettingsPage"
                    setButtonsFunc={setButtons}
                    setDialogFunc={setDialog}
                />
            </PageBlockName>

            <HorizontalLine cssProps={{ border: "5px double gray", marginTop: "10px", marginBottom: "10px" }} />

            <PageBlockName id="section1" name={t("secondSetsPart.name")}>
                <SubTitle name={t("secondSetsPart.subtitle1.name")} />
                <TastesCheckboxes
                    questions={[
                        t("secondSetsPart.subtitle1.preferQuestion1"),
                        t("secondSetsPart.subtitle1.preferQuestion2"),
                        t("secondSetsPart.subtitle1.preferQuestion3"),
                    ]}
                    props={[
                        userData.customSets.spicy,
                        userData.customSets.veget,
                        userData.customSets.vegan
                    ]}
                />
                
                <HorizontalLine />

                <SubTitle name={t("secondSetsPart.subtitle2.name")} />
                    <Paragraph question={t("secondSetsPart.subtitle2.mainQuestion")}
                        paragraphCSS={{ paddingBottom: "10px" }}
                    >
                        <RangeInput2Handlers
                            twohandRangeName="caloriesRangeSlider"
                            minCalories={userData.customSets.minCalory}
                            maxCalories={userData.customSets.maxCalory}
                        />
                    </Paragraph>
                {/* <hr /> */}
                {/* <PLFSetUps /> */}
                {/* <BodyConstitution /> */}
            </PageBlockName>

            <HorizontalLine cssProps={{ border: "5px double gray", marginTop: "10px", marginBottom: "10px" }} />

            <PageBlockName id="section2" name={t("thirdSetsPart.name")}>
                <SubTitle name={t("thirdSetsPart.subtitle1.name")} />
                <Paragraph question={t("thirdSetsPart.subtitle1.mainQuestion")}
                    paragraphCSS={{ paddingBottom: "10px" }}
                >
                    <CustomSelect
                        options={langs}
                        dbOption={userData.customSets.language}
                        setNewLang={saveLanguageSet}
                    />
                </Paragraph>

                <HorizontalLine />

                {mounted && <>
                    <SubTitle name={t("thirdSetsPart.subtitle2.name")} />
                    <Paragraph question={t("thirdSetsPart.subtitle2.mainQuestion")}
                        paragraphBlockCSS={{ display: "block" }}
                        paragraphCSS={{ paddingBottom: "10px" }}
                    >
                        <ColourSets
                            theme={theme}
                            switcher={switchBetweenColourThemes}
                            themeTypes={[t("thirdSetsPart.subtitle2.lightTheme"), t("thirdSetsPart.subtitle2.darkTheme")]}
                        />
                    </Paragraph>
                </>}

                <HorizontalLine />

                <SubTitle name={t("thirdSetsPart.subtitle3.name")} />
                <Paragraph question={t("thirdSetsPart.subtitle3.mainQuestion")}
                    paragraphCSS={{ paddingBottom: "10px" }}
                >    
                    <RadiosBlock
                        choseRadio={accentColour}
                        hookFunction={setAccentColour}
                    />
                </Paragraph>

                <HorizontalLine />
                
                {mounted && <>
                    <SubTitle name={t("thirdSetsPart.subtitle4.name")} />
                    <FontsFamilySizeWeight
                        fontset1={t("thirdSetsPart.subtitle4.fontQuestion1")} fontFamily={fontFamilyType} hookFamily={setFontFamilyType}
                        fontset2={t("thirdSetsPart.subtitle4.fontQuestion2")} fontSize={fontsize} hookSize={setFontSize}
                        fontset3={t("thirdSetsPart.subtitle4.fontQuestion3")} fontVolume={fontvolume} hookVolume={setFontVolume}
                    />
                </>}
            </PageBlockName>

            {dialog && (
                <DialogView question={
                    (/Save/.test(dialog) && t("firstSetsPart.changesDialog.mainQuestion1"))
                    ||
                    (/Deny/.test(dialog) && t("firstSetsPart.changesDialog.mainQuestion2"))
                }>
                    <AccessBtn
                        additionalStyle={{ paddingLeft: "60px", paddingRight: "60px" }}
                        onClick={() => {
                            if (/Save/.test(dialog)) saveNewCommonUserData();
                            if (/Deny/.test(dialog)) denyNewCommonUserData();
                            setButtons(!buttons);
                            setDialog("");
                            document.body.style.overflow = 'auto';
                        }}
                        buttonName={t("firstSetsPart.changesDialog.accessButton")}
                    />
                    <DenyBtn
                        additionalStyle={{ paddingLeft: "60px", paddingRight: "60px", backgroundColor: "orange" }}
                        onClick={() => {
                            setDialog("");
                            document.body.style.overflow = 'auto';
                        }}
                        buttonName={t("firstSetsPart.changesDialog.denyButton")}
                    />
                </DialogView>
            )}
        </>
    )
}
