import { PrismaClient } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


const Handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const prisma = new PrismaClient();

    if (req.method === "GET") {
        let dishes = await prisma.dishes_BY.findMany();
        prisma.$disconnect();
        return res.status(200).json(dishes);
    } else {
        prisma.$disconnect();
        return res.status(500).json({error: "This request is impossible now, because it isn't written."});
    }
}

export default Handler;




// async function creation() {

//     const prisma = new PrismaClient();

//     let new_dish = await prisma.dishes_BY.create({
//         data: {
//             food_name: "Імбірна-цытрусавая гарбата",
//             includes: `Дробна нацёрты імбір (1.1%), Мёд (4.5%), Сок апельсіну (5.3%), Заправы (0.1%), Гарачая вада (89.0%).`,
//             spicy: true,
//             vegetarian: true,
//             vegan: false,
//             protein: 0.0,
//             fats: 0.0,
//             carbohydrates: 15.0,
//             amino_acids: `Вітаміны: A, B1, B2, B4, B5, B6, B9, B12, C, D, E, H, K, PP;
// Мікраэлементы: K, Ca, Na, S, Cl, Cu, F.`,
//             food_portion: 200,
//             cost: 1.12,
//             imagePath: "./public/Імбірна-цытрусавая_гарбата.jpeg",
//         }
//     });

//     // ".createMany()"-method doesn't work with SQLite database

//     const new_dishes = [
//         {
//             food_name: "Калдуны",
//             includes: "Бульба (67.8%), Свініна (20.3%), Цыбуля (6.7%), Какосавы алей (2.7%), Смятана 20%-тлушчу (1.4%), Соль (0.7%), Заправы (0.4%)",
//             spicy: false,
//             vegetarian: false,
//             vegan: false,
//             protein: 4.0,
//             fats: 12.5,
//             carbohydrates: 12.0,
//             amino_acids: "Аспаражыновая кіслата, Лейцын, Ізалейцын, Лізін, Гістыдын, Насычаны тлушч, Амега-3 і Амега-6 тлустыя кіслоты; Вітаміны: B1, B2, B4, B5, B6, C, E, PP; Мікраэлементы: Co, Cl, Na, Cr, Mo, Cu, Zn, K",
//             food_portion: 250,
//             cost: 3.15,
//             imagePath: "./public/Калдуны.jpeg",
//         },
//         {
//             food_name: "Мачанка з блінамі",
//             includes: `Мачанка: Свіная грудзінка (38.5%), Свініна (15.3%), Шампіньёны (15.3%), Смятана 15%-тлушчу (15.3%), Цыбуля (9.2%), Вада (3.8%), Пшанічная мука (2.3%), Заправы (0.3%);
// Бліны: Малако (61.9%), Пшанічная мука (17.0%), Цэльназерневая мука (7.8%), Яйкі (9.3%), Раслінны алей (2.8%), Цукар (0.9%), Соль (0.3%)`,
//             spicy: false,
//             vegetarian: false,
//             vegan: false,
//             protein: 8.0,
//             fats: 8.0,
//             carbohydrates: 11.0,
//             amino_acids: `Лейцын, Ізалейцын, Валін, Лізін, Метыёнін, Гістыдын, Фенілаланін, Трэанін, Трыптафан, Насычаны тлушч, Амега-3 і Амега-6 тлустыя кіслоты;
// Вітаміны: А, B1, B2, B4, B5, B6, B12, D, E, H, PP;
// Мікраэлементы: K, Na, P, Cl, Fe, Ca, Co, Mg, Mn, Mo, Se, F, Cr, Zn.`,
//             food_portion: 515,
//             cost: 4.28,
//             imagePath: "./public/Мачанка_з_блінамі.jpeg",
//         },
//         {
//             food_name: "Косаўская салата",
//             includes: `Буракі (52.0%), Цыбуля (18.7%), Смятана 15%-тлушчу (15.6%), Шампіньёны (10.4%), Раслінны алей (1.5%), Часнык (0.5%), Цукар (0.5%), Яблычны воцат (0.5%), Соль (0.3%).`,
//             spicy: false,
//             vegetarian: false,
//             vegan: false,
//             protein: 5.9,
//             fats: 16.5,
//             carbohydrates: 20.9,
//             amino_acids: `Лейцын, Ізалейцын, Валін, Лізін, Аланін, Аргінін, Насычаны тлушч, Глутамінавая кіслата, Амега-3 і Амега-6 тлустыя кіслоты;
// Вітаміны: А, B2, B3, B6, B9, B12, C, D, E, K;
// Мікраэлементы: Ca, Mg, Mn, Fe, S, P, Zn`,
//             food_portion: 120,
//             cost: 1.67,
//             imagePath: "./public/Косаўская_салата.jpeg",
//         },
//         {
//             food_name: "Крупнік",
//             includes: `Кура (10.1%), Бульба (8.5%), Морква (5.4%), Цыбуля (4.0%), Грэчка (1.7%), Рыс (1.0%), Сала (0.6%), Алей сланечніку (0.5%), Соль (0.3%), Заправы (0.2%), Вада (67.7%).`,
//             spicy: false,
//             vegetarian: false,
//             vegan: false,
//             protein: 3.0,
//             fats: 4.0,
//             carbohydrates: 5.0,
//             amino_acids: `Гістыдын, Ізалейцын, Лейцын, Лізін, Метыёнін, Трэанін, Трыптафан, Глутамінавая, Гама-амінамасляная і Аспарагінавая кіслоты, Амега-3 і Амега-6 тлустыя кіслоты;
// Вітаміны: A, B1, B2, B3, B5, B6, B9, B12, C, D, E, H, K;
// Мікраэлементы: Ca, Cl, F, Mg, Mn, Fe, S, P, Zn`,
//             food_portion: 250,
//             cost: 2.35,
//             imagePath: "./public/Крупнік.jpeg",
//         },
//         {
//             food_name: "Імбірна-цытрусавая гарбата",
//             includes: `Дробна нацёрты імбір (1.1%), Мёд (4.5%), Сок апельсіну (5.3%), Заправы (0.1%), Гарачая вада (89.0%).`,
//             spicy: true,
//             vegetarian: true,
//             vegan: false,
//             protein: 0.0,
//             fats: 0.0,
//             carbohydrates: 15.0,
//             amino_acids: `Вітаміны: A, B1, B2, B4, B5, B6, B9, B12, C, D, E, H, K, PP;
// Мікраэлементы: K, Ca, Na, S, Cl, Cu, F.`,
//             food_portion: 200,
//             cost: 1.12,
//             imagePath: "./public/Імбірна-цытрусавая_гарбата.jpeg",
//         }
//     ]

// }

// creation().catch((err) => console.error(err.message))
