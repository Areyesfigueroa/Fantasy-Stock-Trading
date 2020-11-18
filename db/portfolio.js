const db = require('.');

module.exports = {
    upsertPortfolio: async (userID, newPrice) => {
        const query = `INSERT INTO portfolio (user_id, account_balance) 
        VALUES ($1, $2)
        ON CONFLICT(user_id) DO UPDATE SET account_balance = EXCLUDED.account_balance
        RETURNING account_balance`;

        const { rows } = await db.query(query, [userID, newPrice]);
        return rows[0];
    },

    getAccountBalance: async (userID) => {
        const query = `SELECT account_balance FROM portfolio WHERE user_id=$1`;
        const { rows } = await db.query(query, [userID]);
        return rows[0];
    }
};