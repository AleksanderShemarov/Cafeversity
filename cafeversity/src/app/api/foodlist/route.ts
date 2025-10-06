import { NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prismaClient";


const GET = async (request: Request) => {
    const searchParams = new URL(request.url).searchParams;
    const id = searchParams.get("id");
    const info = searchParams.get("info");
    const name = searchParams.get("name");

    const category = searchParams.get("category");

    if (id) {
        if (info && info === "short") {
            const dish = await prisma.dishes_BY.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    food_name: true,
                    includes: true,
                    imagePath: true,
                    protein: true,
                    fats: true,
                    carbohydrates: true,
                    food_portion: true,
                    cost: true,
                    dishTypeId: true
                }
            });

            if (!dish) return NextResponse.json(
                { message: `The dish isn't found by id: ${id}.` },
                { status: 409 }
            );

            return NextResponse.json(dish, { status: 201 });
        }
        else if (info && info === "full" && name) {            
            const user = await prisma.users.findFirst({
                where: {
                    AND: {
                        firstName: name.split("_")[0],
                        lastName: name.split("_")[1]
                    }
                },
                select: {
                    id: true
                }
            });

            const dish = await prisma.dishes_BY.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    food_name: true,
                    includes: true,
                    imagePath: true,
                    spicy: true,
                    vegetarian: true,
                    vegan: true,
                    protein: true,
                    fats: true,
                    carbohydrates: true,
                    amino_acids: true,
                    food_portion: true,
                    cost: true,
                    dishTypeId: true,
                    favouredByUser: {
                        select: {
                            users: {
                                select: {
                                    id: true,
                                }
                            }
                        }
                    },
                    meal: {
                        select: {
                            meals: {
                                select: {
                                    Name: true
                                }
                            }
                        }
                    }
                }
            });

            if (!user) return NextResponse.json(
                { message: "User doesn't exist!" },
                { status: 409 }
            );

            if (!dish) return NextResponse.json(
                { message: `The dish isn't found by id: ${id}.` },
                { status: 409 }
            );
            
            const favouredByUser = dish.favouredByUser.some(array => array.users.id === user.id);
            const meal = dish.meal.map(item => item.meals.Name);

            return NextResponse.json(
                {
                    ...dish,
                    favouredByUser: favouredByUser,
                    meal: meal
                },
                { status: 201 }
            );
        }
    } else if (category) {
        const typeId = await prisma.dishTypes.findUnique({
            where: {
                Name: category
            },
            select: {
                ID: true
            }
        });

        // if (!typeId) {
        //     return NextResponse.json({
        //         message: `Category ${category} doesn't exist!`
        //     });
        // }

        const dishes = await prisma.dishes_BY.findMany({
            where: {
                dishTypeId: typeId?.ID
            },
            select: {
                id: true,
                food_name: true,
                imagePath: true,
            }
        });

        return NextResponse.json(dishes, { status: 201 });
    }

    const dishes = await prisma.dishes_BY.findMany();
    return NextResponse.json(dishes);
}

export { GET };
