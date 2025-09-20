import { NextResponse } from "next/server";
import prisma from "../../../../../lib/utils/prismaClient";


const GET = async () => {
    try {
        const [orders, cafes, allDishes] = await Promise.all([
            prisma.orders.findMany({
                include: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                        }
                    },
                    cafe: {
                        select: {
                            ID: true,
                            cafeName: true,
                        }
                    },
                    dishes: {
                        include: {
                            dishes: {
                                select: {
                                    id: true,
                                    food_name: true,
                                }
                            }
                        }
                    }
                }
            }),
            prisma.cafes.findMany({
                select: {
                    ID: true,
                    cafeName: true,
                }
            }),
            prisma.dishes_BY.findMany({
                select: {
                    id: true,
                    food_name: true,
                    cost: true,
                }
            })
        ]);

        const preparedOrders = orders.map(order => ({
            id: order.ID, order: order.orderNumber,
            user: `${order.user.firstName} ${order.user.lastName}`, cafe: order.cafe.cafeName,
            cafeID: order.cafe.ID, dishes: order.dishes.map(dish => String(dish.dishes.food_name)).join(", "),
            dishesIds: order.dishes.map(dish => dish.dishID), sentTime: order.sentTime,
            ready: order.readyStatus, phone: order.phone, comment: order.comment
        }));

        return NextResponse.json({
            orders: preparedOrders,
            cafes,
            allDishes
        }, { status: 200 });
    } catch (error) {
        console.error("dishsTable API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// const POST = async (request: Request) => {
//     const { order, user, cafe, dish, sentTime, ready, phone, comment } = await request.json();
// 
//     const isOrder = await prisma.orders.findFirst({
//         where: {
//             orderNumber: Number(order)
//         }
//     });
// 
//     if (isOrder) return NextResponse.json(
//         {
//             message: `Order #${order} is already existed!`,
//             status: "Error"
//         },
//         { status: 409 }
//     );
// 
//     const isCafe = await prisma.cafes.findUnique({
//         where: {
//             cafeName: cafe
//         }
//     });
// 
//     if (!isCafe) return NextResponse.json(
//         {
//             message: `Cafe with name ${name} is already existed!`,
//             status: "Error"
//         },
//         { status: 409 }
//     );
// 
//     const newDish = await prisma.dishes_BY.create({
//         data: {
//             food_name: name,
//             includes: include,
//             spicy: spicy,
//             vegetarian: veget,
//             vegan: vegan,
//             protein: protein,
//             fats: fat,
//             carbohydrates: carbo,
//             amino_acids: amino,
//             food_portion: portion,
//             cost: cost,
//             imagePath: image
//         },
//         select: {
//             id: true,
//             food_name: true,
//             includes: true,
//             spicy: true,
//             vegetarian: true,
//             vegan: true,
//             protein: true,
//             fats: true,
//             carbohydrates: true,
//             amino_acids: true,
//             food_portion: true,
//             cost: true,
//             imagePath: true
//         }
//     });
// 
//     return NextResponse.json(
//         {
//             message: `New dish (${name}) has been created!`,
//             newTableRow: {
//                 id: newDish.id, name: newDish.food_name, include: newDish.includes, spicy: newDish.spicy, veget: newDish.vegetarian, vegan: newDish.vegan,
//                 protein: newDish.protein, fat: newDish.fats, carbo: newDish.carbohydrates, amino: newDish.amino_acids,
//                 portion: newDish.food_portion, cost: newDish.cost, image: newDish.imagePath
//             },
//             status: "Success"
//         },
//         { status: 201 }
//     );
// }

const PATCH = async (request: Request) => {
    try {
        const { id, updatedRow } = await request.json();

        console.log("id from orders PATCH -->", id);
        console.log("updatedRow from orders PATCH -->", updatedRow);

        const result: boolean = await prisma.$transaction(async (tx) => {
            const order = await tx.orders.findUnique({
                where: {
                    ID: id
                },
                select: { ID: true }
            });

            if (!order) return false;

            await tx.orders.update({
                where: {
                    ID: order.ID
                },
                data: {
                    readyStatus: updatedRow.ready,
                    phone: updatedRow.phone,
                    comment: updatedRow.comment,
                    sentTime: new Date(updatedRow.sentTime),
                    orderNumber: updatedRow.order,
                    cafeID: updatedRow.cafeID,
                }
            });

            if (updatedRow.dishesIds.length > 0) {
                await tx.dishesByOrders.deleteMany({
                    where: { orderID: order.ID }
                });

                await Promise.all(
                    updatedRow.dishesIds.map((dishId: number) =>
                        tx.dishesByOrders.create({
                            data: {
                                orderID: order.ID,
                                dishID: dishId
                            }
                        })
                    )
                );
            }

            return true;
        });

        return NextResponse.json(
            {
                message: result ? "Order has been updated." : "Order doesn't exist!",
                status: result ? "Success" : "Error"
            },
            { status: result ? 201 : 400 }
        );
    } catch (error) {
        console.error("ordersTable API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error: Problem with Server Connection" },
            { status: 500 }
        );
    }
}

const DELETE = async (request: Request) => {
    try {
        const idsArray = await request.json();

        // console.log("idsArray of orders -->", idsArray);

        for (const index of idsArray) {
            await prisma.dishesByOrders.deleteMany({
                where: {
                    orderID: index,
                }
            });

            await prisma.orders.delete({
                where: {
                    ID: index
                }
            })
        }

        return NextResponse.json(
            {
                message: `${idsArray.length} order${idsArray.length === 1 ? " has" : "es have"} been deleted.`,
                status: "Success"
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("ordersTable API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error: Problem with Server Connection" },
            { status: 500 }
        );
    }
}

export {
    GET, PATCH, DELETE,
    // POST,
};
