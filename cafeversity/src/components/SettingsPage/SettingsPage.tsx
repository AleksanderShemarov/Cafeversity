"use client";

import ImageEditor from "@/components/ImageEditor/ImageEditor";
import { useState, useReducer, useRef, startTransition } from "react";
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
import { UserDataTypes } from "@/app/(userPage)/[authorizedUser]/settingsPage/page";
import PageBlockName from "@/components/PageBlocks/PageBlockName";
import Paragraph from "../PageBlocks/Paragraphs/Paragraph";
import SaveDenyPanel from "../SaveDenyPanel/SaveDenyPanel";
import FormBlock from "../FormFields/FormBlock";
// import PLFSetUps from "@/components/TastesSettings/ProteinLipidFat/PLFSetUps";

import { useRouter } from "next/navigation";// for "saveLanguageSet" function

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

import { allSetsUpdate } from "@/app/actions/settings";


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
| { type: "nicknameChange"; nickName: string }
| { type: "photoChange"; photoPath: string|null };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_REAL_USER_DATA": {
            return { ...state, ...action.payload };
        }
        case "firstNameChange": {
            return { ...state, firstName: action.firstName };
        }
        case "lastNameChange": {
            return { ...state, lastName: action.lastName };
        }
        case "nicknameChange": {
            return { ...state, nickName: action.nickName };
        }
        case "photoChange": {
            return { ...state, userPhoto: action.photoPath };
        }
        default: {
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


export interface SetsState {
    spicy: boolean,
    vegetarian: boolean,
    vegan: boolean,
    minCalory: number,
    maxCalory: number,
    pageTheme: "light"|"dark",
    brandColor: string,
    fontFamily: string,
    fontSize: string,
    fontVolume: string,
}

type SetsAction = 
| { type: "SET_REAL_USER_SETS"; payload: SetsState }
| { type: "spicyCheck"; spicy: boolean }
| { type: "vegetarianCheck"; vegetarian: boolean }
| { type: "veganCheck"; vegan: boolean }
| { type: "minCaloryNum"; minCalory: number }
| { type: "maxCaloryNum"; maxCalory: number }
| { type: "pageThemeChange"; pageTheme: "light"|"dark" }
| { type: "brandColorChange"; brandColor: string }
| { type: "fontFamilyChange"; fontFamily: string }
| { type: "fontSizeChange"; fontSize: string }
| { type: "fontVolumeChange"; fontVolume: string };

function setsReducer(setState: SetsState, action: SetsAction): SetsState {
    switch (action.type) {
        case "SET_REAL_USER_SETS": {
            return { ...setState, ...action.payload };
        }
        case "spicyCheck": {
            return { ...setState, spicy: action.spicy };
        }
        case "vegetarianCheck": {
            return { ...setState, vegetarian: action.vegetarian };
        }
        case "veganCheck": {
            return { ...setState, vegan: action.vegan };
        }
        case "minCaloryNum": {
            return { ...setState, minCalory: action.minCalory };
        }
        case "maxCaloryNum": {
            return { ...setState, maxCalory: action.maxCalory };
        }
        case "pageThemeChange": {
            return { ...setState, pageTheme: action.pageTheme };
        }
        case "brandColorChange": {
            return { ...setState, brandColor: action.brandColor };
        }
        case "fontFamilyChange": {
            return { ...setState, fontFamily: action.fontFamily };
        }
        case "fontSizeChange": {
            return { ...setState, fontSize: action.fontSize };
        }
        case "fontVolumeChange": {
            return { ...setState, fontVolume: action.fontVolume };
        }
        default: {
            const exhaustiveCheck: never = action;
            throw new Error(`Unknown action: ${exhaustiveCheck}`);
        }
    }
}


export default function SettingsPage({ authorizedUser, userData }: ActualUser) {
    const [imagePath, setImagePath] = useState<string>("/uploads/tempUserImage.png");
    const [imageFileId, setImageFileId] = useState<string>("");
    const router = useRouter();


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
    function photoChange(newPhotoPath: string|null) {
        dispatch({
            type: "photoChange",
            photoPath: newPhotoPath
        })
    }
    function denyNewCommonUserData() {
        dispatch({ type: 'SET_REAL_USER_DATA', payload: userData });
    }

    const settingsTextFormFields = [
        { fieldName: "First Name", fieldValue: state.firstName, fieldPlaceholder: state.firstName, changeFunc: firstNameChange, },
        { fieldName: "Last Name", fieldValue: state.lastName, fieldPlaceholder: state.lastName, changeFunc: lastNameChange, },
        { fieldName: "Nickname", fieldValue: state.nickName, fieldPlaceholder: state.nickName, changeFunc: nicknameChange, },
    ];


    type CustomSetsSubset = Pick<UserDataTypes['customSets'], keyof SetsState>;
    const setsUserData: SetsState = {...(userData.customSets as CustomSetsSubset)};
    
    const [newSets, setNewSets] = useState<SetsState>(setsUserData);
    const [setState, setsDispatch] = useReducer(setsReducer, newSets);

    useAccentColourSet(setState.brandColor);
    useFontFamilySet(setState.fontFamily);
    useFontSizeSet(setState.fontSize);
    useFontVolumeSet(setState.fontVolume);

    function spicyCheck(isSpicy: boolean) {
        setsDispatch({
            type: "spicyCheck",
            spicy: isSpicy
        });
        setSetsChanged(true);
    }
    function vegetarianCheck(isVegetarian: boolean) {
        setsDispatch({
            type: "vegetarianCheck",
            vegetarian: isVegetarian
        });
        setSetsChanged(true);
    }
    function veganCheck(isVegan: boolean) {
        setsDispatch({
            type: "veganCheck",
            vegan: isVegan
        });
        setSetsChanged(true);
    }
    function minCaloryNum(newMinCalory: number) {
        setsDispatch({
            type: "minCaloryNum",
            minCalory: newMinCalory
        })
    }
    function maxCaloryNum(newMaxCalory: number) {
        setsDispatch({
            type: "maxCaloryNum",
            maxCalory: newMaxCalory
        })
    }
    function pageThemeChange(theme: "light"|"dark") {
        setsDispatch({
            type: "pageThemeChange",
            pageTheme: theme
        })
        setTheme(theme);
    }
    function brandColorChange(newBrandColour: string) {
        setsDispatch({
            type: "brandColorChange",
            brandColor: newBrandColour
        });
        setSetsChanged(true);
    }
    function fontFamilyChange(newFontFamily: string) {
        setsDispatch({
            type: "fontFamilyChange",
            fontFamily: newFontFamily
        });
        setSetsChanged(true);
    }
    function fontSizeChange(newFontSize: string) {
        setsDispatch({
            type: "fontSizeChange",
            fontSize: newFontSize
        });
        setSetsChanged(true);
    }
    function fontVolumeChange(newFontVolume: string) {
        setsDispatch({
            type: "fontVolumeChange",
            fontVolume: newFontVolume
        });
        setSetsChanged(true);
    }
    function denyUpdatedSetsUserData() {
        setsDispatch({ type: "SET_REAL_USER_SETS", payload: newSets });
    }
    
    
    console.log(setState);


    const imageEditorRef = useRef<{ photoServerSave: () => Promise<{ status: string, path: string|null }> }>(null);

    async function saveNewCommonUserData() {
        const imagePathArray = imagePath.split("");
        const deletedNotAccessSymbols = imageFileId.replace(/[^a-zA-Z0-9_]/g, '');
        imagePathArray.splice(imagePath.lastIndexOf("."), 0, `_${deletedNotAccessSymbols}`);
        const finalImagePath = imagePath !== "/uploads/tempUserImage.png"
            ? `/uploads/${imagePathArray.join("")}`
            : null;
        
        console.log("imagePath ->", imagePath);
        console.log("finalImagePath ->", finalImagePath);
        photoChange(finalImagePath);
        
        const photoResponse = imageEditorRef.current
            ? await imageEditorRef.current.photoServerSave()
            : { status: "Success", path: userData.userPhoto };
        
        console.log("before fetch for saving new data at Settings Page.");
        
        await fetch("/api/userData?page=settings", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                oldName: authorizedUser,
                oldNickname: userData.nickName,
                newName: state.firstName,
                newSurname: state.lastName,
                newNickname: state.nickName,
                newUserPhoto: photoResponse.path,
            })
        });
        
        router.push(`/${state.firstName}_${state.lastName}/settingsPage`);
        router.refresh();
    }


    async function saveUpdatedSetsUserData() {
        startTransition(() => {
        allSetsUpdate(userData.id, setState)
            .then(result => {
                if(!result.success) {
                    denyUpdatedSetsUserData();
                }
                else {
                    setsDispatch({ type: "SET_REAL_USER_SETS", payload: setState });
                    setNewSets(setState);
                    console.log("Settings are updated.", result.success);
                }
            });
        });
    }


    async function saveLanguageSet (newLanguage: string)
    {
        try {
            const response = await fetch("http://localhost:3000/api/langSet", {
                method: "POST",
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: `${state.firstName}_${state.lastName}`,// userName: authorizedUser,
                    newLang: newLanguage,
                }),
            });

            if(!response.ok) {
                throw new Error("Failed to update language");
            }

            const data = await response.json();
            
            await fetch("/api/revalidate?path=/settings");// revalidation of settingsPage
            router.refresh();

            toast.info(data.message, { position: "top-right", style: { fontSize: "1.5rem" } });
        } catch (error) {
            console.error("Language update error:", error);
            alert("Failed to change language. Please try again.");
        }
    }


    const [buttons, setButtons] = useState<boolean>(true);
    const [dialog, setDialog] = useState<string>("");
    const [setsChanged, setSetsChanged] = useState<boolean>(false);


    // light/dark theme settings
    const [theme, setTheme] = useThemeSets(setsUserData.pageTheme);
    function switchBetweenColourThemes(index: number) {
        const newTheme = index === 0 ? 'light' : 'dark';
        setSetsChanged(true);
        setTheme(newTheme);
        pageThemeChange(newTheme);
    }


    const t = useTranslations("SettingsPage");
    //console.log(userData);

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
                    props={[ setState.spicy, setState.vegetarian, setState.vegan ]}
                    funcs={[ spicyCheck, vegetarianCheck, veganCheck ]}
                />
                
                <HorizontalLine />

                <SubTitle name={t("secondSetsPart.subtitle2.name")} />
                    <Paragraph question={t("secondSetsPart.subtitle2.mainQuestion")}
                        paragraphCSS={{ paddingBottom: "10px" }}
                    >
                        <RangeInput2Handlers
                            key={`range-${setState.minCalory}-${setState.maxCalory}`}
                            twohandRangeName="caloriesRangeSlider"
                            minCalories={setState.minCalory}
                            minCaloriesFunc={(calory: number) => {
                                minCaloryNum(calory);
                                setSetsChanged(true);
                            }}
                            maxCalories={setState.maxCalory}
                            maxCaloriesFunc={(calory: number) => {
                                maxCaloryNum(calory);
                                setSetsChanged(true);
                            }}
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

                <SubTitle name={t("thirdSetsPart.subtitle2.name")} />
                <Paragraph question={t("thirdSetsPart.subtitle2.mainQuestion")}
                    paragraphBlockCSS={{ display: "block" }}
                    paragraphCSS={{ paddingBottom: "10px" }}
                >
                    <ColourSets
                        theme={theme ?? setState.pageTheme}
                        switcher={switchBetweenColourThemes}
                        themeTypes={[t("thirdSetsPart.subtitle2.lightTheme"), t("thirdSetsPart.subtitle2.darkTheme")]}
                    />
                </Paragraph>

                <HorizontalLine />

                <SubTitle name={t("thirdSetsPart.subtitle3.name")} />
                <Paragraph question={t("thirdSetsPart.subtitle3.mainQuestion")}
                    paragraphCSS={{ paddingBottom: "10px" }}
                >    
                    <RadiosBlock
                        key={`brandcolor-${setState.brandColor}`}
                        currentColor={setState.brandColor}
                        onColorChange={brandColorChange}
                    />
                </Paragraph>

                <HorizontalLine />
                
                <SubTitle name={t("thirdSetsPart.subtitle4.name")} />
                <FontsFamilySizeWeight
                    key={`fontsfamilysizeweight-${setState.fontFamily}-${setState.fontSize}-${setState.fontVolume}`}

                    fontset1={t("thirdSetsPart.subtitle4.fontQuestion1")}
                    fontFamily={setState.fontFamily} familyChange={fontFamilyChange}

                    fontset2={t("thirdSetsPart.subtitle4.fontQuestion2")}
                    fontSize={setState.fontSize} sizeChange={fontSizeChange}

                    fontset3={t("thirdSetsPart.subtitle4.fontQuestion3")}
                    fontVolume={setState.fontVolume} volumeChange={fontVolumeChange}
                />
            </PageBlockName>
            
            {setsChanged && (<div style={{ height: "12.5rem" }}></div>)}
            {setsChanged && (
                <div style={{ position: "fixed", bottom: "0", right: "25%", width: "50%"}}>
                    <div style={{
                        display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem",
                        height: "10rem", marginBottom: "5rem", borderRadius: "1.5rem",
                        backgroundColor: "rgba(120, 120, 120, 0.4)", backdropFilter: "blur(1rem)",
                        WebkitBackdropFilter: "blur(1rem)"
                    }}>
                        <p style={{
                            fontFamily: "var(--font-family)",
                            fontSize: "2rem",
                            fontWeight: "var(--font-volume-weight)",
                            fontStyle: "var(--font-volume-style)",
                            textAlign: "center"
                        }}>
                            {t("firstSetsPart.updatedSetsSaving")}
                        </p>
                        <AccessBtn
                            onClick={() => {
                                saveUpdatedSetsUserData();
                                setSetsChanged(false);
                            }}
                            additionalStyle={{ maxWidth: "3rem", minWidth: "1rem" }}
                            buttonName={t("firstSetsPart.changesDialog.accessButton")}
                        />
                        <DenyBtn
                            onClick={() => {
                                denyUpdatedSetsUserData();
                                setSetsChanged(false);
                            }}
                            additionalStyle={{  }}
                            buttonName={t("firstSetsPart.changesDialog.denyButton")}
                        />
                    </div>
                </div>
            )}

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
            <ToastContainer theme="light" />
        </>
    )
}
