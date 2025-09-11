"use client";

import styles from "@/app/(commonSite)/[locale]/commonMenu/commonMenu.module.css";
import { useCallback, useEffect, useState } from "react";
import deleteIcon from "../../public/delete_cross_icon.png";
import Image from "next/image";
// import exclamation from "../../public/exclamation_icon.png";
import { useTranslations } from "next-intl";
import { IconPlus, IconMinus } from "@tabler/icons-react";


type CalculatorProps = {
    params: [number, string, number, number],
}

export default function Calculator({ params }: CalculatorProps) {

    const calculator = useTranslations("CommonMenu.Calcultor");

    type ChoiceFood = {
        id: number,
        food_name: string,
        food_portion: number,
        cost: number,
    };

    // const [data, setData] = useState<ChoiceFood[]|[]>([
    //     {id: 1, food_name: "Калдуны", food_portion: 1, cost: 3.15},
    //     {id: 2, food_name: "Мачанка", food_portion: 2, cost: 8.56},
    //     {id: 3, food_name: "Крупнік", food_portion: 1, cost: 2.35},
    // ]);

    const [data, setData] = useState<ChoiceFood[]|[]>([]);

    const adding = useCallback((dish: [number, string, number, number]) => {
        const data_length = data.length;

        const dishPosition: number = data.findIndex((datum) => datum.food_name === dish[1])
        if (dishPosition !== -1) {
            const new_data = data.map((datum, index) => {
                if (index === dishPosition && datum.food_portion < 3) {
                    return {
                        ...datum,
                        food_portion: datum.food_portion + 1,
                    };
                } else {
                    return datum;
                }
            });
            setData(new_data);
        } else {
            const new_data = [
                ...data,
                {
                    id: data_length + 1,
                    food_name: dish[1],
                    food_portion: dish[2],
                    cost: dish[3],
                }
            ];
            setData(new_data);
        }
    }, [data]);


    useEffect(() => {
        if (params[0] !== 0) {
            adding(params);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);


    const common_cost: number = data.length > 0 ? data.map(
        (datum) => datum.cost * datum.food_portion
    ).reduce((summa, current) => summa + current, 0) : 0.00;

    
    function deletion (productId: number) {
        let new_data = data.filter((datum) => datum.id !== productId);
        let position: number = 0;
        new_data = new_data.map((new_datum) => {
            position += 1;
            return {
                ...new_datum,
                id: position,
            }; 
        })
        setData(new_data);
    }

    function portionIncrease (index: number, amount: number) {
        const new_data = data.map((datum, position) => {
            if (position === index) {
                return {
                    ...datum,
                    food_portion: amount + 1,
                };
            } else {
                return datum;
            }
        });
        setData(new_data);
    }

    function portionDecrease (index: number, amount: number) {
        const new_data = data.map((datum, position) => {
            if (position === index) {
                return {
                    ...datum,
                    food_portion: amount - 1,
                };
            } else {
                return datum;
            }
        });
        setData(new_data);
    }

    return (
        <div id={styles.calculator}>
            <p id={styles.calculator_name}>{calculator("calcName")}</p>
            <table className={styles.food_zone}>
                <thead>
                    <tr className={styles.food_lines}>
                        <th className={styles.food_pos}>№</th>
                        <th className={styles.food_name}>{calculator("foodName")}</th>
                        <th className={styles.portions}>{calculator("portion")}</th>
                        <th className={styles.food_price}>{calculator("cost")}</th>
                        <th className={styles.food_canceling}>{calculator("cancel")}</th>{/* it will be hidden late */}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data.map((datum, index) => 
                        <tr key={index} className={styles.food_lines}>
                            <td className={styles.food_pos}>{datum.id}.</td>
                            <td className={styles.food_name}>{datum.food_name}</td>
                            <td className={styles.portions}>
                                <button
                                    type="button"
                                    style={{
                                        borderRadius: "50%",
                                        height: "20px",
                                        width: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 0,
                                        border: "1.5px solid"
                                    }}
                                    onClick={() => datum.food_portion <= 10 && portionIncrease(index, datum.food_portion)}
                                    disabled={datum.food_portion > 2}
                                >
                                    <IconPlus style={{ width: "16px", height: "16px" }} />
                                </button>
                                {datum.food_portion}
                                <button
                                    type="button"
                                    style={{
                                        borderRadius: "50%",
                                        height: "20px",
                                        width: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 0,
                                        border: "1.5px solid"
                                    }}
                                    onClick={() => portionDecrease(index, datum.food_portion)}
                                    disabled={datum.food_portion <= 1}
                                >
                                    <IconMinus style={{ height: "16px", width: "16px" }} />
                                </button>
                            </td>
                            <td className={styles.food_price}>{datum.cost}</td>
                            <td className={styles.food_canceling}>
                                <button
                                    type="button"
                                    style={{
                                        borderRadius: "10%/25%",
                                        backgroundColor: "red",
                                        height: "20px",
                                        width: "20px",
                                    }}
                                    onClick={() => deletion(datum.id)}
                                >
                                    <Image
                                        src={deleteIcon}
                                        alt="Delete_Icon"
                                        width={10}
                                        height={10}
                                        style={{ marginLeft: "-3px", }}
                                    ></Image>
                                </button>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan={5} id={styles.empty_table}>{calculator("tipForUse")}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={styles.message_summa}>
                {/* <div className={styles.importance}>
                    <div className={styles.importance_block}>
                        <Image
                            src={exclamation}
                            alt="Exclamation_Icon"
                            width={20}
                            height={20}
                            style={{
                                borderRadius: "50%",
                            }}
                        ></Image>
                        {calculator("notification")}
                    </div>
                </div> */}
                <div className={styles.price_sum}>{calculator("costSum")} -&gt; {common_cost.toFixed(2)}</div>
            </div>
        </div>
    )
}
