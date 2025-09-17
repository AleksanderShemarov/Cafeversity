"use client";

import CardImage from "@/components/CardParts/CardImage";
import { IconCircleCheck, IconExclamationCircle, IconTrash, IconXboxX } from "@tabler/icons-react";
import AccessBtn from "@/components/Buttons/DifferentButtons";
import Select, { CSSObjectWithLabel } from "react-select";
import { SelectedDish } from "../AuthorizedUserClient";
import { useState, useEffect, useTransition, Dispatch, SetStateAction, useRef } from "react";
import getCafes, { dishesCheckingByCafe } from "@/app/actions/cafeServerActions";
import { toast } from "react-toastify";
import orderSaving from "@/app/actions/orderSaving";
import styles from "@/app/components/OrderComponent/Order.module.css";
import { motion, AnimatePresence } from "framer-motion";


interface OrderProps {
    selectedDishes: SelectedDish[],
    setDishSelection: Dispatch<SetStateAction<SelectedDish[]>>,
    onRemoveDish: (dishId: number) => void,
    isOpen: boolean
}

export default function Order({ selectedDishes, setDishSelection, onRemoveDish, isOpen }: OrderProps) {
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
            minWidth: "32rem",
            fontSize: "1.5rem",
            backgroundColor: "white",
            color: "var(--text-color)",
            zIndex: 12,
            marginLeft: "1rem"
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            minWidth: "35rem",
            fontSize: "1.5rem",
            backgroundColor: "white",
            color: "var(--text-color)",
            whiteSpace: "pre-wrap",
            margin: "0 auto"
        }),
        singleValue: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
            whiteSpace: "pre-wrap",
            maxWidth: "35rem"
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
            backgroundColor: state.isSelected ? "rgb(48, 151, 255)" : state.isFocused ? "darkgrey" : "white",
            color: state.isSelected ? "gold" : state.isFocused ? "gold" : "var(--text-color)",
            whiteSpace: "pre-wrap",
            maxWidth: "35rem"
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
            fontSize: "1.5rem",
            backgroundColor: "white",
            color: "var(--text-color)",
            zIndex: 12,
            marginLeft: "9.5rem",
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "auto",
            minWidth: "10rem",
            maxWidth: "20rem",
            fontSize: "1.5rem",
            backgroundColor: "white",
            color: "var(--text-color)",
            margin: "0 auto"
        }),
        singleValue: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
            maxWidth: "15rem",
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
            backgroundColor: state.isSelected ? "rgb(48, 151, 255)" : state.isFocused ? "darkgrey" : "white",
            color: state.isSelected ? "gold" : state.isFocused ? "gold" : "var(--text-color)",
            maxWidth: "15rem",
            margin: "0 auto",
        }),
        input: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
        }),
    }


    const telephoneInputRef = useRef<HTMLInputElement>(null);
    const commentRef = useRef<HTMLTextAreaElement>(null);


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
        <AnimatePresence>
            {isOpen && (
                <motion.div className={styles.orderContainer}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                        position: 'sticky',
                        top: '20px',
                        zIndex: 1000,
                        marginTop: '20px',
                        marginBottom: '20px'
                    }}
                >
                    <div className={styles.orderHeader}>
                        Тякучая замова ({selectedDishes.length} {selectedDishes.length === 1 ? "пазыцыя" : "пазыцыяў"})
                    </div>
                    <div className={styles.dishesList}>
                        {selectedDishes.length > 0
                        ? selectedDishes.map((selectedDish, index) =>
                            <div key={index} className={styles.dishItem}>
                                <div style={{ width: "3rem", textAlign: "center", fontSize: "1.5rem" }}>
                                    {index + 1}.
                                </div>
                                <div style={{ height: "4rem", width: "6rem" }}>
                                    <CardImage imagePath={selectedDish.imagePath.slice(8)}
                                        style={{ borderRadius: "0.5rem" }}
                                        fill
                                    />
                                </div>
                                <div style={{ width: "25rem" }}>
                                    <p className={styles.dishName}>
                                        {/* Dish with Different Sauces */}
                                        {selectedDish.food_name}
                                    </p>
                                </div>
                                <div style={{ width: "3rem", padding: "0 0.5rem", textAlign: "center" }}>
                                    <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 300 }}>{selectedDish.food_portion}g</p>
                                </div>
                                <div style={{ height: "3rem", width: "3rem", borderRadius: "50%" }}>
                                    {selectedDish.checkedDish === null
                                    ? <IconExclamationCircle style={{ width: "3rem", height: "3rem", color: "orangered" }} />
                                    : selectedDish.checkedDish
                                    ? <IconCircleCheck style={{ width: "3rem", height: "3rem", color: "green" }} />
                                    : <IconXboxX style={{ width: "3rem", height: "3rem", color: "red" }} />
                                    }
                                </div>
                                <div style={{ width: "5rem", padding: "0 0.5rem", textAlign: "center" }}>
                                    <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 300 }}>{selectedDish.cost}BYN</p>
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
                                    <IconTrash style={{ height: "3rem", width: "3rem" }} />
                                </div>
                            </div>
                        )
                        : <div className={styles.emptyMessage}>
                                Не адабрана ніводнай стравы
                            </div>
                        }
                    </div>

                    <div className={styles.controlsSection}>
                        <div className={styles.controlGroup}>
                            <p className={styles.controlLabel}>Choose Cafe</p>
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
                            <p className={styles.controlLabel}>Choose Time</p>
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

                    <div className={styles.inputGroup}>
                        <div style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                            borderRadius: "1rem", flexGrow: 1
                        }}>
                            <p style={{ fontSize: "1.5rem", margin: "0.5rem 0.75rem" }}>Tel:</p>
                            <input type="text" placeholder="Telephone" ref={telephoneInputRef} className={styles.telephoneInput} />
                        </div>
                        <div style={{ borderRadius: "1rem" }}>
                            {/* <p style={{ fontSize: "1.5rem", margin: "0.5rem 0.75rem", textAlign: "center" }}>Optional Comment</p> */}
                            <textarea ref={commentRef} placeholder="Comment..." className={styles.commentInput} />
                        </div>
                    </div>
                    <AccessBtn buttonName="Submit" onClick={orderSavingHandler}
                    additionalStyle={{
                        fontSize: "1.5rem", paddingLeft: "5rem", paddingRight: "5rem",
                        height: "3rem", margin: "0 auto"
                    }} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
