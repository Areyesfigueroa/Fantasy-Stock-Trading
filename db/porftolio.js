const db = require('../db');

module.exports = {
    upsertPortfolio: async (userID, newPrice) => {
        const query = `INSERT INTO portfolio (user_id, account_balance) 
        VALUES ($1, $2)
        ON CONFLICT(user_id) DO UPDATE SET account_balance = EXCLUDED.account_balance`;

        await db.query(query, [userID, newPrice]);
    },

    getAccountBalance: async (userID) => {
        const query = `SELECT account_balance FROM portfolio WHERE user_id=$1`;
        const { rows } = await db.query(query, [userID]);
        return rows[0];
    }
};