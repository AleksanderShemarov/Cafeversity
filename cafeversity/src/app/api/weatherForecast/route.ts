import { NextResponse } from "next/server";


const GET = async () => {
    const API_KEY = process.env.WEATHERAPI_KEY!;
    const CITY = "Minsk";

    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=no`, { cache: "no-store" });
    if (!response.ok) return NextResponse.json(
        {
            success: false,
            error: `Response --> ${response.ok}`
        }
    );
    const data = await response.json();

    return NextResponse.json(
        {
            success: true,
            data: {
                temperature: data.current.temp_c,
                condition: data.current.condition.text,
                icon: data.current.condition.icon,
                humidity: data.current.humidity,
                wind: data.current.wind_kph,
                location: data.location.name
            }
        },
        { status: 201 }
    );
}

export { GET };
