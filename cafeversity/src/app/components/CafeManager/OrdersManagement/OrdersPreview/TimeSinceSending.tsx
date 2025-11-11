"use client";

import { useEffect, useState } from "react";


export default function TimeSinceSending({ sentTime }: { sentTime: Date }) {

    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, [setDate]);

    const subtractTime = date.getTime() - sentTime.getTime();
    const days = Math.floor(subtractTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(subtractTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    const minutes = Math.floor(subtractTime % (1000 * 60 * 60) / (1000 * 60));

    return (
        <div className="
            flex flex-row items-center
            px-[1.25rem] py-[1rem]
        ">
            <p className="grow text-[1.6rem] text-left font-bold m-0 p-0">Ordered</p>
            <p className="grow text-[1.6rem] text-right text-gray-400 font-medium m-0 p-0">
                {days > 0 && days}d {hours > 0 && hours}h {minutes > 0 ? `${minutes}min` : "<1 min"}
            </p>
        </div>
    );
}
