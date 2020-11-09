const db = require('../db');

module.exports = {
    upsertStocks: async (userID, symbol, shareUnits) => {
        const query = `INSERT INTO stocks (user_id, company_symbol, share_units)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, company_symbol) DO UPDATE SET share_units = stocks.share_units + EXCLUDED.share_units`

        await db.query(query, [userID, symbol, shareUnits]);
    },

    reduceShareUnits: async(userID, symbol, shareUnits) => {
        const query = `UPDATE stocks SET share_units = stocks.share_units - $1
        WHERE user_id=$2 AND company_symbol=$3 
        RETURNING share_units`;

        await db.query(query, [shareUnits, userID, symbol]);
    },

    getAllStocks: async(userID) => {
        const query = `SELECT company_symbol, share_units FROM stocks WHERE user_id=$1`;

        const { rows } =  await db.query(query, [userID]);
        return rows;
    }
};