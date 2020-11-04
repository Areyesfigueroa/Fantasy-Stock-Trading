const db = require('../db');

module.exports = {
    upsertStocks: async (userID, symbol, shareUnits) => {
        const query = `INSERT INTO stocks (user_id, company_symbol, share_units)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, company_symbol) DO UPDATE SET share_units = EXCLUDED.share_units`

        const { rows } = await db.query(query, [userID, symbol, shareUnits]);

        if(!rows[0]) throw new Error("Could not update/insert the stocks table");
    }
};