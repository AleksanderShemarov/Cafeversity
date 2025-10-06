"use client";

import CardImage from "@/components/CardParts/CardImage";
import { IconCircleCheck, IconExclamationCircle, IconHistory, IconClipboardList, IconTrash, IconXboxX } from "@tabler/icons-react";
import AccessBtn from "@/components/Buttons/DifferentButtons";
import Select, { CSSObjectWithLabel } from "react-select";
import { SelectedDish } from "../AuthorizedUserClient";
import { useState, useEffect, useTransition, Dispatch, SetStateAction, useRef } from "react";
import getCafes, { dishesCheckingByCafe } from "@/app/actions/cafeServerActions";
import { toast } from "react-toastify";
import orderSaving from "@/app/actions/orderSaving";
import styles from "@/app/components/OrderComponent/Order.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import getPreviousOrders from "@/app/actions/getPreviousOrders";


interface OrderProps {
    selectedDishes: SelectedDish[],
    setDishSelection: Dispatch<SetStateAction<SelectedDish[]>>,
    onRemoveDish: (dishId: number) => void,
    isOpen: boolean
}

interface PreviousOrder {
    id: number,
    orderNumber: number,
    cafeName: string,
    date: string,
    time: string,
    readyStatus: boolean,
    total: number,
    dishes: {
        id: number,
        food_name: string,
        imagePath: string,
        food_portion: number,
        cost: number
    }[],
}

export default function Order({ selectedDishes, setDishSelection, onRemoveDish, isOpen }: OrderProps) {
    const orderView = useTranslations("MainUserPage.orderView");

    const [activeTab, setActiveTab] = useState<"new_order"|"order_history">("new_order");
    const [expandedOrderId, setExpandedOrderId] = useState<number|null>(null);
    const [previousOrders, setPreviousOrders] = useState<PreviousOrder[]>([]);

    const calculateTotalSum = (dishes: SelectedDish[]): number => {
        return dishes.filter(dish => dish.checkedDish === true).reduce((total, dish) => total + Number(dish.cost), 0);
    };
    const [commonSum, setCommonSum] = useState<number>(0);
    const [availableDishesCount, setAvailableDishesCount] = useState<number>(0);


    const [cafeLabels, setCafeLabels] = useState<{label: string, value: number}[]>([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            const cafes = await getCafes();
            setCafeLabels(cafes);
            
            const prevOrders = await getPreviousOrders();
            // console.log(prevOrders);
            setPreviousOrders(prevOrders);
        });
    }, []);


    const [availHours, setAvailHours] = useState<{label: string, value: string}[]>([]);

    const [selectedCafeOption, setSelectedCafeOption] = useState<{label: string, value: number} | null>(null);
    const [selectedTimeOption, setSelectedTimeOption] = useState<{label: string, value: string} | null>(null);

    useEffect(() => {
        const availableDishes = selectedDishes.filter(dish => dish.checkedDish === true);
        setAvailableDishesCount(availableDishes.length);
        setCommonSum(calculateTotalSum(selectedDishes));
    }, [selectedDishes]);

    const checkingChoisenDishes = (idCafe: number) => {
        startTransition(async () => {
            setAvailHours([]);
            setSelectedTimeOption(null);

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

    useEffect(() => {
        if (selectedDishes.length === 0) {
            setSelectedCafeOption(null);
            setSelectedTimeOption(null);
            setAvailHours([]);
            setCommonSum(0);
            setAvailableDishesCount(0);
        }
    }, [selectedDishes.length]);


    const cafeSelectOptionWidth = {
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            minWidth: "32rem",
            fontSize: "1.5rem",
            backgroundColor: "var(--order-selectmenu-background)",
            color: "var(--text-color)",
            zIndex: 12,
            marginLeft: "1rem"
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            minWidth: "35rem",
            fontSize: "1.5rem",
            backgroundColor: "var(--order-selectmenu-background)",
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
            backgroundColor: state.isSelected ? "rgb(48, 151, 255)" : state.isFocused ? "var(--order-selectmenu-background-focused)" : "var(--order-selectmenu-background)",
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
            backgroundColor: "var(--order-selectmenu-background)",
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
            backgroundColor: "var(--order-selectmenu-background)",
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
            backgroundColor: state.isSelected ? "rgb(48, 151, 255)" : state.isFocused ? "var(--order-selectmenu-background-focused)" : "var(--order-selectmenu-background)",
            color: state.isSelected ? "gold" : state.isFocused ? "gold" : "var(--text-color)",
            maxWidth: "15rem",
            margin: "0 auto",
        }),
        input: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
        }),
    }


    const toggleOrderExpansion = (orderId: number) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    const getStatusColor = (status: boolean) => {
        switch (status) {
            case false: return '#ffa500';
            case true: return '#00a000';
        }
    };

    const getStatusText = (status: boolean) => {
        switch (status) {
            case false: return "Cooking...";
            case true: return "Ready";// orderView("status.preparing");
        }
    };


    const telephoneInputRef = useRef<HTMLInputElement>(null);
    const commentRef = useRef<HTMLTextAreaElement>(null);


    const orderSavingHandler = () => {
        if (!selectedCafeOption) {
            toast.error("Choose a cafe for your order!", { position: "top-right", style: { fontSize: "1.5rem" } });
            return;
        }

        if (!selectedTimeOption) {
            toast.error("Choose a time for your order!", { position: "top-right", style: { fontSize: "1.5rem" } });
            return;
        }

        const availableDishes = selectedDishes.filter(dish => dish.checkedDish === true);
        if (availableDishes.length === 0) {
            toast.error("No available dishes for ordering!", { position: "top-right", style: { fontSize: "1.5rem" } });
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

        const orderComment = `Час замовы:\n${selectedTimeOption.value}\n\nКаментар:\n${text !== "" ? text : "–"}`;
        const orderDishes = selectedDishes.filter(dish => dish.checkedDish !== null).map(dish => { return { id: dish.dishID, checkedDish: dish.checkedDish } });

        startTransition(async () => {
            const status = await orderSaving(orderDishes, selectedCafeOption.value, telephone!, orderComment);
            // console.log("orderSavingHandler status -->", status);
            if (status.code) {
                toast.success(status.message, { position: "top-right", style: { fontSize: "1.5rem" } });

                setDishSelection([]);
                setSelectedCafeOption(null);
                setSelectedTimeOption(null);
                setAvailHours([]);
                setCommonSum(0);
                setAvailableDishesCount(0);

                if (telephoneInputRef.current) telephoneInputRef.current.value = "";
                if (commentRef.current) commentRef.current.value = "";

                const prevOrders = await getPreviousOrders();
                setPreviousOrders(prevOrders);
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
                    <div className={styles.orderTabs}>
                        <button 
                            className={`${styles.tab} ${activeTab === 'new_order' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('new_order')}
                        >
                            <IconClipboardList size={20} />
                            {orderView("tabs.newOrder")}
                        </button>
                        <button 
                            className={`${styles.tab} ${activeTab === 'order_history' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('order_history')}
                        >
                            <IconHistory size={20} />
                            {orderView("tabs.orderHistory")} ({previousOrders.length})
                        </button>
                    </div>

                    {activeTab === "new_order" && (
                    <>
                        <div className={styles.orderHeader}>
                            {orderView("name")} ({selectedDishes.length} {selectedDishes.length === 1
                            ? orderView("positions.one")
                            : selectedDishes.length === 0 || selectedDishes.length >= 5
                            ? orderView("positions.more")
                            : orderView("positions.afew")} – {commonSum.toFixed(2)} BYN; {orderView("available")}: {availableDishesCount})
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
                                    <span style={{ fontSize: "1.5rem", color: "var(--text-color)" }}>{orderView("noDishes")}</span>
                                </div>
                            }
                        </div>

                        <div className={styles.controlsSection}>
                            <div className={styles.controlGroup}>
                                <p className={styles.controlLabel}>{orderView("cafeChoice.name")}</p>
                                <Select options={cafeLabels}
                                    value={selectedCafeOption}
                                    instanceId="custom-select"
                                    menuPlacement="auto"
                                    isLoading={isPending}
                                    styles={cafeSelectOptionWidth}
                                    isDisabled={selectedDishes.length === 0}
                                    onChange={selectedOption => {
                                        setSelectedCafeOption(selectedOption);
                                        checkingChoisenDishes(selectedOption?.value as number);
                                    }}
                                    isSearchable={false}
                                    placeholder={
                                        selectedDishes.length === 0
                                        ? orderView("cafeChoice.placeholder.noDish")
                                        : orderView("cafeChoice.placeholder.anyDish")
                                    }
                                />
                            </div>
                            <div>
                                <p className={styles.controlLabel}>{orderView("timeChoice.name")}</p>
                                <Select options={availHours}
                                    value={selectedTimeOption}
                                    instanceId="custom-select"
                                    menuPlacement="auto"
                                    styles={timeSelectOptionWidth}
                                    isDisabled={selectedDishes.length === 0 || availHours.length === 0}
                                    onChange={selectedOption => {
                                        setSelectedTimeOption(selectedOption);
                                    }}
                                    isSearchable={false}
                                    placeholder={
                                        availHours.length === 0
                                        ? orderView("timeChoice.placeholder.noTimes")
                                        : orderView("timeChoice.placeholder.anyTimes")
                                    }
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <div style={{
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                                borderRadius: "1rem", flexGrow: 1
                            }}>
                                <p style={{ fontSize: "1.5rem", margin: "0.5rem 0.75rem" }}>{orderView("telephone.name")}</p>
                                <input type="text" placeholder={orderView("telephone.placeholder")} ref={telephoneInputRef} className={styles.telephoneInput} />
                            </div>
                            <div style={{ borderRadius: "1rem" }}>
                                {/* <p style={{ fontSize: "1.5rem", margin: "0.5rem 0.75rem", textAlign: "center" }}>Optional Comment</p> */}
                                <textarea ref={commentRef} placeholder={orderView("comment")} className={styles.commentInput} />
                            </div>
                        </div>
                        <AccessBtn buttonName={orderView("submit")} onClick={orderSavingHandler}
                        additionalStyle={{
                            fontSize: "1.5rem", paddingLeft: "5rem", paddingRight: "5rem",
                            height: "3rem", margin: "0 auto"
                        }} />
                    </>
                    )}

                    {activeTab === 'order_history' && (
                        <div className={styles.orderHistory}>
                            <div className={styles.historyHeader}>
                                {orderView("historyTitle")}
                            </div>
                            
                            {previousOrders.length > 0 ? (
                                <div className={styles.ordersList}>
                                    {previousOrders.map((order) => (
                                        <div key={order.id} className={styles.orderItem}>
                                            <div 
                                                className={styles.orderSummary}
                                                onClick={() => toggleOrderExpansion(order.id)}
                                            >
                                                <div className={styles.orderInfo}>
                                                    <div className={styles.orderNumber}>
                                                        #{order.orderNumber}
                                                    </div>
                                                    <div className={styles.orderCafe}>
                                                        {order.cafeName}
                                                    </div>
                                                    <div className={styles.orderDateTime}>
                                                        {order.date} • {order.time}
                                                    </div>
                                                    <div 
                                                        className={styles.orderStatus}
                                                        style={{ color: getStatusColor(order.readyStatus) }}
                                                    >
                                                        {getStatusText(order.readyStatus)}
                                                    </div>
                                                    <div className={styles.orderTotal}>
                                                        {order.dishes.reduce((sum, dish) => sum + dish.cost, 0)} BYN ({order.total})
                                                    </div>
                                                </div>
                                                <div className={styles.orderExpand}>
                                                    {expandedOrderId === order.id ? '▼' : '►'}
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {expandedOrderId === order.id && (
                                                    <motion.div 
                                                        className={styles.orderDetails}
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className={styles.orderDishes}>
                                                            {order.dishes.map(dish => (
                                                                <div key={`previousOrderDish-${dish.id}`} className={styles.historyDishItem}>
                                                                    <div style={{ height: "4rem", width: "6rem" }}>
                                                                        <CardImage 
                                                                            imagePath={dish.imagePath}
                                                                            style={{ borderRadius: "0.5rem" }}
                                                                            fill
                                                                        />
                                                                    </div>
                                                                    <div style={{ width: "22rem" }}>
                                                                        <p className={styles.dishName}>
                                                                            {dish.food_name}
                                                                        </p>
                                                                    </div>
                                                                    <div style={{ width: "5rem", padding: "0 0.5rem", textAlign: "center" }}>
                                                                        <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 300 }}>
                                                                            {dish.food_portion} g
                                                                        </p>
                                                                    </div>
                                                                    <div style={{ width: "10rem", padding: "0 0.5rem", textAlign: "right" }}>
                                                                        <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 300 }}>
                                                                            {Number(dish.cost).toFixed(2)} BYN
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyHistory}>
                                    <span style={{ fontSize: "1.5rem" }}>
                                        {orderView("history.noOrders")}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
