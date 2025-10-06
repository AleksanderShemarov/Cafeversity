import { NextResponse } from "next/server";
import prisma from "../../../../../lib/utils/prismaClient";


const GET = async () => {
    try {
        const dishes = await prisma.dishes_BY.findMany({
            select: {
                id: true,
                food_name: true,
                includes: true,
                spicy: true,
                vegetarian: true,
                vegan: true,
                protein: true,
                fats: true,
                carbohydrates: true,
                amino_acids: true,
                food_portion: true,
                cost: true,
                imagePath: true,
            }
        });

        const preparedDishes = dishes.map(dish => ({
            id: dish.id, name: dish.food_name, include: dish.includes, spicy: dish.spicy, veget: dish.vegetarian, vegan: dish.vegan,
            protein: dish.protein, fat: dish.fats, carbo: dish.carbohydrates, amino: dish.amino_acids,
            portion: dish.food_portion, cost: dish.cost, image: dish.imagePath
        }));

        return NextResponse.json(preparedDishes, { status: 200 });
    } catch (error) {
        console.error("dishsTable API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

const POST = async (request: Request) => {
    const { name, include, spicy, veget, vegan, protein, fat, carbo, amino, portion, cost, image } = await request.json();

    const isDish = await prisma.dishes_BY.findFirst({
        where: {
            food_name: name
        }
    });

    if (isDish) return NextResponse.json(
        {
            message: `Dish with name ${name} is already existed!`,
            status: "Error"
        },
        { status: 409 }
    );

    const newDish = await prisma.dishes_BY.create({
        data: {
            food_name: name,
            includes: include,
            spicy: spicy,
            vegetarian: veget,
            vegan: vegan,
            protein: protein,
            fats: fat,
            carbohydrates: carbo,
            amino_acids: amino,
            food_portion: portion,
            cost: cost,
            imagePath: image
        },
        select: {
            id: true,
            food_name: true,
            includes: true,
            spicy: true,
            vegetarian: true,
            vegan: true,
            protein: true,
            fats: true,
            carbohydrates: true,
            amino_acids: true,
            food_portion: true,
            cost: true,
            imagePath: true
        }
    });

    return NextResponse.json(
        {
            message: `New dish (${name}) has been created!`,
            newTableRow: {
                id: newDish.id, name: newDish.food_name, include: newDish.includes, spicy: newDish.spicy, veget: newDish.vegetarian, vegan: newDish.vegan,
                protein: newDish.protein, fat: newDish.fats, carbo: newDish.carbohydrates, amino: newDish.amino_acids,
                portion: newDish.food_portion, cost: newDish.cost, image: newDish.imagePath
            },
            status: "Success"
        },
        { status: 201 }
    );
}

const PATCH = async (request: Request) => {
    try {
        const { id, updatedRow } = await request.json();

        const result: boolean = await prisma.$transaction(async (tx) => {
            const dish = await tx.dishes_BY.findUnique({
                where: {
                    id: id
                },
                select: { id: true }
            });

            if (!dish) return false;

            await tx.dishes_BY.update({
                where: {
                    id: dish.id
                },
                data: {
                    food_name: updatedRow.name,
                    includes: updatedRow.include,
                    spicy: updatedRow.spicy === "on" ? true : false,
                    vegetarian: updatedRow.veget === "on" ? true : false,
                    vegan: updatedRow.vegan === "on" ? true : false,
                    protein: updatedRow.protein,
                    fats: updatedRow.fat,
                    carbohydrates: updatedRow.carbo,
                    amino_acids: updatedRow.amino,
                    food_portion: updatedRow.portion,
                    cost: updatedRow.cost,
                    imagePath: updatedRow.image
                }
            });

            return true;
        });

        return NextResponse.json(
            {
                message: result ? "Dish has been updated." : "Dish doesn't exist!",
                status: result ? "Success" : "Error"
            },
            { status: result ? 201 : 400 }
        );
    } catch (error) {
        console.error("dishesTable API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error: Problem with Server Connection" },
            { status: 500 }
        );
    }
}

const DELETE = async (request: Request) => {
    try {
        const idsArray = await request.json();

        await prisma.$transaction([
            prisma.dishes_BY.deleteMany({
                where: {
                    id: {
                        in: [...idsArray]
                    }
                }
            })
        ]);

        return NextResponse.json(
            {
                message: `${idsArray.length} dish${idsArray.length === 1 ? " has" : "es have"} been deleted.`,
                status: "Success"
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("dishesTable API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error: Problem with Server Connection" },
            { status: 500 }
        );
    }
}

export { GET, POST, PATCH, DELETE };
