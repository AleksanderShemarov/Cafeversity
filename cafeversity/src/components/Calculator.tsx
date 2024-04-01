"use client";

import styles from "@/app/news/news.module.css";
import { useState } from "react";
import deleteIcon from "../../public/delete_cross_icon.png";
import Image from "next/image";
import additionIcon from "../../public/addition_icon.png";
import subtractIcon from "../../public/subtraction_icon.png";
import exclamation from "../../public/exclamation_icon.png";


export default function Calculator() {

    type ChoiceFood = {
        id: number,
        food_name: string,
        food_portion: number,
        cost: number,
    };

    const [data, setData] = useState<ChoiceFood[]|[]>([
        {id: 1, food_name: "Калдуны", food_portion: 1, cost: 3.15},
        {id: 2, food_name: "Мачанка", food_portion: 2, cost: 8.56},
        {id: 3, food_name: "Крупнік", food_portion: 1, cost: 2.35},
    ]);

    let common_cost: number = data.length > 0 ? data.map(
        (datum) => datum.cost * datum.food_portion
    ).reduce((summa, current) => summa + current, 0) : 0.00;

    
    function deletion (productId: number) {
        let new_data = data.filter((datum) => datum.id !== productId);
        setData(new_data);
    }

    function portionIncrease (index: number, amount: number) {
        let new_data = data.map((datum, position) => {
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
        let new_data = data.map((datum, position) => {
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
            <p id={styles.calculator_name}>Лічыльнык страў</p>
            <table className={styles.food_zone}>
                <tr className={styles.food_lines}>
                    <th className={styles.food_pos}>№</th>
                    <th className={styles.food_name}>Назва Стравы</th>
                    <th className={styles.portions}>Кол-сць порцый</th>
                    <th className={styles.food_price}>Кошт</th>
                    <th className={styles.food_canceling}>Адмена</th>{/* it will be hidden late */}
                </tr>
                {data.map((datum, index) => 
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
                                }}
                                onClick={() => datum.food_portion <= 10 && portionIncrease(index, datum.food_portion)}
                                disabled={datum.food_portion > 2}
                            >
                                <Image
                                    src={additionIcon}
                                    alt="Add_Icon"
                                    width={15}
                                    height={15}
                                    style={{
                                        borderRadius: "50%",
                                        marginLeft: "-5px",
                                        marginBottom: "4px",
                                    }}
                                ></Image>
                            </button>
                            {datum.food_portion}
                            <button
                                type="button"
                                style={{
                                    borderRadius: "50%",
                                    height: "20px",
                                    width: "20px",
                                }}
                                onClick={() => portionDecrease(index, datum.food_portion)}
                                disabled={datum.food_portion <= 1}
                            >
                                <Image
                                    src={subtractIcon}
                                    alt="Subtract_Icon"
                                    width={15}
                                    height={15}
                                    style={{
                                        borderRadius: "50%",
                                        marginLeft: "-5px",
                                        marginBottom: "4px",
                                    }}
                                ></Image>
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
                )}
            </table>
            <div className={styles.message_summa}>
                <div className={styles.importance}>
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
                        Паведамленне
                    </div>
                </div>
                <div className={styles.price_sum}>Сума коштаў -&gt; {common_cost.toFixed(2)}</div>
            </div>
        </div>
    )
}
