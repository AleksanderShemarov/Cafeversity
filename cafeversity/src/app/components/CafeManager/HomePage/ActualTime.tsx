"use client";

import { useState, useEffect } from "react";


export default function ActualTime({ workdayHours, saturdayHours }: { workdayHours: string, saturdayHours: string }) {
    const weekdays: string[] = [ "Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота" ] as const;


    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setDate(new Date());
        }, 2000);

        return () => clearInterval(timerId);
    }, [setDate]);

    let timePeriod;
    switch (date.getDay()) {
        case 6:
            timePeriod = saturdayHours.split(": ")[1];
            break;
        default:
            timePeriod = workdayHours.split(": ")[1];
            break;
    }

    const [firstTime, lastTime] = timePeriod.split(" – ");
    const [firstHours, firstMinutes] = firstTime.split(":").map(Number);
    const [lastHours, lastMinutes] = lastTime.split(":").map(Number);
    const workStart = new Date().setHours(firstHours, firstMinutes + 1, 0, 0);
    const workEnd = new Date().setHours(lastHours, lastMinutes + 1, 0, 0);

    const morEqual: boolean = date.getTime() >= workEnd;
    if (morEqual) {
        switch (new Date(date.getDate() + 1).getDay()) {
            case 6:
                timePeriod = workdayHours.split(": ")[1];
                break;
            default:
                timePeriod = saturdayHours.split(": ")[1];
                break;
        }
    }

    const morEqualStart: boolean = date.getTime() < workStart;
    let diffMs;
    if (morEqualStart)
        diffMs = workStart - date.getTime();
    else
        diffMs = workEnd - date.getTime();
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return (
        <div className="h-[100%] p-[2rem] content-center">
            <p className="text-[3.25rem] text-left font-semibold mb-[0.75rem]">
                {weekdays[date.getDay()]}, {date.getHours()}
                <span className="animate-pulse">:</span>
                {date.getMinutes().toString().padStart(2, "0")}
            </p>
            <p className="text-[2.75rem] text-left font-medium mt-[0.75rem] mb-[0.75rem]">
                {
                    date.getDay() === 0
                    ? "Выхадны"
                    : morEqualStart
                    ? `Адчыняемся праз ${diffHours} г. ${diffMinutes} хв.`
                    : morEqual
                    ? "Зачынена"
                    : `Адчынена яшчэ ${diffHours} г. ${diffMinutes} хв.`
                }
            </p>
            {morEqual ? (
                <p className="text-[2rem] text-left text-balance font-light mt-[0.75rem]">
                    Заўтра: {
                        date.getDay() === 6
                        ? `Выхадны, адчыняемся ў ${weekdays[1]} а ${workdayHours.split(": ")[1].split(" – ")[0]}`
                        : date.getDay() === 0
                        ? `адчыняемся ў ${weekdays[1]} а ${workdayHours.split(": ")[1].split(" – ")[0]}`
                        : date.getDay() === 5
                        ? `адчыняемся ў ${weekdays[6]} а ${saturdayHours.split(": ")[1].split(" – ")[0]}`
                        : `адчыняемся ў ${weekdays[date.getDay() + 1]} а ${workdayHours.split(": ")[1].split(" – ")[0]}`
                    }
                </p>
            ) : null}
        </div>
    );
}
