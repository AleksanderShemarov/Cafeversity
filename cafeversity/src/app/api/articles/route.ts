import { NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prismaClient";


const GET = async (request: Request) => {
    try{
        const searchParams = new URL(request.url).searchParams;
        const id = searchParams.get("id");
        
        if (id) {
            const article = await prisma.people_and_food.findUnique({
                where: { 
                    id: Number(id),
                },
            });

            if (!article) {
                return NextResponse.json(
                    {
                        error: "Article is not found!",
                        status: 404,
                    },
                    { status: 404 }
                );
            }

            return NextResponse.json(article);
        }
        else {
            const people_food_articles = await prisma.people_and_food.findMany();
            const third = people_food_articles.filter(article => article.id === 3);
            const fourth = people_food_articles.filter(article => article.id === 4);
            const filtered_articles = people_food_articles.filter(article => article.id !== 3 && article.id !== 4);
            return NextResponse.json([ ...filtered_articles, ...third, ...fourth ]);
        }
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export { GET };
