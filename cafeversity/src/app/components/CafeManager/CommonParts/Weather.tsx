import { use } from "react";
import Image from "next/image";


interface WeatherData {
    temperature: number,
    condition: string,
    icon: string,
    humidity: number,
    wind: number,
    location: string
}


async function fetchWeather() {
    const response = await fetch("http://localhost:3000/api/weatherForecast", { cache: "no-store" });
    if (!response.ok) return undefined;
    const result = await response.json();
    return result.data;
}


export default function Weather() {

    const weather: WeatherData|undefined = use(fetchWeather());

    return (
        <div className="flex items-center justify-center w-[17rem] h-[5rem]">
            {weather !== undefined ? 
            (<>
                <div>
                    <Image src={`http:${weather?.icon}`} alt={`${weather?.condition}`} width={50} height={40} />
                </div>
                <div className="w-[7rem] h-[3rem] m-[auto 0] text-left">
                    <p className="text-[1.8rem] font-medium">
                        {weather?.temperature > 0 ? "+" : ""}
                        {Math.round(weather?.temperature)}&#176;C
                    </p>
                </div>
            </>) : (
                <p className="
                    text-[1.8rem] font-medium p-0 mx-auto my-0
                    outline-2 rounded-[0.75rem]
                ">
                    Няма Інтернету
                </p>
            )}
        </div>
    );
}
