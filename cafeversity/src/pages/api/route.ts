import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server";


const Handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const db = await open({
            filename: './sqlite3_database.db',
            driver: sqlite3.Database
    });

    if (req.method === "GET") {
        let dishes_BY = await db.all(`SELECT * FROM dishes_BY`);
        db.close();
        return res.status(200).json(dishes_BY);
    } else {
        db.close();
        return res.status(500).json({error: "This request is impossible now, because it isn't written."})
    }
}

export default Handler;
