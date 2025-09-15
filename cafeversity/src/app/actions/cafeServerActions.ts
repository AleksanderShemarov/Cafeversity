"use server";

import prisma from "../../../lib/utils/prismaClient";


export default async function getCafes() {
    const dbCafes = await prisma.cafes.findMany({
        select: {
            ID: true,
            cafeName: true,
            openHours: true,
        }
    });

    const cafeLabels = [];
    for(const dbCafe of dbCafes) {
        cafeLabels.push({ label: `${dbCafe.cafeName}\n(${dbCafe.openHours.replace("\\n", "\n")})`, value: dbCafe.ID });
    }

    return cafeLabels;
}

export async function dishesCheckingByCafe(idCafe: number, notCheckedDishes: { id: number }[]) {
    const dishesIds = notCheckedDishes.map(dish => dish.id);
    
    const dishesAvailable = await prisma.cafes.findUnique({
        where: {
            ID: idCafe
        },
        select: {
            hasDish: {
                where: {
                    dishID: {
                        in: dishesIds
                    }
                },
                select: {
                    dishID: true,
                    dishAvailable: true
                }
            }
        }
    });

    const availHours = await getAvailableTimeslots(idCafe);

    return {
        dishes: dishesAvailable,
        hours: availHours,
    };
}

const weekdays = ["Нд.", "Пн.", "Аў.", "Ср.", "Чц.", "Пт.", "Сб."] as const;

async function getAvailableTimeslots(idCafe: number) {
    const cafeHours = await prisma.cafes.findUnique({
        where: {
            ID: idCafe
        },
        select: {
            openHours: true
        }
    });

    if (!cafeHours) return [];

    const cafeHoursArray = cafeHours!.openHours.split("\\n");
    const today = new Date();
    let weekday = today.getDay();
    let hoursTemp;

    if (weekday >= 1 && weekday <= 5) {
        hoursTemp = cafeHoursArray[0];
    } else if (weekday === 6) {
        hoursTemp = cafeHoursArray[1];
    } else {
        hoursTemp = cafeHoursArray[0];
    }

    let [start, end] = hoursTemp.split(" ").filter(part => part.includes(":") && part.indexOf(":") !== part.length - 1);
    let startHours = Number(start.split(":")[0]);
    let endHours = Number(end.split(":")[0]);

    if (weekday === 5 && endHours - today.getHours() < 1) {
        hoursTemp = cafeHoursArray[1];
        weekday = 6;
        [start, end] = hoursTemp.split(" ").filter(part => part.includes(":") && part.indexOf(":") !== part.length - 1);
        startHours = Number(start.split(":")[0]);
        endHours = Number(end.split(":")[0]);
    } else if (weekday === 6 && endHours - today.getHours() < 1) {
        hoursTemp = cafeHoursArray[0];
        weekday = 1;
        [start, end] = hoursTemp.split(" ").filter(part => part.includes(":") && part.indexOf(":") !== part.length - 1);
        startHours = Number(start.split(":")[0]);
        endHours = Number(end.split(":")[0]);
    } else if ((weekday >= 1 && weekday <= 4) && endHours - today.getHours() < 1) weekday++;
    else weekday = 1;

    const startMinutes = Number(start.split(":")[1]);
    const endMinutes = Number(end.split(":")[1]);
    let fullFormat = endHours - startHours;
    let halfFormat;

    if (startMinutes === 30 && endMinutes === 30) {
        halfFormat = fullFormat;
        fullFormat -= 1;
    } else if (startMinutes === 30 || endMinutes === 30) {
        halfFormat = fullFormat
    } else {
        halfFormat = fullFormat - 1;
    }

    const hours: {label: string, value: string}[] = [];

    while (fullFormat > 0 || halfFormat > 0) {
        if (fullFormat > 0) {
            const string = `${weekdays[weekday]}: ${startHours}:00 – ${startHours + 1}:00`;
            hours.push({ label: string, value: string });
            fullFormat--;
        }
        if (halfFormat > 0) {
            const string = `${weekdays[weekday]}: ${startHours}:30 – ${startHours + 1}:30`;
            hours.push({ label: string, value: string });
            halfFormat--;
        }
        startHours++;
    }

    return hours;
}