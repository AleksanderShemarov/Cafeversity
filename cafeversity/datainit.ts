const sqlite3 = require('sqlite3').verbose();


const database = new sqlite3.Database('./sqlite3_database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);

    console.log("Connection is successful");
});

// database.run(`
//   CREATE TABLE IF NOT EXISTS dishes_BY (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     food_name TEXT NOT NULL CHECK (length(food_name) <= 50),
//     includes TEXT NOT NULL,
//     spicy BOOLEAN NOT NULL CHECK (spicy IN (0, 1)),
//     vegetarian BOOLEAN NOT NULL CHECK (vegetarian IN (0, 1)),
//     vegan BOOLEAN NOT NULL CHECK (vegan IN (0, 1)),
//     protein NUMERIC DEFAULT 0.00,
//     fats NUMERIC DEFAULT 0.00,
//     carbohydrates NUMERIC DEFAULT 0.00,
//     amino_acids TEXT DEFAULT 'Гістыдын, Ізалейцын, Лейцын',
//     food_portion NUMERIC DEFAULT 0.00,
//     cost NUMERIC DEFAULT 0.00
//   )
// `);// I will need to add some FOREIGH KEYs for this table later.



// let sql = `INSERT INTO dishes_BY
// (food_name, includes, spicy, vegetarian, vegan, protein, fats, carbohydrates, amino_acids, food_portion, cost, imagePath)
// VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

// database.run(sql, [
//     "Калдуны",
//     "Бульба (67.8%), Свініна (20.3%), Цыбуля (6.7%), Какосавы алей (2.7%), Смятана 20%-тлушчу (1.4%), Соль (0.7%), Заправы (0.4%)",
//     0,
//     0,
//     0,
//     4.0,
//     12.5,
//     12.0,
//     "Аспаражыновая кіслата, Лейцын, Ізалейцын, Лізін, Гістыдын, Насычаны тлушч, Амега-3 і Амега-6 тлустыя кіслоты; Вітаміны: B1, B2, B4, B5, B6, C, E, PP; Мікраэлементы: Co, Cl, Na, Cr, Mo, Cu, Zn, K",
//     250,
//     3.15,
//     './public/Калдуны.jpeg',
// ], (err) => {
//     if (err) return console.error(err.message);
//     console.log("A new data row has been created!");
// });//It is Kalduny dish.

// database.run(sql, [
//     "Мачанка з блінамі",
//     `Мачанка: Свіная грудзінка (38.5%), Свініна (15.3%), Шампіньёны (15.3%), Смятана 15%-тлушчу (15.3%), Цыбуля (9.2%), Вада (3.8%), Пшанічная мука (2.3%), Заправы (0.3%);
// Бліны: Малако (61.9%), Пшанічная мука (17.0%), Цэльназерневая мука (7.8%), Яйкі (9.3%), Раслінны алей (2.8%), Цукар (0.9%), Соль (0.3%)`,
//     0,
//     0,
//     0,
//     8.0,
//     8.0,
//     11.0,
//     `Лейцын, Ізалейцын, Валін, Лізін, Метыёнін, Гістыдын, Фенілаланін, Трэанін, Трыптафан, Насычаны тлушч, Амега-3 і Амега-6 тлустыя кіслоты;
// Вітаміны: А, B1, B2, B4, B5, B6, B12, D, E, H, PP;
// Мікраэлементы: K, Na, P, Cl, Fe, Ca, Co, Mg, Mn, Mo, Se, F, Cr, Zn.`,
//     515,
//     4.28,
//     './public/Мачанка_з_блінамі.jpeg',
// ], (err) => {
//     if (err) return console.error(err.message);
//     console.log("A new data row has been created!");
// });//This is Machanka dish.

// database.run(sql, [
//     "Косаўская салата",
//     `Буракі (52.0%), Цыбуля (18.7%), Смятана 15%-тлушчу (15.6%), Шампіньёны (10.4%), Раслінны алей (1.5%), Часнык (0.5%), Цукар (0.5%), Яблычны воцат (0.5%), Соль (0.3%).`,
//     0,
//     0,
//     0,
//     5.9,
//     16.5,
//     20.9,
//     `Лейцын, Ізалейцын, Валін, Лізін, Аланін, Аргінін, Насычаны тлушч, Глутамінавая кіслата, Амега-3 і Амега-6 тлустыя кіслоты;
// Вітаміны: А, B2, B3, B6, B9, B12, C, D, E, K;
// Мікраэлементы: Ca, Mg, Mn, Fe, S, P, Zn`,
//     120,
//     1.67,
//     './public/Косаўская_салата.jpeg',
// ], (err) => {
//     if (err) return console.error(err.message);
//     console.log("A new data row has been created!");
// });//This is Kosauskaja salata dish.

// database.run(sql, [
//     "Крупнік",
//     `Кура (10.1%), Бульба (8.5%), Морква (5.4%), Цыбуля (4.0%), Грэчка (1.7%), Рыс (1.0%), Сала (0.6%), Алей сланечніку (0.5%), Соль (0.3%), Заправы (0.2%), Вада (67.7%).`,
//     0,
//     0,
//     0,
//     3.0,
//     4.0,
//     3.0,
//     `Гістыдын, Ізалейцын, Лейцын, Лізін, Метыёнін, Трэанін, Трыптафан, Глутамінавая, Гама-амінамасляная і Аспарагінавая кіслоты, Амега-3 і Амега-6 тлустыя кіслоты;
// Вітаміны: A, B1, B2, B3, B5, B6, B9, B12, C, D, E, H, K;
// Мікраэлементы: Ca, Cl, F, Mg, Mn, Fe, S, P, Zn`,
//     250,
//     2.35,
//     './public/Крупнік.jpeg',
// ], (err) => {
//     if (err) return console.error(err.message);
//     console.log("A new data row has been created!");
// });//This is Krupnik soup dish.

// database.run(sql, [
//     "Імбірна-цытрусавая гарбата",
//     `Дробна нацёрты імбір (1.1%), Мёд (4.5%), Сок апельсіну (5.3%), Заправы (0.1%), Гарачая вада (89.0%).`,
//     1,
//     1,
//     0,
//     0.0,
//     0.0,
//     15.0,
//     `Вітаміны: A, B1, B2, B4, B5, B6, B9, B12, C, D, E, H, K, PP;
// Мікраэлементы: K, Ca, Na, S, Cl, Cu, F.`,
//     200,
//     1.12,
//     './public/Імбірна-цытрусавая_гарбата.jpeg',
// ], (err) => {
//     if (err) return console.error(err.message);
//     console.log("A new data row has been created!");
// });//It is Imbirna-citrusavaja harbata drink.



// database.run(`
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     email TEXT NOT NULL UNIQUE,
//     password TEXT NOT NULL
//   )
// `);


// To add a new column into SQLite table
// let sql_alter = `ALTER TABLE dishes_BY ADD COLUMN imagePath TEXT NOT NULL`;
//
// database.run(sql_alter, [], (err) => {
//     if (err) return console.error(err.message);
//      console.log("A new column is created!");
// });


//To delete all rows in a SQLite table; To set Auto-Increment Primary Key to 0
// let sql_delete_table_rows = `DELETE FROM dishes_BY;
// UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = 'dishes_BY';`;

// database.run(sql_delete_table_rows, [], (err) => {
//     if (err) return console.error(err.message);
//     console.log("All table rows are deleted and PK is set on 0!");
// })



const sql = `SELECT * FROM dishes_BY`;
database.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach(row => {
        console.log(row);
    });
})

database.close((err) => {
    if (err) return console.error(err.message);
});
