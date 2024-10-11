"use client";
import twohandRangeStyle from "@/components/TastesSettings/CaloriesRange/RangeOfCalories.module.css";
import { useState } from "react";


const RangeInput2Handlers = ({ twohandRangeName = "" }) => {

    const lowerBorder: number = 1500;
    const upperBorder: number = 3000;

    const [lowerRange, setLowerRange] = useState<number>(2300);
    const [upperRange, setUpperRange] = useState<number>(2500);        

    function lowerRangeCheck(event: React.ChangeEvent<HTMLInputElement>) {
        const lowerRangeNum = Number(event.target.value);

        // The simplest type is, but thumbs don't stop when equal
        if (lowerRangeNum <= upperRange) {
            setLowerRange(lowerRangeNum);
        }
    }

    function upperRangeCheck(event: React.ChangeEvent<HTMLInputElement>) {
        const upperRangeNum = Number(event.target.value);

        // The simplest type is, but thumbs don't stop when equal
        if (upperRangeNum >= lowerRange) {
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
            <input type="range" id="downRangePart" name={twohandRangeName}
                min={lowerBorder} max={upperBorder} step="50"
                defaultValue={lowerRange} onChange={lowerRangeCheck}
            />
            <input type="range" id="upRangePart" name={twohandRangeName}
                min={lowerBorder} max={upperBorder} step="50"
                defaultValue={upperRange} onChange={upperRangeCheck}
            />
        </div>
    )
}


export default RangeInput2Handlers;
