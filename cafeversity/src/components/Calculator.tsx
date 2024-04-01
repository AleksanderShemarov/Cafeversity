"use client";

import styles from "@/app/news/news.module.css";
import { useState } from "react";
import deleteIcon from "../../public/delete_cross_icon.png";
import Image from "next/image";
import additionIcon from "../../public/addition_icon.png";
import subtractIcon from "../../public/subtraction_icon.png";


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
            <table className="food_zone">
                <tr>
                    <th>№</th>
                    <th>Назва Стравы</th>
                    <th>Кол-сць порцый</th>
                    <th>Кошт</th>
                    <th>Адмена</th>{/* it will be hidden late */}
                </tr>
                {data.map((datum, index) => 
                    <tr key={index}>
                        <td>{datum.id}.</td>
                        <td>{datum.food_name}</td>
                        <td>
                            <button
                                type="button"
                                style={{
                                    borderRadius: "50%",
                                    height: "20px",
                                    width: "20px",
                                }}
                                onClick={() => datum.food_portion <= 10 && portionIncrease(index, datum.food_portion)}
                                disabled={datum.food_portion > 9}
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
                        <td>{datum.cost}</td>
                        <td>
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
                <div className={styles.importance}>Паведамленне</div>
                <div className={styles.price_sum}>Сума коштаў -&gt; {common_cost}</div>
            </div>
        </div>
    )
}
