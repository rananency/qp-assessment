const pool = require('../../database/connectionPool');
exports.getGroceryAvailableItem = (req, res) => {
    pool.query('SELECT * FROM item WHERE quantity>0', (err, rows) => {
        if (err) {
            console.error('Error retrieving items: ', err.stack);
            res.status(500).json({ error: 'Failed to retrieve orders' });
            return;
        }
        console.log('Retrieved all Items successfully');
        res.status(200).json({ data: rows });
    });
};