"use client";

import twohandRangeStyle from "@/components/TastesSettings/CaloriesRange/RangeOfCalories.module.css";
import { useState } from "react";


type CaloriesRangeSliderTypes = {
    twohandRangeName?: string,
    minCalories?: number,
    minCaloriesFunc: (
        minCalory: number
    ) => void
    maxCalories?: number,
    maxCaloriesFunc: (
        maxCalory: number
    ) => void
}


const RangeInput2Handlers = ({
    twohandRangeName = "", minCalories, minCaloriesFunc, maxCalories, maxCaloriesFunc
}: CaloriesRangeSliderTypes) => {

    const lowerBorder: number = 1500;
    const upperBorder: number = 3000;
    const step: number = 50;

    const [lowerRange, setLowerRange] = useState<number>(minCalories ?? 1800);
    const [upperRange, setUpperRange] = useState<number>(maxCalories ?? 2500);

    function lowerRangeCheck(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const lowerRangeNum = Number(event.target.value);

        if (lowerRangeNum <= upperRange - 50) {
            setLowerRange(lowerRangeNum);
        }
    }

    function upperRangeCheck(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const upperRangeNum = Number(event.target.value);

        if (upperRangeNum >= lowerRange + 50) {
            setUpperRange(upperRangeNum);
        }
    }

    return (
        <div className={twohandRangeStyle.twohandRangeContainer}>
            <div className={twohandRangeStyle.rangeValues}>
                <span id={twohandRangeStyle.downRange}>{lowerRange}</span>
                <span id={twohandRangeStyle.rangeDash}> – </span>
                <span id={twohandRangeStyle.upRange}>{upperRange}</span>
            </div>
            <div className={twohandRangeStyle.twohandRangeTrack}></div>
            {/* 
                The main cause why conditions didn't have any effects on <input type="range"> tags 
                was using 'defaultValue' attribute instead of 'value'.
                React doesn't control the element values while using 'defaultValue' attribute.
                React checks the element values and updates them by a component state using 'value' attribute.

                These correct codelines I have found in Ben Honeywill's article "Building a Range Slider Component in React".
            */}
            <input type="range" id="downRangePart" name={twohandRangeName}
                min={lowerBorder} max={upperBorder} step={step}
                value={lowerRange} onChange={lowerRangeCheck}
                onMouseUp={() => minCaloriesFunc(lowerRange)}
            />
            <input type="range" id="upRangePart" name={twohandRangeName}
                min={lowerBorder} max={upperBorder} step={step}
                value={upperRange} onChange={upperRangeCheck}
                onMouseUp={() => maxCaloriesFunc(upperRange)}
            />
        </div>
    )
}


export default RangeInput2Handlers;
