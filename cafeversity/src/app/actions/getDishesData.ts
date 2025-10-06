"use server";

import prisma from "../../../lib/utils/prismaClient";


export default async function getDishTypes() {
    const dishTypes = await prisma.dishTypes.findMany({
        where: {
            NOT: {
                Name: "Халодныя Стравы"
            }
        },
        select: {
            Name: true,
            _count: {
                select: {
                    Dishes: true,
                }
            }
        }
    });

    return dishTypes;
}


export async function getDishMeals() {
    const dishMeals = await prisma.mealTypes.findMany({
        select: {
            Name: true,
            _count: {
                select: {
                    Dish: true
                }
            }
        }
    });

    return dishMeals;
}


export async function getDishesPopularity() {
    const dishStats = await prisma.dishesByOrders.groupBy({
        by: ['dishID'],
        _count: {
            dishID: true
        },
        orderBy: {
            _count: {
                dishID: 'desc'
            }
        },
        take: 5
    });

    const totalOrders = await prisma.dishesByOrders.count();

    const dishIds = dishStats.map(stat => stat.dishID);
    const dishes = await prisma.dishes_BY.findMany({
        where: {
            id: { in: dishIds }
        },
        select: {
            id: true,
            food_name: true
        }
    });

    const dishMap = new Map(dishes.map(dish => [dish.id, dish.food_name]));

    const chartData = dishStats.map(stat => ({
        name: dishMap.get(stat.dishID) || `Dish #${stat.dishID}`,
        count: stat._count.dishID,
        percentage: totalOrders > 0 ? parseInt(String(Math.floor((stat._count.dishID / totalOrders) * 100))) : 0
    }));

    return chartData;
}


export async function getCafeIncomes() {
    const ordersWithDetails = await prisma.orders.findMany({
        where: {
            readyStatus: true
        },
        include: {
            cafe: {
                select: {
                    ID: true,
                    cafeName: true
                }
            },
            dishes: {
                include: {
                    dishes: {
                        select: {
                            id: true,
                            cost: true
                        }
                    }
                }
            }
        }
    });

    const cafesIncome: Record<string, number> = {};

    ordersWithDetails.forEach(order => {
        if (!order.cafe) return; // Пропускаем если нет кафе

        const cafeName = order.cafe.cafeName;
        
        // Считаем сумму заказа
        const orderTotal = order.dishes.reduce((sum, dishOrder) => {
            return sum + Number((dishOrder.dishes?.cost || 0));
        }, 0);

        // Добавляем к прибыли кафе
        if (cafesIncome[cafeName]) {
            cafesIncome[cafeName] += orderTotal;
        } else {
            cafesIncome[cafeName] = orderTotal;
        }
    });

    // Сортируем по убыванию прибыли
    const sortedIncome = Object.entries(cafesIncome)
        .sort(([, a], [, b]) => b - a)
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {} as Record<string, number>);

    return sortedIncome;
}
