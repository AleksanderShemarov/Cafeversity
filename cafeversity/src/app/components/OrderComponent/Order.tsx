"use client";

import CardImage from "@/components/CardParts/CardImage";
import { IconCircleCheck, IconExclamationCircle, IconSquareX, IconXboxX } from "@tabler/icons-react";
import AccessBtn from "@/components/Buttons/DifferentButtons";
import Select, { CSSObjectWithLabel } from "react-select";
import HorizontalLine from "@/components/OtherParts/HorizontalLine";
import { SelectedDish } from "../AuthorizedUserClient";
import { useState, useEffect, useTransition, Dispatch, SetStateAction, useRef } from "react";
import getCafes, { dishesCheckingByCafe } from "@/app/actions/cafeServerActions";
import { toast } from "react-toastify";
import orderSaving from "@/app/actions/orderSaving";


interface OrderProps {
    selectedDishes: SelectedDish[],
    setDishSelection: Dispatch<SetStateAction<SelectedDish[]>>,
    onRemoveDish: (dishId: number) => void,
}

export default function Order({ selectedDishes, setDishSelection, onRemoveDish }: OrderProps) {
    const [cafeLabels, setCafeLabels] = useState<{label: string, value: number}[]>([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            const cafes = await getCafes();
            setCafeLabels(cafes);
        });
    }, []);

    const [availHours, setAvailHours] = useState<{label: string, value: string}[]>([]);

    const checkingChoisenDishes = (idCafe: number) => {
        startTransition(async () => {
            setAvailHours([]);

            const choisenDishes = selectedDishes.map(dish => { return { id: dish.dishID } });
            const answers = await dishesCheckingByCafe(idCafe, choisenDishes);
            
            setDishSelection(prev => prev.map(dish => {
                const matchingDish = answers.dishes!.hasDish.find(
                    availableDish => availableDish.dishID === dish.dishID
                );

                return {
                    ...dish,
                    checkedDish: matchingDish ? matchingDish.dishAvailable : dish.checkedDish
                };
            }));
            
            setAvailHours(answers.hours);
        });
    }

    const cafeSelectOptionWidth = {
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            minWidth: "21rem",
            fontSize: "1.4rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
            zIndex: 12,
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            minWidth: "21rem",
            fontSize: "1.2rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
            whiteSpace: "pre-wrap"
        }),
        singleValue: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
            whiteSpace: "pre-wrap",
            maxWidth: "18rem",
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
            whiteSpace: "pre-wrap",
            maxWidth: "21rem",
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
            maxWidth: "12rem",
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
            maxWidth: "12rem",
        }),
        input: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
        }),
    }


    const telephoneInputRef = useRef<HTMLInputElement>(null);
    // const telephoneHandler = () => {
    //     const telephone = telephoneInputRef.current?.value;
    //     if (telephone === "") toast.error("Input your telephone number!", { position: "top-right", style: { fontSize: "1.5rem" } });
        
    //     const pattern = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;
    //     if (!pattern.test(telephone!)) toast.error("Please, your phone number! It must be started with '+' and country code.", { position: "top-right", style: { fontSize: "1.5rem" } });
    //     else console.log("Telephone number -->", telephone);
    // }

    const commentRef = useRef<HTMLInputElement>(null);
    // const commentHandler = () => {
    //     const text = commentRef.current?.value;
    //     console.log("Telephone number -->", text);
    // }


    const [choisenCafe, setChoisenCafe] = useState<number>(0);
    const [availableTime, setAvailableTime] = useState<string>("");

    const orderSavingHandler = () => {
        if (choisenCafe === 0) {
            toast.error("Choose a cafe for your order!", { position: "top-right", style: { fontSize: "1.5rem" } });
            return;
        }

        if (availableTime === "") {
            toast.error("Choose a time for your order!", { position: "top-right", style: { fontSize: "1.5rem" } });
            return;
        }

        const telephone = telephoneInputRef.current?.value;
        if (telephone === "") {
            toast.error("Input your telephone number!", { position: "top-right", style: { fontSize: "1.5rem" } });
            return;
        }
        const pattern = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;
        if (!pattern.test(telephone!)) {
            toast.error("Please, your phone number! It must be started with '+' and country code.", { position: "top-right", style: { fontSize: "1.5rem" } });
            return;
        }

        const text = commentRef.current?.value;

        const orderComment = `Час замовы:\n${availableTime}\n\nКаментар:\n${text !== "" ? text : "–"}`;
        const orderDishes = selectedDishes.filter(dish => dish.checkedDish !== null).map(dish => { return { id: dish.dishID, checkedDish: dish.checkedDish } });

        startTransition(async () => {
            const status = await orderSaving(orderDishes, choisenCafe, telephone!, orderComment);
            // console.log("orderSavingHandler status -->", status);
            if (status.code) {
                toast.success(status.message, { position: "top-right", style: { fontSize: "1.5rem" } });
                setDishSelection([]);
                setChoisenCafe(0);
                setAvailableTime("");
                if (telephoneInputRef.current) telephoneInputRef.current.value = "";
                if (commentRef.current) commentRef.current.value = "";
            } else {
                toast.error(status.message, { position: "top-right", style: { fontSize: "1.5rem" } });
            }
        });
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
                }}>Current Order ({selectedDishes.length} items)</p>
            </div>
            <div style={{
                borderRadius: "1rem",
                padding: "0.5rem 1.5rem",
                backgroundColor: "rgb(252, 242, 223)",
                marginLeft: "0.75rem", marginRight: "0.75rem",
                height: "10vh", overflowY: "auto",
                marginBottom: "0.5rem"
            }}>
                {selectedDishes.length > 0
                ? selectedDishes.map((selectedDish, index) =>
                    <div key={index} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        marginTop: "0.5rem", marginBottom: "0.5rem"
                    }}>
                        <div style={{ fontSize: "1.25rem", width: "1.5rem", textAlign: "right" }}>
                            {index + 1}.
                        </div>
                        <div style={{ height: "3rem", width: "5rem" }}>
                            <CardImage imagePath={selectedDish.imagePath.slice(8)}
                                style={{ borderRadius: "0.5rem" }}
                                fill
                            />
                        </div>
                        <div style={{
                            // outline: "1px solid",
                            width: "25rem", padding: "0 0.5rem",
                            height: "2.75rem"
                        }}>
                            <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 300 }}>
                                {/* Dish with Different Sauces */}
                                {selectedDish.food_name}
                            </p>
                        </div>
                        <div style={{
                            // outline: "1px solid",
                            width: "3rem", padding: "0 0.5rem", textAlign: "center"
                        }}>
                            <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 300 }}>{selectedDish.food_portion}g</p>
                        </div>
                        <div style={{ height: "3rem", width: "3rem", borderRadius: "50%" }}>
                            {selectedDish.checkedDish === null
                            ? <IconExclamationCircle style={{ width: "3rem", height: "3rem", color: "orangered" }} />
                            : selectedDish.checkedDish
                            ? <IconCircleCheck style={{ width: "3rem", height: "3rem", color: "green" }} />
                            : <IconXboxX style={{ width: "3rem", height: "3rem", color: "red" }} />
                            }
                        </div>
                        <div style={{
                            // outline: "1px solid",
                            width: "5rem", padding: "0 0.5rem", textAlign: "center"
                        }}>
                            <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 300 }}>{selectedDish.cost}BYN</p>
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
                            onClick={() => {onRemoveDish(selectedDish.dishID)}}
                        >
                            <IconSquareX style={{ height: "3rem", width: "3rem", color: "red", backgroundColor: "white" }} />
                        </div>
                    </div>
                )
                : <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginTop: "0.5rem", marginBottom: "0.5rem"
                    }}>
                        <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 300 }}>
                            Не адабрана ніводнай стравы
                        </p>
                    </div>
                }
            </div>
            <HorizontalLine cssProps={{ marginLeft: "0.75rem", marginRight: "0.75rem" }} />
            <div style={{
                display: "flex", alignItems: "center", gap: "3.5rem", justifyContent: "center",
                marginTop: "0.5rem", marginBottom: "0.5rem"
            }}>
                <div>
                    <p style={{ fontSize: "1.25rem", margin: "0.5rem 0.75rem", textAlign: "center" }}>Choose Cafe</p>
                    <Select options={cafeLabels}
                        instanceId="custom-select"
                        menuPlacement="auto"
                        isLoading={isPending}
                        styles={cafeSelectOptionWidth}
                        isDisabled={selectedDishes.length === 0}
                        onChange={selectedOption => {
                            setChoisenCafe(selectedOption?.value as number);
                            checkingChoisenDishes(selectedOption?.value as number);
                        }}
                        isSearchable={false}
                        placeholder={
                            selectedDishes.length === 0
                            ? "Спачатку дадайце стравы"
                            : "Адабярыце кафэ"
                        }
                    />
                </div>
                <div>
                    <p style={{ fontSize: "1.25rem", margin: "0.5rem 0.75rem", textAlign: "center" }}>Choose Time</p>
                    <Select options={availHours}
                        instanceId="custom-select"
                        menuPlacement="auto"
                        styles={timeSelectOptionWidth}
                        isDisabled={selectedDishes.length === 0}
                        onChange={selectedOption => {
                            setAvailableTime(selectedOption?.value as string);
                        }}
                        isSearchable={false}
                        placeholder={
                            availHours.length === 0
                            ? "Спачатку адабярыце кафэ"
                            : "Адабярыце час"
                        }
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
                    <input type="text" placeholder="Telephone" ref={telephoneInputRef}
                    style={{
                        border: "none", borderBottom: "2.5px solid orange", backgroundColor: "inherit",
                        paddingLeft: "0.75rem", paddingRight: "0.75rem", outline: "none", margin: "0.5rem 0.75rem"
                    }} />
                </div>
                <div style={{ borderRadius: "1rem", backgroundColor: "rgb(252, 242, 223)" }}>
                    <p style={{ fontSize: "1.25rem", margin: "0.5rem 0.75rem", textAlign: "center" }}>Optional Comment</p>
                    <input type="text" ref={commentRef} placeholder="Comment..."
                    style={{
                        border: "none", backgroundColor: "inherit",
                        paddingLeft: "0.75rem", paddingRight: "0.75rem",
                        outline: "1px solid black", margin: "0.5rem 0.75rem",
                        borderRadius: "0.5rem"
                    }} />
                </div>
                <AccessBtn buttonName="Submit" onClick={orderSavingHandler}
                additionalStyle={{
                    fontSize: "1.25rem", paddingLeft: "5rem", paddingRight: "5rem",
                    height: "3rem"
                }} />
            </div>
        </div>
    );
}
